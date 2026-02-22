import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// IMAGES
import blog1 from "../../images/blog/img04.jpg";
import blog2 from "../../images/blog/img4.2.jpg";
import blog3 from "../../images/blog/img4.3.jpg";
import blog4 from "../../images/blog/img4.4.jpg";

import shapeLeft from "../../images/shape/prev-shape.png";
import shapeRight from "../../images/shape/next-shape.png";

const blogSlides = [
  {
    img: blog1,
    tag: "# tips de negocios ia",
    title: "¡Estamos en vivo! Explora nuestras soluciones inteligentes de IA para el futuro de los negocios.",
    content:
      "Descubre nuestras soluciones de IA diseñadas para ayudar a las empresas a automatizar tareas, obtener información valiosa y crecer más rápido.",
  },
  {
    img: blog2,
    tag: "# chatbots tips",
    title: "Por qué los chatbots de IA son el próximo gran avance en la comunicación empresarial..",
    content:
      "Los chatbots están reformando la comunicación con soporte instantáneo y respuestas personalizadas, reduciendo los costos operativos.",
  },
  {
    img: blog3,
    tag: "# tips de negocios ia",
    title: "Cómo las agencias de IA ayudan a las pymes a competir con marcas globales..",
    content:
      "Potenciamos a las empresas con herramientas avanzadas como analítica, automatización y marketing hiper-personalizado.",
  },
  {
    img: blog4,
    tag: "# tips de negocios ia",
    title: "Los principales servicios que debes esperar de una firma moderna de ingeniería e IA..",
    content:
      "Las firmas modernas ofrecen desde chatbots y análisis predictivos, hasta automatización de procesos y arquitecturas Web3.",
  },
];

const BlogSlider: React.FC = () => {
  return (
    <section className="blog pt-70">
      <div className="container">
        <div className="blog-slider pos-rel">

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".blog-swiper-btn.swiper-button-next",
              prevEl: ".blog-swiper-btn.swiper-button-prev",
            }}
            className="swiper-container"
          >
            {blogSlides.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="blog-slide-item">
                  <div className="xb-item--img">
                    <img src={item.img} alt="Blog" />
                  </div>

                  <div className="xb-item--holder">
                    <a href="#!" className="xb-item--tag xb-border">{item.tag}</a>

                    <h2 className="xb-item--title">
                      <a href="/blog-details">{item.title}</a>
                    </h2>

                    <p className="xb-item--content">{item.content}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* PAGINATION */}
          <div className="swiper-pagination"></div>

          {/* NAV BUTTONS */}
          <div className="blog-item_button">
            <div className="blog-swiper-btn swiper-button-prev">
              <img src={shapeLeft} alt="" />
              <i className="fa-regular fa-angles-left"></i>
            </div>

            <div className="blog-swiper-btn swiper-button-next">
              <img src={shapeRight} alt="" />
              <i className="fa-regular fa-angles-right"></i>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
