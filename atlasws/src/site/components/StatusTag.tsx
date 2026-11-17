import React from "react";
import type { Status } from "../content/status";

const MODIFIER: Partial<Record<Status, string>> = {
  Validado: "status-tag--validated",
  "Investigación": "status-tag--research",
};

const StatusTag: React.FC<{ status: Status }> = ({ status }) => (
  <span className={["status-tag", MODIFIER[status]].filter(Boolean).join(" ")}>{status}</span>
);

export default StatusTag;
