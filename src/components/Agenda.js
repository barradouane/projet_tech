import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Agenda.css';

function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventDescription, setEventDescription] = useState('');
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  // Gérer le changement de date dans le calendrier
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEventDescription(''); // Réinitialiser la saisie
    setEditingEventIndex(null); // Réinitialiser l'état de modification
  };

  // Ajouter ou modifier un événement
  const handleAddOrUpdateEvent = () => {
    if (eventDescription.trim()) {
      if (editingEventIndex !== null) {
        // Modification d'un événement existant
        const updatedEvents = [...events];
        updatedEvents[editingEventIndex] = {
          ...updatedEvents[editingEventIndex],
          description: eventDescription.trim(),
        };
        setEvents(updatedEvents);
      } else {
        // Ajout d'un nouvel événement
        setEvents([
          ...events,
          {
            date: selectedDate.toDateString(),
            description: eventDescription.trim(),
          },
        ]);
      }
      setEventDescription(''); // Réinitialiser après ajout ou modification
      setEditingEventIndex(null); // Réinitialiser l'état de modification
    }
  };

  // Supprimer un événement
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  // Filtrer les événements pour la date sélectionnée
  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDate.toDateString()
  );

  // Gérer la modification d'un événement
  const handleEditEvent = (index) => {
    setEditingEventIndex(index);
    setEventDescription(events[index].description);
  };

  return (
    <div className="agenda">
      <h2>Agenda Intelligent</h2>
      
      {/* Calendrier */}
      <Calendar onChange={handleDateChange} value={selectedDate} />

      {/* Formulaire de saisie pour ajouter ou modifier un événement */}
      <div className="event-form">
        <input
          type="text"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Ajoutez ou modifiez un événement"
        />
        <button onClick={handleAddOrUpdateEvent}>
          {editingEventIndex !== null ? 'Modifier' : 'Ajouter'}
        </button>
      </div>

      {/* Affichage des événements pour la date sélectionnée */}
      <div className="event-details">
        <h3>Événements pour {selectedDate.toDateString()}</h3>
        {eventsForSelectedDate.length > 0 ? (
          <ul>
            {eventsForSelectedDate.map((event, index) => (
              <li key={index}>
                {event.description}
                <button onClick={() => handleEditEvent(index)}>Modifier</button>
                <button onClick={() => handleDeleteEvent(index)}>Supprimer</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun événement pour cette date.</p>
        )}
      </div>
    </div>
  );
}

export default Agenda;
