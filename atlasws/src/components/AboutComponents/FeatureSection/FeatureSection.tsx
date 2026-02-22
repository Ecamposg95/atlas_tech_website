import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your background + icons
import bgImage from "../../../images/bg/feature-bg.jpg";
import icon01 from "../../../images/icon/fea-small-icon01.svg";
import icon04 from "../../../images/icon/fea-small-icon04.svg";
import icon02 from "../../../images/icon/fea-small-icon02.svg";
import icon06 from "../../../images/icon/fea-small-icon06.svg";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const FeatureSection: React.FC = () => {

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Reset background
    gsap.set(el, {
      backgroundPosition: "center 0px",
      backgroundSize: "cover",
    });

    // GSAP Parallax Effect
    gsap.to(el, {
      backgroundPositionY: "200px", // how much parallax to move
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",   // start when section enters screen
        end: "bottom top",     // end when section leaves screen
        scrub: 1,              // smooth parallax scroll
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="feature-section parallax-section"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="xb-feature-content">
              <div className="sec-title sec-title-center fea-sec-title mb-35">
                <span className="sub-title mb-20">¿Por qué somos mejores?</span>
                <h2 className="title title-line_height">
                  ¿Por qué nuestros servicios son mejores que los de los demás?
                </h2>
              </div>

              <div className="row mt-none-30">

                {/* Item 1 */}
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon01} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        IA segura, ética y <br /> escalable
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2 xb-border">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon04} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        Equipo de especialistas <br /> en IA
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon02} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        Soluciones <br /> a tu medida
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2 xb-border">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon06} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        Centrados en el cliente, <br /> enfocados en el negocio
                      </h2>
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

export default FeatureSection;
