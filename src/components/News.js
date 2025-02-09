import React, { useEffect, useState } from "react";
import NewsData from "./NewsData";

export default function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_data.php");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await response.json();
      setNewsItems(data.actualites);
    } catch (error) {
      console.error("Erreur lors du chargement des actualités :", error);
      setError(`Une erreur s'est produite : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <p className="text-center font-medium my-5 text-secondary text-2xl">Chargement des actualités...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
      <h2 className="mx-0 sm:text-5xl text-3xl text-center text-secondary font-medium">
        Actualités de l'école
      </h2>

      <div className="flex sm:flex-row flex-col">
        {newsItems.map((news, index) => (
          <NewsData
            key={index}
            image={
              news.image
                ? `http://localhost:8000/uploads/${news.image}`
                : "https://via.placeholder.com/300"
            }
            heading={news.titre}
            text={news.description}
          />
        ))}
      </div>
    </div>
  );
}
