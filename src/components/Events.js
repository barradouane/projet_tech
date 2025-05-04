"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EventsData from "./EventsData"

export default function Events({ site }) {
  const [eventItems, setEventItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEvents = async () => {
    // Récupération des données depuis get_data
    try {
      // Construire l'URL avec le paramètre site si fourni
      let url = "https://projetportailetudiant.eilco-ulco.fr/backend/get_data.php"
      if (site) {
        url += `?site=${encodeURIComponent(site)}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des événements")
      }
      const data = await response.json()
      setEventItems(data.evenements || [])
    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error)
      setError(`Une erreur s'est produite : ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [site])

  if (loading) {
    return <p className="text-center font-medium my-5 text-secondary text-2xl">Chargement ...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 py-5 text-2xl">Erreur lors de la récupération des données</p>
  }

  // Toujours limiter à 3 événements sur la page principale
  const displayedEvents = eventItems.slice(0, 3)

  // Si aucun événement n'est trouvé pour ce site
  if (eventItems.length === 0) {
    return (
      <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
        <h2 className="mt-10 sm:mb-0 mb-8 mx-0 text-4xl text-center text-secondary font-medium">
          Evénements à venir {site ? `à ${site}` : ""}
        </h2>
        <p className="text-center py-5">Aucun événement disponible {site ? `pour ${site}` : ""} pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
      <h2 className="mt-10 sm:mb-0 mb-8 mx-0 text-4xl text-center text-secondary font-medium">
        Evénements à venir {site ? `à ${site}` : ""}
      </h2>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-2">
        {displayedEvents.map((event, index) => (
          <EventsData
            id={event.id}
            key={index}
            image={event.image ? `https://projetportailetudiant.eilco-ulco.fr/backend/uploads/${event.image}` : "https://via.placeholder.com/300"}
            heading={event.titre}
            text={event.description}
            date={event.date}
          />
        ))}
      </div>

      {/* Bouton "Voir plus" qui redirige vers la page de tous les événements avec le site en paramètre */}
      {eventItems.length > 3 && (
        <div className="text-center mt-4">
          <Link
            to={site ? `/all-events/${site}` : "/all-events"}
            className="inline-block px-6 py-2 text-white bg-secondary rounded-2xl hover:bg-opacity-80 transition"
          >
            Voir plus
          </Link>
        </div>
      )}
    </div>
  )
}

