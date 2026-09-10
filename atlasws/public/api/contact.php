<?php
/**
 * Atlas Tech — endpoint de contacto.
 * POST JSON { name, email, org, message, website } → { ok: true } | { ok: false, error }.
 * `website` es un honeypot: si llega con contenido, se responde ok sin enviar nada.
 * Se sirve tal cual desde public/ → build/api/contact.php en Hostinger (Apache + PHP).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const TO      = 'hola@atlastech.mx';
const MAX_LEN = 10240;

function respond(int $code, array $body): void {
  http_response_code($code);
  echo json_encode($body, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['ok' => false, 'error' => 'method']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_LEN + 1);
if ($raw === false || strlen($raw) > MAX_LEN) {
  respond(413, ['ok' => false, 'error' => 'too_large']);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
  respond(400, ['ok' => false, 'error' => 'json']);
}

$clean = static function ($v, int $max): string {
  $s = is_string($v) ? trim($v) : '';
  $s = preg_replace('/[\r\n]+/', ' ', $s) ?? '';
  return mb_substr($s, 0, $max);
};

$honeypot = $clean($data['website'] ?? '', 200);
if ($honeypot !== '') {
  respond(200, ['ok' => true]);
}

$name    = $clean($data['name'] ?? '', 120);
$email   = $clean($data['email'] ?? '', 160);
$org     = $clean($data['org'] ?? '', 120);
$message = is_string($data['message'] ?? null) ? trim($data['message']) : '';
$message = mb_substr($message, 0, 4000);

if (mb_strlen($name) < 2)                                { respond(422, ['ok' => false, 'error' => 'name']); }
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) { respond(422, ['ok' => false, 'error' => 'email']); }
if (mb_strlen($message) < 10)                            { respond(422, ['ok' => false, 'error' => 'message']); }

$subject = '=?UTF-8?B?' . base64_encode("Contacto atlastech.mx · {$name}") . '?=';
$body    = "Nombre: {$name}\nCorreo: {$email}\nOrganización: {$org}\n\n{$message}\n";
$headers = implode("\r\n", [
  'From: Atlas Tech <no-reply@atlastech.mx>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
]);

$sent = @mail(TO, $subject, $body, $headers);
if (!$sent) {
  respond(502, ['ok' => false, 'error' => 'mail']);
}

respond(200, ['ok' => true]);
