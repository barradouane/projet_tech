"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import EventsData from "./EventsData"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function AllEvents({ siteProp }) {
  const [eventItems, setEventItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { site: siteParam } = useParams() // Récupère le paramètre site de l'URL
  const navigate = useNavigate()
  const location = useLocation()

  // Utiliser le site passé en prop, celui de l'URL, ou celui des paramètres de requête
  const site = siteProp || siteParam || new URLSearchParams(location.search).get("site")

  console.log("AllEvents component - site:", site) // Pour déboguer

  const fetchEvents = async () => {
    try {
      // Construire l'URL avec le paramètre site si fourni
      let url = "http://localhost/projet_tech-latest/src/backend/get_data.php"
      if (site) {
        url += `?site=${encodeURIComponent(site)}`
      }

      console.log("Fetching from URL:", url) // Pour déboguer

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des événements")
      }
      const data = await response.json()
      setEventItems(data.evenements || [])
      console.log("Fetched events:", data.evenements) // Pour déboguer
    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error)
      setError(`Une erreur s'est produite : ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
    // Faire défiler vers le haut de la page quand elle est chargée
    window.scrollTo(0, 0)
  }, [site])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center font-medium my-5 text-secondary text-2xl">Chargement ...</p>
        </div>
        <Footer />
      </>
    )
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
    )
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary mt-24">Tous les événements {site ? `à ${site}` : ""}</h1>
          
        </div>

        {eventItems.length === 0 ? (
          <p className="text-center py-5">Aucun événement disponible {site ? `pour ${site}` : ""} pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventItems.map((event, index) => (
              <EventsData
                id={event.id}
                key={index}
                image={event.image ? `http://localhost:8000/uploads/${event.image}` : "https://via.placeholder.com/300"}
                heading={event.titre}
                text={event.description}
                date={event.date}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

