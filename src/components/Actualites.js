import React, { useState } from 'react';
import './Actualites.css';

function Actualites({ news }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Affiche ou masque le contenu
  };

  return (
    <section className="actualites">
      <h2 className="actualites-title">Actualités de l'École</h2>
      <div className="actualites-container">
        {news.map((item, index) => (
          <div
            className={`actualite-card ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => handleClick(index)}
            style={{
              backgroundImage: `url(${item.image})`, // Applique l'image de fond
              backgroundColor: item.image ? 'transparent' : '#f0f8ff', // Choisit la couleur de fond par défaut si l'image est absente
            }}
          >
            <div className="actualite-overlay">
              <h3 className="actualite-title">{item.titre}</h3>
            </div>
            {activeIndex === index && (
              <div className="actualite-content">
                <p className="actualite-date">{item.date}</p>
                <p className="actualite-description">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Actualites;
