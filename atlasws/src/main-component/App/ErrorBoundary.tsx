import React, { Component, ReactNode } from "react";
import "../../site/tokens.css";
import "../../site/pages/pages.css";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

// Último recurso si una página falla al renderizar. Vive fuera del router,
// así que el enlace de salida es un <a> normal (recarga completa).
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="noir" style={{ minHeight: "100vh" }}>
        <section className="page-head">
          <div className="wrap">
            <h1>Algo falló al mostrar esta página.</h1>
            <p className="lead">Recarga la página o vuelve al inicio.</p>
            <div className="cta-row">
              <a className="cta cta--primary" href="/">
                Volver al inicio
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ErrorBoundary;
