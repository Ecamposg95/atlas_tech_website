import React from "react";

interface Props {
  source: string;
  period: string;
  cutoff: string;
}

// Pie obligatorio de toda cifra publicada (regla de marca: fuente, periodo y corte).
const FigureNote: React.FC<Props> = ({ source, period, cutoff }) => (
  <p className="figure-note">
    Fuente: {source}. Periodo: {period}. Corte: {cutoff}.
  </p>
);

export default FigureNote;
