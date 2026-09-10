<?php
/**
 * Atlas Tech — endpoint de contacto.
 * POST JSON { name, email, org, message, website } → { ok: true } | { ok: false, error }.
 * `website` es un honeypot: si llega con contenido, se responde ok sin enviar nada.
 * Se sirve tal cual desde public/ → build/api/contact.php en Hostinger (Apache + PHP).
 * Endurecido tras revisión: 415 si el Content-Type no es JSON, 403 si Origin/Referer
 * apunta a otro host, y throttle de 60s por IP (archivo en el temp dir del sistema)
 * para frenar reintentos automáticos sin añadir dependencias.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const TO      = 'hola@atlastech.mx';
const MAX_LEN = 10240;
const ALLOWED_HOSTS = ['atlastech.mx', 'www.atlastech.mx', 'localhost'];

function respond(int $code, array $body): void {
  http_response_code($code);
  echo json_encode($body, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['ok' => false, 'error' => 'method']);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') === false) {
  respond(415, ['ok' => false, 'error' => 'content_type']);
}

foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $headerKey) {
  $value = $_SERVER[$headerKey] ?? '';
  if ($value === '') {
    continue;
  }
  $host = parse_url($value, PHP_URL_HOST);
  if (!is_string($host) || !in_array(strtolower($host), ALLOWED_HOSTS, true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
  }
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$throttleFile = sys_get_temp_dir() . '/atlas-contact-' . sha1($ip);
$now = time();
if (is_file($throttleFile)) {
  $last = (int) @file_get_contents($throttleFile);
  if ($last > 0 && $now - $last < 60) {
    respond(429, ['ok' => false, 'error' => 'throttle']);
  }
}
@file_put_contents($throttleFile, (string) $now);

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
