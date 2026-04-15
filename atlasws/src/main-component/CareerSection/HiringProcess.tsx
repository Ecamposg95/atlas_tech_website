import React, { useState } from "react";
import processImg from "../../images/career/process-img.png";

const HiringProcess: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      number: "01",
      title: "_Envia tu CV",
      content:
        "Postulate enviando tu CV o compartiendo tu perfil de LinkedIn. Es el primer paso para sumarte al equipo.",
    },
    {
      number: "02",
      title: "_Filtro inicial",
      content:
        "Revisamos tu perfil y validamos el match con el rol y el equipo.",
    },
    {
      number: "03",
      title: "_Entrevista",
      content:
        "Hacemos una entrevista para conocer tu experiencia, enfoque y forma de trabajar.",
    },
    {
      number: "04",
      title: "_Prueba tecnica",
      content:
        "Si aplica, compartimos una prueba corta para evaluar el rol en contexto real.",
    },
    {
      number: "05",
      title: "_Listo",
      content:
        "Cerramos oferta, definimos fecha de inicio y arrancamos onboarding.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="hiring-process pt-140 pb-150">
      <div className="container">
        <div className="row mt-none-50 align-items-center">
          
          {/* LEFT SIDE - TEXT & ACCORDION */}
          <div className="col-lg-6 mt-50">
            <div className="sec-title sec-title-center mb-35">
              <span className="sub-title mb-20">Proceso de contratacion</span>
              <h2 className="title title-line_height">Nuestro proceso</h2>
            </div>

            <div className="xb-faq career-faq">
              <ul className="accordion_box clearfix list-unstyled">

                {steps.map((item, index) => (
                  <li
                    key={index}
                    className={`accordion block ${
                      activeIndex === index ? "active-block" : ""
                    }`}
                  >
                    <div
                      className={`acc-btn ${activeIndex === index ? "active" : ""}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="number">{item.number}</span> {item.title}
                      <span className="arrow">
                        <span></span>
                      </span>
                    </div>

                    <div
                      className={`acc_body ${
                        activeIndex === index ? "current" : ""
                      }`}
                      style={{
                        display: activeIndex === index ? "block" : "none",
                      }}
                    >
                      <div className="content">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </li>
                ))}

              </ul>
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="col-lg-6 mt-50">
            <div className="process-img">
              <img src={processImg} alt="proceso de contratacion" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HiringProcess;
