import React from "react";
import contactBg from "../../images/bg/contact-bg.png";
import ContactForm from "../ContactFrom/ContactForm";

const ContactSection: React.FC = () => {
  return (
    <section
      className="contact-section pt-120 pb-120 bg_img"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 10, 30, 0.85) 0%, rgba(40, 20, 80, 0.9) 100%), url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Heading */}
          <div className="col-lg-8 text-center mb-50">
            <span
              className="sub-title d-block mb-15"
              style={{ color: "#a855f7", letterSpacing: "0.2em", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}
            >
              Contáctanos
            </span>
            <h2
              className="title"
              style={{
                backgroundImage: "linear-gradient(110deg, #ffffff 0%, #9333ea 55%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              ¿Listo para transformar<br />tu negocio?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "16px", fontSize: "1rem", lineHeight: 1.7 }}>
              Cuéntanos tu proyecto. Un solo mensaje puede ser el punto de partida de algo extraordinario.
            </p>
          </div>

          {/* Form */}
          <div className="col-lg-8">
            <div
              className="xb-contact-form"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "40px",
              }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
