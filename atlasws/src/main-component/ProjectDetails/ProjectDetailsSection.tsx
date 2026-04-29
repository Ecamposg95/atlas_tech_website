import React from "react";

// ---- image imports ----
import img07 from "../../images/project/img07.jpg";

import icon4 from "../../images/icon/project-icon04.svg";
import icon5 from "../../images/icon/project-icon05.svg";
import icon6 from "../../images/icon/project-icon06.svg";
import icon7 from "../../images/icon/project-icon07.svg";

// ---- check icon svg ----
const CheckIcon: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            opacity="0.2"
            d="M24 12C24 13.024 22.742 13.868 22.49 14.812C22.23 15.788 22.888 17.148 22.394 18.002C21.892 18.87 20.382 18.974 19.678 19.678C18.974 20.382 18.87 21.892 18.002 22.394C17.148 22.888 15.788 22.23 14.812 22.49C13.868 22.742 13.024 24 12 24C10.976 24 10.132 22.742 9.188 22.49C8.212 22.23 6.852 22.888 5.998 22.394C5.13 21.892 5.026 20.382 4.322 19.678C3.618 18.974 2.108 18.87 1.606 18.002C1.112 17.148 1.77 15.788 1.51 14.812C1.258 13.868 0 13.024 0 12C0 10.976 1.258 10.132 1.51 9.188C1.77 8.212 1.112 6.852 1.606 5.998C2.108 5.13 3.618 5.026 4.322 4.322C5.026 3.618 5.13 2.108 5.998 1.606C6.852 1.112 8.212 1.77 9.188 1.51C10.132 1.258 10.976 0 12 0C13.024 0 13.868 1.258 14.812 1.51C15.788 1.77 17.148 1.112 18.002 1.606C18.87 2.108 18.974 3.618 19.678 4.322C20.382 5.026 21.892 5.13 22.394 5.998C22.888 6.852 22.23 8.212 22.49 9.188C22.742 10.132 24 10.976 24 12Z"
            fill="#A855F7"
        />
        <path
            d="M15.5559 9.14076L11.3992 13.178L9.24437 11.0869C8.77664 10.6326 8.01773 10.6326 7.55001 11.0869C7.08229 11.5412 7.08229 12.2783 7.55001 12.7326L10.5729 15.6686C11.0279 16.1105 11.7668 16.1105 12.2218 15.6686L17.2484 10.7864C17.7162 10.3321 17.7162 9.59504 17.2484 9.14076C16.7807 8.68648 16.0236 8.68648 15.5559 9.14076Z"
            fill="#A855F7"
        />
    </svg>
);

// ==== full component ====
const ProjectDetailsSection: React.FC = () => {
    const projectMeta = [
        { icon: icon4, label: "servicios :", value: "Soluciones de IA" },
        { icon: icon5, label: "cliente :", value: "Atlas Tech" },
        { icon: icon6, label: "ubicacion :", value: "Ciudad de Mexico, Mexico" },
        { icon: icon7, label: "fecha de entrega :", value: "20-12-2025" },
    ];

    const requirementList = [
        "Automatizacion inteligente de procesos.",
        "Alertas y notificaciones.",
        "Monitoreo de datos en tiempo real.",
        "Procesamiento de lenguaje natural (NLP).",
        "Interfaz de tableros personalizada.",
        "Mantenimiento predictivo.",
        "Optimizacion de cadena de suministro.",
        "Soporte a decisiones con IA.",
    ];

    return (
        <section className="project-details pb-90">
            <div className="container">
                {/* image */}
                <div className="single-item-image mb-75">
                    <img src={img07} alt="pimage" />
                </div>

                <h2 className="details-content-title mb-15">
                    Soluciones de IA para operaciones mas inteligentes.
                </h2>

                <p>
                    Nuestras soluciones de IA transforman la operacion al automatizar tareas repetitivas, optimizar flujos de trabajo y habilitar decisiones basadas en datos. Construimos sistemas que se adaptan a tus procesos, ya sea para gestionar cadena de suministro, mejorar atencion al cliente o elevar eficiencia interna. Con analitica en tiempo real, insights predictivos e integraciones, ayudamos a reducir costos, aumentar productividad y entregar resultados medibles.
                </p>

                <p className="mt-30">
                    Usando tecnologias como machine learning, NLP y procesamiento de datos en tiempo real, aseguramos que los sistemas evolucionen con tu negocio. El objetivo no es solo implementar herramientas, sino habilitar a tus equipos con capacidades inteligentes.
                </p>

                {/* meta icons */}
                <ul className="project-meta ul_li_between mt-120">
                    {projectMeta.map((item, i) => (
                        <li key={i}>
                            <img src={item.icon} alt="icon" /> <span>{item.label}</span>{" "}
                            {item.value}
                        </li>
                    ))}
                </ul>

                {/* requirements section */}
                <div className="services-outcome-wrap mt-115 mb-125">
                    <h2 className="details-content-title mb-15">Requerimientos del proyecto</h2>

                    <p>
                        El proyecto busca desarrollar una solucion con IA para optimizar operaciones mediante automatizacion inteligente y decision en tiempo real. El sistema debe manejar altos volumenes de datos y generar insights accionables.
                    </p>

                    <ul className="service-outcome-list project-requerment list-unstyled mt-35">
                        {requirementList.map((text, index) => (
                            <li key={index}>
                                <span>
                                    <CheckIcon />
                                </span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className="details-content-title mb-15">Solucion y resultados</h2>

                <p>
                    La solucion propuesta combina algoritmos de machine learning, analitica en tiempo real y automatizacion para convertir operaciones tradicionales en procesos inteligentes y adaptativos. Al integrar analitica predictiva, el sistema anticipa disrupciones, optimiza recursos y automatiza tareas, habilitando una operacion mas precisa y eficiente.
                </p>

                <p className="mt-30">
                    Los insights impulsados por IA permiten responder rapido a cambios en el entorno, reduciendo tiempos muertos y costos operativos. Ademas, las capacidades de aprendizaje continuo permiten que el sistema evolucione con el negocio.
                </p>
            </div>
        </section>
    );
};

export default ProjectDetailsSection;

