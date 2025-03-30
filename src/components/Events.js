import React, { useState, useEffect } from "react";
import EventsData from "./EventsData";

export default function Events() {
  const [eventItems, setEventItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);  // Affichage complet ou non

  const fetchEvents = async () => {
    // Récupération des données depuis get_data
    try {
      const response = await fetch("http://localhost/projet_tech-elmehdi/projet_tech-elmehdi/src/backend/get_data.php");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des événements");
      }
      const data = await response.json();
      setEventItems(data.evenements || []);
    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error);
      setError(`Une erreur s'est produite : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center font-medium my-5 text-secondary text-2xl">Chargement ...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-5 text-2xl">Erreur lors de la récupération des données</p>;
  }

  //Pour faire un bon affichage et pour que ça se soit pas cluttered
  const displayedEvents = showAll ? eventItems : eventItems.slice(0, 3); // 3 premières ou toutes

  return (
    <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
      <h2 className="mt-10 sm:mb-0 mb-8 mx-0 text-4xl text-center text-secondary font-medium">
        Evénements à venir
      </h2>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-2">
      {displayedEvents.map((event, index) => (
    <EventsData
    id={event.id}
      key={index}
      image={
        event.image
          ? `http://localhost/projet_tech-elmehdi/projet_tech-elmehdi/src/backend/${event.image}`
          : "https://via.placeholder.com/300"
      }
      heading={event.titre}
      text={event.description}
      date={event.date}
    />
  ))}
 
</div>
 {/* Bouton "Voir plus"/"Voir moins" */}
 {eventItems.length > 3 && (
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