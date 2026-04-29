import React from "react";
import { Link } from "react-router-dom";

// Image imports (using your provided path)
import heroBg from "../../images/bg/hero_bg.png";
import heroIcon from "../../images/icon/animated-gif02.gif";
import featureIcon1 from "../../images/icon/feature-icon01.svg";
import featureIcon2 from "../../images/icon/feature-icon02.svg";
import featureIcon3 from "../../images/icon/feature-icon03.svg";

import NetworkGlobe from "./NetworkGlobe";

const HeroSection: React.FC = () => {
  return (
    <section
      className="hero pos-rel p-0"
      style={{ background: '#020617', overflow: 'visible' }}
    >
      {/* ---------- Sticky 3D Background ---------- */}
      <div className="position-absolute w-100 h-100 top-0 start-0" style={{ zIndex: 0 }}>
        <div className="position-sticky top-0 start-0 w-100" style={{ height: '100vh', overflow: 'hidden' }}>
          {/* Mesh gradient base */}
          <div className="position-absolute w-100 h-100" style={{ background: 'radial-gradient(ellipse at 50% 30%, #0f172a 0%, #020617 70%)', inset: 0 }} />
          
          {/* Canvas 3D */}
          <NetworkGlobe accentA="#9333ea" accentB="#a855f7" />
          
          {/* Grano */}
          <div className="atlas-noise" />
          
          {/* Horizon glow */}
          <div
            className="position-absolute start-50 translate-middle-x"
            style={{
              bottom: '-15%', width: '130%', height: '55%',
              background: `radial-gradient(ellipse at center, rgba(147, 51, 234, 0.2) 0%, transparent 65%)`,
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* ---------- Content Layer ---------- */}
      <div className="position-relative z-1">
        
        {/* ---------- New 3D Initial Block ---------- */}
        <div className="atlas-stage d-flex flex-column" style={{ background: 'transparent' }}>
          <div className="position-relative z-2 d-flex flex-column align-items-center justify-content-center px-4 text-center flex-grow-1" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="atlas-reveal mb-4">
              <div className="d-inline-flex align-items-center atlas-glass px-3 py-2 rounded-pill" style={{ gap: '0.5rem' }}>
                <span className="position-relative d-flex" style={{ width: '6px', height: '6px' }}>
                  <span className="position-absolute w-100 h-100 rounded-circle opacity-75" style={{ background: '#9333ea', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                  <span className="position-relative rounded-circle w-100 h-100" style={{ background: '#9333ea' }} />
                </span>
                <span className="text-uppercase fw-bold text-white-50" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
                  Atlas Tech · Early Stage Startup
                </span>
              </div>
            </div>

            <h1 className="atlas-reveal atlas-delay-1 fw-bolder mb-4 text-white" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.0, maxWidth: '860px' }}>
              Construimos el futuro con<br />
              <span
                className="text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(110deg, #ffffff 0%, #9333ea 55%, #a855f7 100%)`, 
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                IA &amp; Blockchain.
              </span>
            </h1>

            <p className="atlas-reveal atlas-delay-2 fw-light mb-5 text-white-50" style={{ fontSize: '1.1rem', maxWidth: '620px', lineHeight: 1.7 }}>
              Somos una startup en etapa temprana que construye plataformas inteligentes
              integrando Inteligencia Artificial y Blockchain para transformar la
              operación empresarial en Latinoamérica.
            </p>

            <div className="atlas-reveal atlas-delay-2">
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Link
                  to="/contact"
                  className="btn text-white text-uppercase fw-bold border-0 transition-all"
                  style={{
                    padding: '12px 28px',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    background: `linear-gradient(135deg, #9333ea 0%, #a855f7 100%)`,
                    boxShadow: `0 0 30px rgba(147, 51, 234, 0.3), 0 8px 24px rgba(147, 51, 234, 0.2)`,
                    borderRadius: '8px'
                  }}
                >
                  Empezar Ahora
                </Link>
                <Link
                  to="/about"
                  className="btn atlas-glass text-white-50 text-uppercase fw-bold transition-all"
                  style={{
                    padding: '12px 28px',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    borderRadius: '8px'
                  }}
                >
                  Documentación
                </Link>
              </div>
            </div>

            {/* Indicador de scroll */}
            <div className="position-absolute start-50 translate-middle-x" style={{ bottom: '2rem', opacity: 0.3 }}>
              <div className="border border-light rounded-pill d-flex justify-content-center" style={{ width: '20px', height: '32px', paddingTop: '6px' }}>
                <div className="bg-white rounded-circle" style={{ width: '4px', height: '4px', animation: 'bounce 2s infinite' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Original Content with Acrylic Effect ---------- */}
        <div className="container position-relative z-2 mb-5">
          <div className="atlas-glass p-4 p-md-5 rounded-4 shadow-lg">
        <div className="row">
          {/* ---------- Left Content ---------- */}
          <div className="col-lg-9 col-md-9">
            <div className="hero-content">
              <h2 className="title scale-animation wow">
                Desarrollamos soluciones empresariales modernas para la transformación digital en Latinoamérica
              </h2>
              <p className="sub-title scale-animation wow">
                Como startup tecnológica y venture studio, creamos plataformas escalables que integran ERP, POS, Inteligencia Artificial, analítica y tecnologías Web3 para resolver necesidades reales de operación en sectores como retail, distribución e industria.
              </p>
              <div className="hero-btn scale-animation wow">
                <Link className="thm-btn agency-btn" to="/about">
                  <span className="text">Comienza hoy con nosotros</span>
                  <span className="arrow">
                    <span className="arrow-icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="5.06592"
                          y="19.9785"
                          width="20.5712"
                          height="2.61221"
                          transform="rotate(-40.2798 5.06592 19.9785)"
                          fill="white"
                        />
                        <rect
                          x="7.97095"
                          y="7.24463"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 7.97095 7.24463)"
                          fill="white"
                        />
                        <rect
                          x="11.6523"
                          y="7.54834"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 11.6523 7.54834)"
                          fill="white"
                        />
                        <rect
                          x="15.334"
                          y="7.85205"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 15.334 7.85205)"
                          fill="white"
                        />
                        <rect
                          x="18.7119"
                          y="11.8374"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.7119 11.8374)"
                          fill="white"
                        />
                        <rect
                          x="18.4084"
                          y="15.52"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.4084 15.52)"
                          fill="white"
                        />
                        <rect
                          x="18.104"
                          y="19.2012"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.104 19.2012)"
                          fill="white"
                        />
                      </svg>
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="5.06592"
                          y="19.9785"
                          width="20.5712"
                          height="2.61221"
                          transform="rotate(-40.2798 5.06592 19.9785)"
                          fill="white"
                        />
                        <rect
                          x="7.97095"
                          y="7.24463"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 7.97095 7.24463)"
                          fill="white"
                        />
                        <rect
                          x="11.6523"
                          y="7.54834"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 11.6523 7.54834)"
                          fill="white"
                        />
                        <rect
                          x="15.334"
                          y="7.85205"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 15.334 7.85205)"
                          fill="white"
                        />
                        <rect
                          x="18.7119"
                          y="11.8374"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.7119 11.8374)"
                          fill="white"
                        />
                        <rect
                          x="18.4084"
                          y="15.52"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.4084 15.52)"
                          fill="white"
                        />
                        <rect
                          x="18.104"
                          y="19.2012"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.104 19.2012)"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ---------- Right Icon ---------- */}
          <div className="col-lg-3 col-md-3">
            <div
              className="hero-icon wow zoomIn"
              data-wow-delay="700ms"
              data-wow-duration="800ms"
            >
              <img src={heroIcon} alt="Hero icon" />
            </div>
          </div>
        </div>

        {/* ---------- Features ---------- */}
        <div className="row mt-55">
          <div className="col-lg-4 col-md-6 mt-30">
            <div
              className="xb-feature-item wow fadeInUp"
              data-wow-delay="700ms"
              data-wow-duration="600ms"
            >
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon1} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">Información inteligente</h2>
                  <p className="xb-item--content">
                    Toma decisiones más rápidas basadas en datos, impulsadas por el análisis y la predicción de IA en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-30">
            <div
              className="xb-feature-item wow fadeInUp"
              data-wow-delay="800ms"
              data-wow-duration="600ms"
            >
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon2} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">Soluciones de IA integradas</h2>
                  <p className="xb-item--content">
                    Sin herramientas ni complementos adicionales. Obtén IA escalable e integrada desde el primer día.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-30">
            <div
              className="xb-feature-item wow fadeInUp"
              data-wow-delay="900ms"
              data-wow-duration="600ms"
            >
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon3} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">Automatización integral</h2>
                  <p className="xb-item--content">
                    Elimina los cuellos de botella con flujos de trabajo inteligentes que nunca te dejan con la duda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
