import React from "react";
import { Link } from "react-router-dom";

// IMPORT IMAGES
import img02 from "../../images/project/img02.jpg";
import img03 from "../../images/project/img03.jpg";
import img04 from "../../images/project/img04.jpg";
import img05 from "../../images/project/img05.jpg";
import img06 from "../../images/project/img06.jpg";

// ARROW ICON SVG
const ArrowIcon = () => (
  <>
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <rect x="5.23" y="17.32" width="17.88" height="2.27" transform="rotate(-40.28 5.23 17.32)" fill="white" />
      <rect x="7.75" y="6.25" width="2.27" height="2.27" transform="rotate(-40.28 7.75 6.25)" fill="white" />
      <rect x="10.95" y="6.52" width="2.27" height="2.27" transform="rotate(-40.28 10.95 6.52)" fill="white" />
      <rect x="14.16" y="6.78" width="2.27" height="2.27" transform="rotate(-40.28 14.16 6.78)" fill="white" />
      <rect x="17.09" y="10.25" width="2.27" height="2.27" transform="rotate(-40.28 17.09 10.25)" fill="white" />
      <rect x="16.83" y="13.45" width="2.27" height="2.27" transform="rotate(-40.28 16.83 13.45)" fill="white" />
      <rect x="16.56" y="16.65" width="2.27" height="2.27" transform="rotate(-40.28 16.56 16.65)" fill="white" />
    </svg>

    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <rect x="5.23" y="17.32" width="17.88" height="2.27" transform="rotate(-40.28 5.23 17.32)" fill="white" />
      <rect x="7.75" y="6.25" width="2.27" height="2.27" transform="rotate(-40.28 7.75 6.25)" fill="white" />
      <rect x="10.95" y="6.52" width="2.27" height="2.27" transform="rotate(-40.28 10.95 6.52)" fill="white" />
      <rect x="14.16" y="6.78" width="2.27" height="2.27" transform="rotate(-40.28 14.16 6.78)" fill="white" />
      <rect x="17.09" y="10.25" width="2.27" height="2.27" transform="rotate(-40.28 17.09 10.25)" fill="white" />
      <rect x="16.83" y="13.45" width="2.27" height="2.27" transform="rotate(-40.28 16.83 13.45)" fill="white" />
      <rect x="16.56" y="16.65" width="2.27" height="2.27" transform="rotate(-40.28 16.56 16.65)" fill="white" />
    </svg>
  </>
);

// PROJECT DATA
const projectData = [
  {
    title: "Proyectos de chatbots y NLP..",
    content:
      "Construimos chatbots y herramientas de NLP que entienden y responden de forma natural. Desde atencion al cliente hasta analisis de documentos, automatizamos comunicacion, ahorramos tiempo y mejoramos la experiencia.",
    images: [img02, img02, img02, img02],
    reverse: false,
  },
  {
    title: "Proyectos de IA aplicada..",
    content:
      "Entregamos soluciones de IA que simplifican operaciones, elevan eficiencia y habilitan decisiones mas inteligentes. De automatizacion a analitica, construimos tecnologia para resolver retos reales.",
    images: [img03, img03, img03, img03],
    reverse: true,
  },
  {
    title: "Proyectos de vision computacional..",
    content:
      "Desarrollamos sistemas que entienden datos visuales: deteccion de objetos, reconocimiento de patrones y automatizacion de inspecciones. Esto mejora precision y toma de decisiones.",
    images: [img04, img04, img04, img04],
    reverse: false,
  },
  {
    title: "E-commerce y crecimiento..",
    content:
      "Creamos soluciones que impulsan conversion y engagement: recomendaciones, precios dinamicos y segmentacion basada en comportamiento. Ayudamos a personalizar experiencias y crecer mas rapido.",
    images: [img05, img05, img05, img05],
    reverse: true,
  },
  {
    title: "Analitica y ciencia de datos..",
    content:
      "Convertimos datos complejos en insights accionables. De modelos predictivos a tableros en tiempo real, ayudamos a decidir mas rapido y con confianza.",
    images: [img06, img06, img06, img06],
    reverse: false,
  },
];

const ProjectSection: React.FC = () => {
  return (
    <section className="service pos-rel">
      <div className="container mxw-1650">
        <div className="xb-project-wrap xb-project-wrap_2">

          {projectData.map((item, index) => (
            <div className="xb-project-item" key={index}>
              {/* LEFT TEXT / RIGHT IMAGE or REVERSE */}
              {!item.reverse ? (
                <>
                  {/* CONTENT FIRST */}
                  <div className="xb-project-content">
                    <div className="xb-item--inner xb-border">
                      <h2 className="xb-item--title">{item.title}</h2>
                      <p className="xb-item--content clr-white">{item.content}</p>

                      <div className="xb-item--btn mt-40">
                        <Link className="thm-btn agency-btn" to="/project-details">
                          <span className="text">leer mas</span>
                          <span className="arrow">
                            <span className="arrow-icon"><ArrowIcon /></span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* IMAGES */}
                  <div className="xb-project-img img-hove-effect">
                    <div className="xb-img">
                      {item.images.map((img, i) => (
                        <Link to="/project-details" key={i}>
                          <img src={img} alt="project" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* REVERSED: IMAGE FIRST */}
                  <div className="xb-project-img img-hove-effect">
                    <div className="xb-img">
                      {item.images.map((img, i) => (
                        <Link to="/project-details" key={i}>
                          <img src={img} alt="project" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="xb-project-content">
                    <div className="xb-item--inner xb-border">
                      <h2 className="xb-item--title">{item.title}</h2>
                      <p className="xb-item--content clr-white">{item.content}</p>

                      <div className="xb-item--btn mt-40">
                        <Link className="thm-btn agency-btn" to="/project-details">
                          <span className="text">leer mas</span>
                          <span className="arrow">
                            <span className="arrow-icon"><ArrowIcon /></span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
