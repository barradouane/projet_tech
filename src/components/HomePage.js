import React from 'react';
import './NavBar.css';
import NavBar from './NavBar';
import Header from './Header';
import Actualites from './Actualites';
import Agenda from './Agenda';
import Footer from './Footer';
import FixedHeader from './FixedHeader';
import Evenements from './Evenements';
import DatesImportantes from './DatesImportantes';

const dates = [
  {
    titre: "Réunion annuelle",
    date: "12 Mars 2025",
    description: "Une réunion annuelle pour discuter des objectifs et des stratégies de l'année.",
    color: "#dfe6e9", // Couleur personnalisée
  },
  {
    titre: "Vacances d'été",
    date: "1er Juillet 2025",
    description: "Les vacances d'été commencent le 1er juillet et se terminent le 31 août.",
  },
  {
    titre: "Rentrée scolaire",
    date: "1er Septembre 2025",
    description: "Le début des cours pour l'année scolaire 2025-2026.",
  },
];
const actualitesData = [
  {
    titre: "Rentrée universitaire 2025",
    date: "13 janvier 2025",
    description: "Les cours commencent le 20 janvier 2025 pour tous les étudiants.",
    image: "https://via.placeholder.com/300x200?text=Rentrée+2025", // Exemple d'image
  },
  {
    titre: "Conférence sur l'IA",
    date: "15 janvier 2025",
    description: "Une conférence sur l'intelligence artificielle aura lieu le 25 janvier.",
    image: "https://via.placeholder.com/300x200?text=Conférence+IA", // Exemple d'image
  },
  {
    titre: "Nouvelle bibliothèque numérique",
    date: "10 janvier 2025",
    description: "Découvrez notre nouvelle bibliothèque numérique avec accès illimité.",
    image: "https://via.placeholder.com/300x200?text=Bibliothèque", // Exemple d'image
  },
];
const eventsData = [
  {
    titre: 'Concert de Jazz',
    date: '15 février 2025',
    description: 'Un concert de jazz en plein air avec des artistes internationaux.',
    image: 'image-concert.jpg',
  },
  {
    titre: 'Conférence Tech 2025',
    date: '20 mars 2025',
    description: 'Conférence sur les nouvelles tendances technologiques.',
    image: 'image-conference.jpg',
  },
  // Ajoutez ici d'autres événements
];


function HomePage() {
  return (
    <div>
      <FixedHeader />
      
      <div className="content"> {/* Ajout de la classe content pour gérer l'espace */}
        <Actualites news={actualitesData} />
        <Evenements events={eventsData} />
        <DatesImportantes dates={dates} />
        
        <Agenda />
      </div>
      <Footer />
      
    </div>
  );
}

export default HomePage;
