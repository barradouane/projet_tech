import React, { useEffect, useState } from "react";
import NewsData from "./NewsData";

export default function News() {
  const [newsItems, setNewsItems] = useState([]); // Actualités
  const [loading, setLoading] = useState(true);   // Chargement
  const [error, setError] = useState(null);       // Erreur
  const [showAll, setShowAll] = useState(false);  // Affichage complet ou non

  // Récupérer les actualités
  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost/projet_tech-elmehdi/projet_tech-elmehdi/src/backend/get_data.php");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await response.json();
      setNewsItems(data.actualites); // Stocke les actualités récupérées
    } catch (error) {
      console.error("Erreur lors du chargement des actualités :", error);
      setError(`Une erreur s'est produite : ${error.message}`);
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  useEffect(() => {
    fetchNews(); // Chargement initial
  }, []);

  // Gestion du chargement et des erreurs
  if (loading) {
    return <p className="text-center font-medium py-5 text-secondary text-2xl">Chargement ...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-2xl py-5">Erreur lors de la récupération des données</p>;
  }

  const displayedNews = showAll ? newsItems : newsItems.slice(0, 3); // 3 premières ou toutes

  return (
    <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
      <h2 className="mx-0 text-4xl text-center text-secondary font-medium">
        Actualités de l'école
      </h2>

      {/* Afficher jusqu'à 3 actualités dans un grand écran seulement */}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-2">
        {displayedNews.map((news, index) => (
          <NewsData
          id={news.id}
            key={index}
            image={
              news.image
                ? `http://localhost/projet_tech-elmehdi/projet_tech-elmehdi/src/backend/uploads/${news.image}`
                : "https://via.placeholder.com/300"
            }
            heading={news.titre}
            text={news.description}
          />
        ))}
      </div>

      {/* Bouton "Voir plus"/"Voir moins" */}
      {newsItems.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 text-white bg-secondary rounded-2xl hover:bg-opacity-80 transition"
          >
            {showAll ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      )}
    </div>
  );
}
