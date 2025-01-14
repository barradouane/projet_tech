import React, { useState } from 'react';
import './Evenements.css';

function Evenements({ events }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Affiche ou masque le contenu
  };

  return (
    <section className="evenements">
      <h2 className="evenements-title">Événements à venir</h2>
      <div className="evenements-container">
        {events.map((item, index) => (
          <div
            className={`evenement-card ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => handleClick(index)}
            style={{
              backgroundImage: `url(${item.image})`, // Applique l'image de fond
              backgroundColor: item.image ? 'transparent' : '#f0f8ff', // Choisit la couleur de fond par défaut si l'image est absente
            }}
          >
            <div className="evenement-overlay">
              <h3 className="evenement-title">{item.titre}</h3>
            </div>
            {activeIndex === index && (
              <div className="evenement-content">
                <p className="evenement-date">{item.date}</p>
                <p className="evenement-description">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Evenements;
