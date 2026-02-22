import React, { useState } from "react"

const ServiceFaq: React.FC = () => {

    // Accordion Active Index
    const [active, setActive] = useState<number>(1);

    const toggleAccordion = (index: number) => {
        setActive(active === index ? -1 : index);
    };

    const faqItems = [
        {
            id: 1,
            title: "01. Escuchamos tus necesidades",
            content:
                "Ofrecemos soluciones de IA personalizadas y desarrolladas en torno a tus objetivos y desafíos comerciales específicos. Al comprender tus necesidades únicas, creamos sistemas inteligentes que impulsan la eficiencia y mejoran el rendimiento.",
        },
        {
            id: 2,
            title: "02. Soluciones Personalizadas",
            content:
                "Nuestros sistemas se adaptan a tu infraestructura operativa. Diseñamos herramientas precisas que se integran en tu negocio para agilizar tus flujos de trabajo clave.",
        },
        {
            id: 3,
            title: "03. Alineación Táctica",
            content:
                "Garantizamos que la tecnología adoptada cumpla con una hoja de ruta clara, apoyando los procesos, métricas y objetivos a corto y largo plazo de tu empresa.",
        },
        {
            id: 4,
            title: "04. Resultados Medibles",
            content:
                "Nuestro enfoque asegura un retorno sobre la misma, con procesos optimizados y escalabilidad a medida que tu negocio avanza en el entorno digital.",
        },
    ];


    return (
        <div className="service-process-wrap pt-120 pb-125">
            <div className="row mt-none-50 align-items-center">
                {/* LEFT SIDE ACCORDION */}
                <div className="col-lg-6 mt-50">
                    <h2 className="details-content-title mb-40">Proceso de trabajo</h2>

                    <div className="service_process_faq">
                        <div className="accordion">
                            {faqItems.map((item) => (
                                <div className="accordion-item" key={item.id}>
                                    <div
                                        className={`accordion-button ${active === item.id ? "" : "collapsed"
                                            }`}
                                        role="button"
                                        onClick={() => toggleAccordion(item.id)}
                                    >
                                        {item.title}
                                    </div>

                                    <div
                                        className={`accordion-collapse collapse ${active === item.id ? "show" : ""
                                            }`}
                                    >
                                        <div className="accordion-body">
                                            <p className="m-0">{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE CLICKABLE LIST */}
                <div className="col-lg-6 mt-50">
                    <ul className="content_layer_group list-unstyled">
                        {faqItems.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => toggleAccordion(item.id)}
                                className={active === item.id ? "active" : ""}
                            >
                                <span>{item.title.replace(/^\d+\.\s/, "")}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ServiceFaq;