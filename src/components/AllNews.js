"use client"

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NewsData from "./NewsData";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AllNews({ siteProp }) {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { site: siteParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const site = siteProp || siteParam || new URLSearchParams(location.search).get("site");

  console.log("AllNews component - site:", site);

  const fetchNews = async () => {
    try {
      let url = "http://localhost:8000/get_data.php";
      if (site) {
        url += `?site=${encodeURIComponent(site)}`;
      }

      console.log("Fetching from URL:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des actualités");
      }
      const data = await response.json();
      setNewsItems(data.actualites || []);
      console.log("Fetched news:", data.actualites);
    } catch (error) {
      console.error("Erreur lors du chargement des actualités :", error);
      setError(`Une erreur s'est produite : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    window.scrollTo(0, 0);
  }, [site]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center font-medium my-5 text-secondary text-2xl">Chargement ...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-red-500 py-5 text-2xl">Erreur lors de la récupération des données</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary mt-24">Toutes les actualités {site ? `de ${site}` : ""}</h1>
        </div>

        {newsItems.length === 0 ? (
          <p className="text-center py-5">Aucune actualité disponible {site ? `pour ${site}` : ""} pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news, index) => (
              <NewsData
                id={news.id}
                key={index}
                image={news.image ? `http://localhost:8000/uploads/${news.image}` : "https://via.placeholder.com/300"}
                heading={news.titre}
                text={news.description}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}