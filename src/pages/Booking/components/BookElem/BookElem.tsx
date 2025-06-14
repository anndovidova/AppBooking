import React, { useState } from 'react';
import './BookElem.css';

interface ElementProps {
  title1: string;
  title2: string;
  description1: string;
  description2: string;
}
const Element: React.FC<ElementProps> = ({title1, title2, description1,description2 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className={`item ${isOpen ? 'open' : ''}`}>
      <div className="hero-item">
        <button className="but1">+</button>
        <div>
          <h1>{title1}</h1>
          <p>{title2}</p>
        </div>
        <button className="but2" onClick={toggleDescription}></button>
      </div>
      {isOpen && (
        <div className="item-description">
          <h1>{description1}</h1>
          <p>{description2}</p>
        </div>
      )}
    </section>
  );
};

export default Element;