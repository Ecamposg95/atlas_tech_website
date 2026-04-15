import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import ApplyForm from "./ApplyForm";

const CareerDetails: React.FC = () => {
    return (
        <Fragment>
            <div className='about-page inner-page'>
                <div className="body_wrap o-clip">
                    <Header />
                    <main>
                        <PageTitle pageTitle="Detalle de vacante" pagesub="Vacantes" />
                        <section className="career-details">
                            <div className="container">
                                <div className="cp-details-wrap">

                                    {/* Manager Info */}
                                    <div className="cp-manager_info">
                                        <h2 className="details-content-title mb-30">
                                            Project Manager tecnico - (Tiempo completo)
                                        </h2>

                                        <ul className="xb-details-content list-unstyled mb-35">
                                            <li><span>Departamento :</span> Project Management</li>
                                            <li><span>Vacantes :</span> (3)</li>
                                            <li><span>Tipo :</span> Tiempo completo</li>
                                            <li><span>Ubicacion :</span> Ciudad de Mexico, Mexico.</li>
                                            <li><span>Rango salarial :</span> $80k a $100k (segun experiencia).</li>
                                            <li><span>Fecha limite :</span> 10 de diciembre de 2025</li>
                                            <li><span>Experiencia requerida :</span> 5+ anos</li>
                                        </ul>

                                        <p className="mb-30">
                                            Buscamos un/a Project Manager tecnico/a y un/a Product Designer con experiencia
                                            para unirse a nuestro equipo en Ciudad de Mexico, Mexico. Trabajaras con tecnologia
                                            moderna y practicas de ingenieria solidas. Necesitamos a alguien con comunicacion
                                            clara, capaz de coordinar multiples frentes y con mentalidad resolutiva.
                                        </p>

                                        <p>
                                            Esperamos que trabajes con rapidez y criterio, con enfoque en soluciones simples,
                                            logicas y efectivas para retos nuevos y complejos.
                                        </p>
                                    </div>

                                    {/* Responsabilidades */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">Lo que haras...</h3>
                                        <ul className="content-list mt-25">
                                            <li>Mejorar procesos y estandares de entrega del equipo.</li>
                                            <li>Colaborar con ingenieria, producto y operaciones.</li>
                                            <li>Desbloquear problemas tecnicos y de coordinacion en proyectos complejos.</li>
                                            <li>Participar en decisiones y proponer mejoras.</li>
                                            <li>Dar seguimiento a tiempos, alcance y riesgos.</li>
                                            <li>Elevar calidad, performance y escalabilidad con el equipo.</li>
                                        </ul>
                                    </div>

                                    {/* Experiencia */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">Tu experiencia debe incluir...</h3>
                                        <ul className="content-list mt-25">
                                            <li>6+ anos de experiencia en Project Management.</li>
                                            <li><span>Conocimiento tecnico:</span> buen entendimiento tecnico.</li>
                                            <li><span>Stakeholders:</span> capacidad probada de alineacion.</li>
                                            <li><span>Agile:</span> experiencia practica en metodologias agiles.</li>
                                            <li><span>Riesgos:</span> identificar y mitigar riesgos.</li>
                                            <li><span>Liderazgo:</span> coordinar y motivar equipos.</li>
                                            <li><span>Comunicacion:</span> comunicacion clara con perfil tecnico.</li>
                                            <li><span>Resolucion:</span> pensamiento critico y proactivo.</li>
                                            <li><span>Calidad:</span> mantener estandares altos.</li>
                                        </ul>
                                    </div>

                                    {/* Plus */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">Es un plus si tienes...</h3>
                                        <ul className="content-list mt-25">
                                            <li>Experiencia con AWS.</li>
                                            <li>Experiencia construyendo pipelines de CI/CD.</li>
                                            <li>Experiencia con infraestructura como codigo.</li>
                                            <li>Interes genuino por tecnologia e innovacion.</li>
                                            <li>Estandares altos y enfoque en impacto.</li>
                                            <li>Mentalidad de mejora continua.</li>
                                        </ul>
                                    </div>

                                    {/* Beneficios */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">Beneficios...</h3>
                                        <ul className="content-list mt-25">
                                            <li>Compensacion competitiva.</li>
                                            <li>Bonos y equity (segun rol y desempeno).</li>
                                            <li>Prestaciones de ley y superiores (segun politica vigente).</li>
                                            <li>Flexibilidad y enfoque en resultados.</li>
                                        </ul>
                                    </div>
                                    
                                    {/* ApplyForm */}
                                    <ApplyForm />

                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                    <Scrollbar />
                </div>
            </div>
        </Fragment>
    );
};

export default CareerDetails;
