import React from "react";
import { HomeDict } from "../../i18n/types";
import { AtlasMark } from "./AtlasMark";

interface Props { dict: HomeDict }

export const MstFooter: React.FC<Props> = ({ dict }) => (
  <footer className="mst-footer">
    <div className="mst-wrap">
      <div className="mst-footer-row">
        <div>
          <p className="nav-brand"><AtlasMark title="Atlas Tech" /> <span>Atlas Tech</span></p>
          <p className="mst-meta">{dict.footer.base}</p>
        </div>
        <div className="mst-footer-links">
          <a href={`mailto:${dict.contact.email}`}>{dict.contact.email}</a>
          <a href={dict.contact.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {dict.contact.whatsappLabel}</a>
          <a href={dict.footer.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={dict.footer.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
      <p className="mst-footer-small">{dict.footer.rights}</p>
    </div>
  </footer>
);
