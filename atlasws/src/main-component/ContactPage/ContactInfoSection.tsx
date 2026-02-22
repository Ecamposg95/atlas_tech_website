import React from "react";

// --- contact images ---
import img01 from "../../images/contact/img01.png";
import img02 from "../../images/contact/img02.png";
import img03 from "../../images/contact/img03.png";

// --- arrow icons ---
import arrowWhite from "../../images/icon/rotate-arrow-white02.svg";
import arrowBlack from "../../images/icon/rotate-arrow-black03.svg";
import { Link } from "react-router-dom";

// ---- contact items data ----
const contactData = [
  {
    location: "Ciudad de México, México",
    phone: "+(52) 555 555 5555",
    email: "hola@atlastech.mx",
    img: img01,
  },
  {
    location: "Monterrey, México",
    phone: "+(52) 818 888 8888",
    email: "hola@atlastech.mx",
    img: img02,
  },
  {
    location: "Guadalajara, México",
    phone: "+(52) 333 333 3333",
    email: "hola@atlastech.mx",
    img: img03,
  },
];

const ContactInfoSection: React.FC = () => {
  return (
    <section className="contact pb-150">
      <div className="container">
        <div className="row mt-none-30">
          {contactData.map((item, index) => (
            <div className="col-lg-4 col-md-6 mt-30" key={index}>
              <div className="xb-contact-items img-hove-effect xb-border">
                <div className="xb-item--inner">

                  {/* Multiple hover images */}
                  <div className="xb-img">
                    <Link to="/contact"><img src={item.img} alt="location" /></Link>
                    <Link to="/contact"><img src={item.img} alt="location" /></Link>
                    <Link to="/contact"><img src={item.img} alt="location" /></Link>
                    <Link to="/contact"><img src={item.img} alt="location" /></Link>
                  </div>

                  {/* Content */}
                  <div className="xb-item--holder">
                    <p className="xb-item--location">{item.location}</p>
                    <span className="xb-item--contact_info">{item.phone}</span>
                    <span className="xb-item--contact_info">{item.email}</span>

                    <Link to="/contact" className="thm-btn form-btn mt-45">
                      VIEW LOCATION
                      <span className="xb-icon">
                        <img src={arrowWhite} alt="icon" />
                        <img src={arrowBlack} alt="icon" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
