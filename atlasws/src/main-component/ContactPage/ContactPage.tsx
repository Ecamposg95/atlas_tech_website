import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import ContactForm from "../../components/ContactFrom/ContactForm";

// import background image
import contactBg from "../../images/bg/contact-bg02.png";

const ContactPage: React.FC = () => {
  return (
    <Fragment>
      <div className='about-page inner-page'>
        <div className="body_wrap o-clip">
          <Header />
          <main>
            <PageTitle pageTitle="Contáctanos" pagesub="Contáctanos" />
            
            <section className="contact">
              <div className="container">
                <div
                  className="xb-contact-wrap xb-border bg_img"
                  style={{
                    backgroundImage: `url(${contactBg})`,
                  }}
                >
                  <div className="xb-contact-form xb-main-contact xb-border">
                    <div className="form-heading text-center mb-30">
                      <h3 className="title">¿Listo para colaborar con nosotros?</h3>
                      <p className="sub-title clr-white">
                        Quién sabe a dónde podría llevarte un solo mensaje.
                      </p>
                    </div>

                    <ContactForm />
                  </div>

                  {/* Google Map Embed */}
                  <div className="google-map">
                    <iframe
                      src="https://www.google.com/maps?q=Ciudad%20de%20Mexico%2C%20Mexico&output=embed"
                      loading="lazy"
                      title="gmap"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ width: "100%", height: "100%", border: 0 }}
                      allowFullScreen
                    ></iframe>
                  </div>
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

export default ContactPage;
