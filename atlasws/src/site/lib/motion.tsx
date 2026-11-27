import React, { useEffect, useRef, useState } from "react";

// Base de animación del sitio. Todo se apaga si la persona pidió menos movimiento
// o si el navegador no tiene IntersectionObserver (también en las pruebas): en ese caso
// cada pieza se queda en su estado de reposo, completo y legible.
export const canAnimate = (): boolean =>
  typeof window !== "undefined" &&
  "IntersectionObserver" in window &&
  !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

// true mientras el elemento está en pantalla (o siempre, si no se puede animar).
export function useInView<T extends Element>(threshold = 0.25): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(!canAnimate());
  useEffect(() => {
    if (!canAnimate() || !ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Demo en bucle: avanza por pasos con la duración de cada uno, solo mientras `run` es true.
// Sin animación devuelve `rest`, el paso que mejor explica la pantalla por sí solo.
export function useDemo(durations: number[], rest: number, run: boolean): number {
  const animated = canAnimate();
  const [step, setStep] = useState(animated ? 0 : rest);
  useEffect(() => {
    if (!animated || !run) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => window.clearTimeout(t);
  }, [animated, run, step, durations]);
  return step;
}

// Cifra que cuenta hasta su valor la primera vez que entra en pantalla.
// Conserva el formato original: prefijo, separadores de miles, decimales y sufijo.
export const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const m = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  const [ref, inView] = useInView<HTMLSpanElement>(0.6);
  const [text, setText] = useState(value);
  const done = useRef(!canAnimate());
  useEffect(() => {
    if (done.current || !inView || !m) return;
    done.current = true;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const commas = num.includes(",");
    const fmt = (n: number) => {
      const s = n.toFixed(decimals);
      if (!commas) return s;
      const [i, d] = s.split(".");
      return i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (d ? "." + d : "");
    };
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1500);
      const eased = 1 - Math.pow(1 - k, 3);
      setText(pre + fmt(target * eased) + post);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setText(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return (
    <span ref={ref} className="countup">
      {text}
    </span>
  );
};

// Aparición al hacer scroll: marca con .is-in cada bloque cuando entra en pantalla.
// La clase .reveal-on solo se pone si se puede animar, así nada queda oculto sin JS.
export function useReveal(root: React.RefObject<HTMLElement>, key: string) {
  useEffect(() => {
    const el = root.current;
    if (!el || !canAnimate()) return;
    el.classList.add("reveal-on");
    const targets = Array.from(el.querySelectorAll<HTMLElement>(".section, .closing, [data-reveal]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [root, key]);
}
