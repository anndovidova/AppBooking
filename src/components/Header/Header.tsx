import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import lang1 from '../../images/languages/united-kingdom.svg';
import lang2 from '../../images/languages/germany.svg';
import lang3 from '../../images/languages/denmark.svg';
import translations from './translations';

const langMap = {
  UK: 'en',
  Germany: 'de',
  Denmark: 'dk',
};
interface LanguageOption {
  code: string;
  icon: string;
  alt: string;
}
const Header: React.FC = () => {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'de' | 'dk'>('en');
  const languages: LanguageOption[] = [
    { code: 'en', icon: lang1, alt: 'UK' },
    { code: 'de', icon: lang2, alt: 'Germany' },
    { code: 'dk', icon: lang3, alt: 'Denmark' },
  ];
  const handleLanguageSelect = (langCode: 'en' | 'de' | 'dk') => {
    setCurrentLang(langCode);
    setShowLanguageOptions(false);
  };
  useEffect(() => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = translations[currentLang]?.[key || ''];
      if (translation) {
        if (['P', 'H1', 'H2', 'H3', 'SPAN'].includes(el.tagName)) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
  }, [currentLang]);
  const currentLangObj = languages.find((l) => l.code === currentLang)!;
  const otherLanguages = languages.filter((l) => l.code !== currentLang);

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <nav>
        <ul className="navigation">
          <li>
            <Link to="/">
              <span data-i18n="nav.home">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/the-hut">
              <span data-i18n="nav.hut">The Hut</span>
            </Link>
          </li>
          <li>
            <Link to="/the-area">
              <span data-i18n="nav.area">The Area</span>
            </Link>
          </li>
          <li>
            <Link to="/booking">
              <span data-i18n="nav.booking">Booking</span>
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              <span data-i18n="nav.about">About Us</span>
            </Link>
          </li>
          <li>
            <Link to="/faq">
              <span data-i18n="nav.faq">FAQ</span>
            </Link>
          </li>
        </ul>

        <div className="language-dropdown">
          <button className="lang-selected" onClick={() => setShowLanguageOptions((prev) => !prev)}>
            <img src={currentLangObj.icon} alt={currentLangObj.alt} />
          </button>
          {showLanguageOptions && (
            <div className="language-options">
              {' '}
              {otherLanguages.map((lang) => (
                <button key={lang.code} onClick={() => handleLanguageSelect(lang.code as any)}>
                  <img src={lang.icon} alt={lang.alt} />
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      <button className="book" data-i18n="book">
        Book Now
      </button>
    </header>
  );
};

export default Header;
