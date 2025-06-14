import React, { useState } from 'react';
import './Element.css';

interface ElementProps {
  title: string;
  description: string;
  description1: string;
  description2: string;
  description3: string;
}
const Element: React.FC<ElementProps> = ({ title , description , description1,description2,description3 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-but1">{title} <button className="faq-but2" onClick={toggleDescription}></button></div>
      {isOpen && (
        <div className="description"><h1>{description}</h1>
          <p>{description1}<br /><br />{description2}<br /><br />{description3}</p>
        </div>
      )}
    </section>
  );
};

export default Element;
