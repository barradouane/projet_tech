import Application from "./Application";
import Navbar from "./Navbar";

export default function VieEtudiante() {
    return (
      <div className="flex flex-col items-center pt-36 min-h-screen pb-20 bg-white">
        <Navbar />
        
        <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-6 mb-4 mt-0 text-center">
          Vie étudiante à l'EILCO (Culture, sport, et associations étudiantes)
        </h1>
  
        {/* <p className="text-gray-700 text-xl font-medium sm:mx-24 mx-5 my-6 text-justify">
          Le campus, ce n’est pas que les études ! C'est aussi un lieu pour se défouler, se dépasser et partager des moments forts à travers le sport. Que ce soit en rejoignant une équipe, en testant de nouvelles disciplines ou simplement en profitant des infrastructures sportives, il y a mille façons de bouger ! Reste à l’affût des événements sportifs, des tournois et des séances d’initiation. C'est l'occasion parfaite pour allier bien-être, esprit d'équipe et fun tout au long de l'année !
        </p> */}
  
        <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-10 gap-8 sm:mx-16 mx-6">
          {/* Vie sportive */}
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 ">
            <h2 className="text-secondary font-medium text-[25px] text-left py-2 border-b-2 mb-4">Vie sportive</h2>
            <Application
              titre="SUAPS"
              lien="https://suaps.univ-littoral.fr/"
              description="C'est le service Universitaire des activités physiques et sportives qui gère les activités et les équipements sportifs."
            />
            <Application
              titre="Activités sportives à l'EILCO"
              lien="https://suaps.extranet.univ-littoral.fr/"
              description="Basket, natation, badminton, musculation et bien plus encore ! Inscris-toi via le SUAPS et profite des infrastructures sportives."
            />
          </div>
  
          {/* Vie culturelle */}
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-secondary font-medium text-[25px] text-left py-2 border-b-2 mb-4">Vie culturelle</h2>
            <p className="text-gray-700 text-md font-medium text-justify mb-4">
              La culture fait partie intégrante de la vie étudiante à l'ULCO. Concerts, spectacles, ateliers créatifs, tout est organisé pour t’épanouir au-delà des cours. Le <span className="text-red-400">bar étudiant</span> et les <span className="text-red-400">Maisons de l'Étudiant (MDE)</span> sont parfaits pour se détendre et rencontrer d'autres étudiants.
            </p>
            <p className="text-gray-700 text-md font-medium text-justify mb-4">
              Le <span className="text-red-400">Service Commun de la Culture (SCC)</span> coordonne toutes les activités culturelles sur le campus pour enrichir ton parcours étudiant.
            </p>
          </div>
  
          {/* Les associations étudiantes */}
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-secondary font-medium text-[25px] text-left py-2 border-b-2 mb-4">Les associations étudiantes</h2>
            <p className="text-gray-700 text-md font-medium text-justify">
              L'ULCO regorge d’associations étudiantes pour tous les goûts : sport, culture, écologie, événementiel et bien plus. Rejoindre une association, c'est une excellente opportunité de développer de nouvelles compétences et rencontrer des gens qui partagent tes passions. Toutes les infos sont disponibles à la <span className="text-red-400">Maison de l'Étudiant (MDE)</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  