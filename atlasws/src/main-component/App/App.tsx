import React, { useEffect } from "react";
import Lenis from "lenis";
import AllRoute from "../router";
import ErrorBoundary from "./ErrorBoundary";

const App: React.FC = () => {
  // Scroll suave. Se omite si la persona pidió menos movimiento.
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App lenis" id="scrool">
      <ErrorBoundary>
        <AllRoute />
      </ErrorBoundary>
    </div>
  );
};

export default App;
