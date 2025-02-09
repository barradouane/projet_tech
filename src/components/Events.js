import React, { useState, useEffect } from "react";
import EventsData from "./EventsData";

export default function Events() {
  const [eventItems, setEventItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_data.php");
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
    return <p className="text-center font-medium my-5 text-secondary text-2xl">Chargement des événements...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
      <h2 className="mt-10 sm:mb-0 mb-8 mx-0 sm:text-5xl text-3xl text-center text-secondary font-medium">
        Evénements à venir
      </h2>

      <div className="flex flex-wrap justify-between">
  {eventItems.map((event, index) => (
    <EventsData
      key={index}
      image={
        event.image
          ? `http://localhost:8000/uploads/${event.image}`
          : "https://via.placeholder.com/300"
      }
      heading={event.titre}
      text={event.description}
      date={event.date}
    />
  ))}
</div>

    </div>
  );
}
