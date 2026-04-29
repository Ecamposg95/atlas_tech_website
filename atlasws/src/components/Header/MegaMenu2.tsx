import React from "react";
import { Link } from "react-router-dom";

// Adjust these imports based on your image folder
import m05 from "../../images/icon/m_05.svg";


const MegaMenuServices: React.FC = () => {
  return (
    <ul className="submenu">
      <li>
        <div className="mega_menu_wrapper">
          <div className="container-fluid p-0">
            <div className="mega_menu_wrapper_inner megamenu_widget_wrapper">
              <div className="row justify-content-lg-between">
                {/* ---------- Main Column ---------- */}
                <div className="col-xl-12 col-lg-12">
                  <div className="mega_menu_box">
                    <div className="megamenu_widget_inner">
                      <div className="row">
                        {/* Column 1 */}
                        <div className="col-xl-4 col-lg-6 megamenu-col">
                          <div className="megamenu_widget">
                            <ul className="icon_list unordered_list_block">
                              {[
                                "Producto SaaS de IA.",
                                "Datos e Inteligencia.",
                                "IA para E-commerce.",
                                "Consultoría en IA.",
                              ].map((text, index) => (
                                <li key={index}>
                                  <Link to="/service-details">
                                    <span className="icon_list_text">
                                      {text}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="col-xl-8 col-lg-6 megamenu-col">
                          <div className="megamenu_widget">
                            <ul className="icon_list unordered_list_block">
                              {[
                                "Chatbot Virtual de IA.",
                                "Marketing con IA.",
                                "Machine Learning.",
                                "Integración de IA.",
                              ].map((text, index) => (
                                <li key={index}>
                                  <Link to="/service-details">
                                    <span className="icon_list_text">
                                      {text}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ---------- Social + Service Link ---------- */}
                    <div className="social_area">
                      <div className="row mt-none-30 align-items-center">
                        <div className="col-xl-4 mt-30">
                          <div className="social_inner ul_li">
                            <span>Síguenos:</span>
                            <ul className="social_icons_list unordered_list">
                              <li>
                                <a href="#!">
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <i className="fab fa-linkedin-in"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6774 7.62177L17.2342 0H15.6805L9.98719 6.61788L5.43998 0H0.195312L7.07159 10.0074L0.195312 18H1.74916L7.76141 11.0113L12.5636 18H17.8083L10.677 7.62177H10.6774ZM8.54921 10.0956L7.8525 9.09906L2.30903 1.16971H4.69564L9.16929 7.56895L9.866 8.56546L15.6812 16.8835H13.2946L8.54921 10.096V10.0956Z"
                                      fill="#FFF"
                                    />
                                  </svg>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <i className="fab fa-dribbble"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Service Link */}
                        <div className="col-xl-8 mt-30">
                          <div className="service_link">
                            <div className="xb-item--inner">
                              <div className="xb-item--holder ul_li">
                                <span className="xb-item--icon">
                                  <img src={m05} alt="icon" />
                                </span>
                                <h3 className="xb-item--title">
                                  <Link to="/contact">
                                    ¿Necesitas servicios personalizados de IA?
                                  </Link>
                                </h3>
                              </div>
                              <p className="xb-item--text">
                                Descubre nuestras ofertas principales.
                              </p>
                            </div>

                            <Link to="/contact" className="xb-item--btn">
                              {/* First SVG */}
                              <svg
                                width="31"
                                height="31"
                                viewBox="0 0 31 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="6.29297"
                                  y="21.4106"
                                  width="22.36"
                                  height="2.83936"
                                  transform="rotate(-40.2798 6.29297 21.4106)"
                                  fill="white"
                                />
                                <rect
                                  x="9.44922"
                                  y="7.56982"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 9.44922 7.56982)"
                                  fill="white"
                                />
                                <rect
                                  x="13.4492"
                                  y="7.89941"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 13.4492 7.89941)"
                                  fill="white"
                                />
                                <rect
                                  x="17.4492"
                                  y="8.23047"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 17.4492 8.23047)"
                                  fill="white"
                                />
                                <rect
                                  x="21.1211"
                                  y="12.562"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 21.1211 12.562)"
                                  fill="white"
                                />
                                <rect
                                  x="20.7969"
                                  y="16.5645"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.7969 16.5645)"
                                  fill="white"
                                />
                                <rect
                                  x="20.4648"
                                  y="20.5664"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.4648 20.5664)"
                                  fill="white"
                                />
                              </svg>

                              {/* Second SVG */}
                              <svg
                                width="31"
                                height="31"
                                viewBox="0 0 31 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="6.29297"
                                  y="21.4106"
                                  width="22.36"
                                  height="2.83936"
                                  transform="rotate(-40.2798 6.29297 21.4106)"
                                  fill="white"
                                />
                                <rect
                                  x="9.44922"
                                  y="7.56982"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 9.44922 7.56982)"
                                  fill="white"
                                />
                                <rect
                                  x="13.4492"
                                  y="7.89941"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 13.4492 7.89941)"
                                  fill="white"
                                />
                                <rect
                                  x="17.4492"
                                  y="8.23047"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 17.4492 8.23047)"
                                  fill="white"
                                />
                                <rect
                                  x="21.1211"
                                  y="12.562"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 21.1211 12.562)"
                                  fill="white"
                                />
                                <rect
                                  x="20.7969"
                                  y="16.5645"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.7969 16.5645)"
                                  fill="white"
                                />
                                <rect
                                  x="20.4648"
                                  y="20.5664"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.4648 20.5664)"
                                  fill="white"
                                />
                              </svg>
                            </Link>

                            <Link to="/contact" className="xb-overlay"></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------- END Main Column ---------- */}
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default MegaMenuServices;
