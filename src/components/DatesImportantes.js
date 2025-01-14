import React, { useState } from 'react';
import './DatesImportantes.css';  // N'oubliez pas de créer le fichier CSS correspondant

function DatesImportantes({ dates }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Affiche ou masque le contenu
  };

  return (
    <section className="dates-importantes">
      <h2 className="dates-title">Dates Importantes</h2>
      <div className="dates-container">
        {dates.map((item, index) => (
          <div
            className={`date-card ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => handleClick(index)}
            style={{
              backgroundColor: item.color || '#f0f8ff', // Choisit une couleur de fond par défaut si 'color' est absente
            }}
          >
            <div className="date-overlay">
              <h3 className="date-title">{item.titre}</h3>
              <p className="date-day">{item.date}</p>
            </div>
            {activeIndex === index && (
              <div className="date-content">
                <p className="date-description">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default DatesImportantes;
