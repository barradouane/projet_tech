"use client"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsData from "./NewsData";

export default function News({ site }) {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      let url = "http://localhost/projet_tech-latest/src/backend/get_data.php";
      if (site) {
        url += `?site=${encodeURIComponent(site)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des actualités");
      }
      const data = await response.json();
      setNewsItems(data.actualites || []);
    } catch (error) {
      console.error("Erreur lors du chargement des actualités :", error);
      setError(`Une erreur s'est produite : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [site]);

  if (loading) {
    return <p className="text-center font-medium my-5 text-secondary text-2xl">Chargement ...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-5 text-2xl">Erreur lors de la récupération des données</p>;
  }

  const displayedNews = newsItems.slice(0, 3);

  if (newsItems.length === 0) {
    return (
      <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
        <h2 className="mt-10 sm:mb-0 mb-8 mx-0 text-4xl text-center text-secondary font-medium">
          Actualités {site ? `de ${site}` : "de l'école"}
        </h2>
        <p className="text-center py-5">Aucune actualité disponible {site ? `pour ${site}` : ""} pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
      <h2 className="mt-10 sm:mb-0 mb-8 mx-0 text-4xl text-center text-secondary font-medium">
        Actualités {site ? `de ${site}` : "de l'école"}
      </h2>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-2">
        {displayedNews.map((news, index) => (
          <NewsData
          id={news.id}
          key={index}
          image={news.image ? `http://localhost:8000/uploads/${news.image}` : "https://via.placeholder.com/300"}
          heading={news.titre}
          text={news.description}
          newsDataDetailed={news.newsDataDetailed}  
        />
        ))}
      </div>

      {newsItems.length > 3 && (
        <div className="text-center mt-4">
          <Link
            to={site ? `/all-news/${site}` : "/all-news"}
            className="inline-block px-6 py-2 text-white bg-secondary rounded-2xl hover:bg-opacity-80 transition"
          >
            Voir plus
          </Link>
        </div>
      )}
    </div>
  );
}
