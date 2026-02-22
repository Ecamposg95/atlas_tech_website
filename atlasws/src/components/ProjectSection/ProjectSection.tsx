import React, { useEffect } from "react";

// ✅ Import images
import projectBg from "../../images/bg/project-bg.png";
import gifRound from "../../images/icon/b10c3e43e836d32554bf.gif";
import projectImg01 from "../../images/project/project-img01.jpg";
import projectImg02 from "../../images/project/project-img02.jpg";
import projectImg03 from "../../images/project/project-img03.jpg";
import projectImg04 from "../../images/project/project-img04.jpg";

// ✅ Import icons
import icon01 from "../../images/icon/project-icon01.svg";
import icon02 from "../../images/icon/project-icon02.svg";
import icon03 from "../../images/icon/project-icon03.svg";
import icon08 from "../../images/icon/project-icon08.svg";
import icon09 from "../../images/icon/project-icon09.svg";
import icon10 from "../../images/icon/project-icon10.svg";
import icon11 from "../../images/icon/project-icon11.svg";
import icon12 from "../../images/icon/project-icon12.svg";
import icon13 from "../../images/icon/project-icon13.svg";
import { Link } from "react-router-dom";

const ProjectSection: React.FC = () => {
  useEffect(() => {
    // ✅ Set dynamic background image
    const bgElement = document.querySelector<HTMLElement>(".project.bg_img");
    if (bgElement) {
      bgElement.style.backgroundImage = `linear-gradient(rgba(0, 26, 26, 0.9), rgba(0, 77, 61, 0.9)), url(${projectBg})`;
    }

    // ✅ Scroll activation logic
    const items = document.querySelectorAll<HTMLElement>(".xb-project-item");
    const paginations = document.querySelectorAll<HTMLElement>(".xb-project-pagination li");

    if (!items.length || !paginations.length) return;

    items.forEach((item) => {
      item.style.transition = "opacity 0.6s ease";
      item.style.opacity = "1";
    });

    const updateActive = () => {
      let indexToActivate = 0;
      const triggerLine = window.innerHeight * 0.3;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          indexToActivate = index;
        }
      });

      paginations.forEach((el) => el.classList.remove("active"));
      if (paginations[indexToActivate]) {
        paginations[indexToActivate].classList.add("active");
      }

      items.forEach((item, i) => {
        if (i === indexToActivate) {
          item.style.opacity = "1";
        } else if (i < indexToActivate) {
          item.style.opacity = "0.3";
        } else {
          item.style.opacity = "1";
        }
      });
    };

    window.addEventListener("scroll", updateActive);
    updateActive();

    return () => {
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  return (
    <section className="project bg_img pt-135 pb-150">
      <div className="container">
        <div className="sec-title custom-sec-title xb-sec-padding text-center">
          <span className="sub-title">Nuestros Proyectos</span>
          <h2 className="title">
            Mira los resultados que reflejan nuestro arduo trabajo
          </h2>
          <div className="xb-heading-btn d-inline">
            <Link className="thm-btn agency-btn" to="/project">
              <span className="text">ver más proyectos</span>
              <span className="arrow">
                <span className="arrow-icon">
                  {/* Double SVG arrow */}
                  {[...Array(2)].map((_, i) => (
                    <svg
                      key={i}
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
                  ))}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mxw-1800">
        <div className="xb-project-wrap">
          {/* Pagination */}
          <div className="xb-project-pagination-wrap">
            <ul className="xb-project-pagination">
              <li>1</li>
              <li className="active">2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>

          {/* Project items */}
          <div className="xb-project-inner">
            {[
              {
                img: projectImg01,
                title: "Proyectos de Chatbots y NLP..",
                desc: "Construimos chatbots inteligentes y herramientas de NLP que comprenden y responden de forma natural. Desde atención al cliente hasta análisis de documentos, nuestras soluciones automatizan la comunicación.",
                industry: "Procesamiento de Datos",
                country: "Alemania, Issum",
                techs: [icon01, icon02, icon03],
              },
              {
                img: projectImg02,
                title: "E-commerce y marketing..",
                desc: "Creamos soluciones de IA que impulsan las ventas y el compromiso del cliente, como recomendaciones inteligentes y precios dinámicos. Nuestras herramientas ayudan a las marcas a crecer más rápido.",
                industry: "Inteligencia Artificial",
                country: "Singapur",
                techs: [icon01, icon08, icon09],
              },
              {
                img: projectImg03,
                title: "Proyectos de visión artificial..",
                desc: "Desarrollamos sistemas de IA que ven y entienden datos visuales: detección de objetos, patrones y automatización de inspecciones. Nuestras soluciones mejoran la precisión y la toma de decisiones.",
                industry: "Visión Artificial",
                country: "Estados Unidos",
                techs: [icon10, icon11, icon01],
              },
              {
                img: projectImg04,
                title: "Analítica de ciencia de datos..",
                desc: "Convertimos datos complejos en información clara y accionable. Desde modelos predictivos hasta tableros en tiempo real, nuestra analítica ayuda a las empresas a decidir con confianza.",
                industry: "Ciencia de Datos",
                country: "Canadá",
                techs: [icon08, icon12, icon13],
              },
            ].map((project, index) => (
              <div
                key={index}
                className="xb-project-item bg_img"
                style={{ backgroundImage: `url(${project.img})` }}
              >
                <div className="xb-project-content">
                  <div className="xb-item--inner xb-border">
                    <h2 className="xb-item--title">{project.title}</h2>
                    <p className="xb-item--content">{project.desc}</p>
                    <ul className="xb-item--list ul_li">
                      <li>
                        Industria: <span>{project.industry}</span>
                      </li>
                      <li>
                        País: <span>{project.country}</span>
                      </li>
                    </ul>
                    <div className="xb-item--technologie ul_li">
                      <span>Tecnologías Principales:</span>
                      <ul className="list-unstyled ul_li">
                        {project.techs.map((icon, i) => (
                          <li key={i}>
                            <img src={icon} alt="icon" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="xb-item---btn mt-70">
                      <Link className="thm-btn agency-btn" to="/project-details">
                        <span className="text">leer más</span>
                        <span className="arrow">
                          <span className="arrow-icon">
                            {[...Array(2)].map((_, i) => (
                              <svg
                                key={i}
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
                            ))}
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
