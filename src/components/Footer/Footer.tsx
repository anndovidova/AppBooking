import React from 'react';
import './Footer.css';
import media1 from '../../images/media/media1.svg';
import media2 from '../../images/media/media2.svg';
import media3 from '../../images/media/media3.svg';
import media4 from '../../images/media/media4.svg';

const Footer: React.FC = () => {
  return (
    <footer>
      <section>
        <div className="documents">
          <a>
            <span data-i18n="documents1">TERMS AND CONDITIONS</span>
          </a>
          <a>
            <span data-i18n="documents2">CENCELLATION POLICY</span>
          </a>
          <a>
            <span data-i18n="documents3">PRIVACY POLICY</span>
          </a>
        </div>
        <div className="media">
          <img src={media1} alt="" />
          <img src={media2} alt="" />
          <img src={media3} alt="" />
          <img src={media4} alt="" />
        </div>
      </section>
    </footer>
  );
};
export default Footer;
