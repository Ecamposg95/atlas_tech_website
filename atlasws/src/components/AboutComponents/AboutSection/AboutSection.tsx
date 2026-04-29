import React from "react";

// ==== Import Images ====
import featureIcon1 from "../../../images/icon/feature-icon01.svg";
import featureIcon2 from "../../../images/icon/feature-icon02.svg";
import featureIcon3 from "../../../images/icon/feature-icon03.svg";

import aboutBg from "../../../images/bg/about-bg02.png";

const AboutSection: React.FC = () => {
  return (
    <section className="about pos-rel pb-140">

      <div className="container">
        {/* ===== Title Section ===== */}
        <div className="sec-title sec-title-center about-sec-title about-sec-title-two mt-45">
          <span className="sub-title mb-10">¿Quiénes Somos?</span>

          <h2 className="title">
            Construyendo la nueva generación de sistemas de operación empresarial
          </h2>

          <p className="content">
            Atlas Tech es una startup tecnológica en crecimiento que desarrolla soluciones empresariales modernas para la transformación digital de negocios en Latinoamérica. Como venture studio y firma de ingeniería, crea plataformas escalables que integran ERP, POS, inteligencia artificial, analítica y tecnologías Web3, enfocadas en resolver necesidades reales de operación en sectores como retail, distribución e industria. Su visión es construir una nueva generación de sistemas de operación empresarial que permitan a las organizaciones trabajar con mayor eficiencia, inteligencia operativa y capacidad de crecimiento.
          </p>
        </div>

        {/* ===== Feature Boxes ===== */}
        <div className="row mt-40">
          {/* 1 */}
          <div className="col-lg-4 col-md-6 mt-30">
            <div className="xb-feature-item">
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon1} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">Insights inteligentes</h2>
                  <p className="xb-item--content">
                    Toma decisiones más rápidas basadas en datos, impulsadas por análisis de IA en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="col-lg-4 col-md-6 mt-30">
            <div className="xb-feature-item">
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon2} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">Soluciones de IA integradas</h2>
                  <p className="xb-item--content">
                    No se necesitan herramientas adicionales. Obtén IA integrada y escalable desde el primer día.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="col-lg-4 col-md-6 mt-30">
            <div className="xb-feature-item">
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon3} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">Automatización de extremo a extremo</h2>
                  <p className="xb-item--content">
                    Automatiza flujos de trabajo con sistemas inteligentes que nunca te dejan con dudas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="about-bg">
        <img src={aboutBg} alt="background" />
      </div>
    </section>
  );
};

export default AboutSection;
