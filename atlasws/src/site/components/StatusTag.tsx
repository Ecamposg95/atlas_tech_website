import React from "react";
import type { Status } from "../content/status";

// Colores de estado de Atlas Noir: señal verde solo para "Validado".
const MODIFIER: Record<Status, string> = {
  Validado: "status-tag--validated",
  MVP: "status-tag--mvp",
  "En desarrollo": "status-tag--dev",
  Concepto: "status-tag--concept",
  "Investigación": "status-tag--research",
};

const StatusTag: React.FC<{ status: Status }> = ({ status }) => (
  <span className={`status-tag ${MODIFIER[status]}`}>{status}</span>
);

export default StatusTag;
