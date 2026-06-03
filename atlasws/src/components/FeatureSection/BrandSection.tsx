import Marquee from "react-fast-marquee";

// Logos de empresas e instituciones con las que hemos trabajado.
// SVG blancos servidos desde /public/images/brand/ (se ven sobre fondo oscuro).
const brands = [
  { src: "/images/brand/bjx-motors.svg", name: "BJX Motors" },
  { src: "/images/brand/syner-group.svg", name: "Syner Group" },
  { src: "/images/brand/oftavision.svg", name: "OftaVisión" },
  { src: "/images/brand/dasic.svg", name: "DASIC" },
  { src: "/images/brand/smart-site.svg", name: "Smart Site Company" },
  { src: "/images/brand/rmazh.svg", name: "R MAZH Comercializadora" },
  { src: "/images/brand/unam.svg", name: "UNAM" },
  { src: "/images/brand/ipn.svg", name: "Instituto Politécnico Nacional (IPN)" },
  { src: "/images/brand/cic-ipn.svg", name: "Centro de Investigación en Computación (IPN)" },
];

const BrandSection: React.FC = () => {
  return (
    <section className="brand pt-170 pb-150">
      <div className="container">
        <div className="xb-brand-wrap xb-border">
          <div className="brand-sub-title xb-border">
            <p>Empresas e instituciones que confían en nosotros</p>
          </div>

          <Marquee speed={40} gradient={false} pauseOnHover>
            <div className="brand-marquee marquee-left">
              <div className="xb-brand-inner ul_li_between">
                {brands.map((b) => (
                  <div className="xb-brand-item" key={b.name} title={b.name}>
                    <img
                      src={b.src}
                      alt={b.name}
                      loading="lazy"
                      style={{ height: 46, width: "auto", maxWidth: 170, objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
