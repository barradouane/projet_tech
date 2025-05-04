import Application from "./Application";
import Navbar from "./Navbar";
import moneyImage from "../assets/images/money-pic.png"

export default function FinancerSesEtudes() {
    return (
      <div className="flex flex-col items-center pt-36 min-h-screen pb-20 bg-white">
        <Navbar />
          
        <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-6 mb-4 mt-0 text-center">
          Financer ses études
        </h1>
    
        <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-10 gap-8 sm:mx-16 mx-6">
          {/* Vie sportive */}
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 ">
            <h2 className="text-secondary font-medium text-[25px] text-left py-2 border-b-2 mb-4">Les aides financières du CROUS</h2>
            <Application
              titre="CROUS"
              lien="https://messervices.etudiant.gouv.fr/"
              description=" la demande de bourse se fait en avance ! Formule ta demande entre le 15 janvier et le 15 mai précédant ta rentrée universitaire"
            />
            <p className="text-gray-700 text-md font-medium text-justify mb-4">Le CROUS propose aussi des aides financières d’urgence, à demander auprès des assistantes sociales de l’ULCO quand tu en as besoin :</p>
            <p className="text-gray-700 text-md font-medium text-justify mb-4">Voici leur numéro unique : 03 28 23 68 60</p>
          </div>
    
          {/* Vie culturelle */}
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-secondary font-medium text-[25px] text-left py-2 border-b-2 mb-4">Les Emplois Etudiants à l’ULCO</h2>
            <p className="text-gray-700 text-md font-medium text-justify mb-4">
              La culture fait partie intégrante de la vie étudiante à l'ULCO. Concerts, spectacles, ateliers créatifs, tout est organisé pour t’épanouir au-delà des cours. Le <span className="text-red-400">bar étudiant</span> et les <span className="text-red-400">Maisons de l'Étudiant (MDE)</span> sont parfaits pour se détendre et rencontrer d'autres étudiants.
            </p>
            <Application
              titre="Emplois"
              lien="https://recrutements-etudiants.extranet.univ-littoral.fr/offres"
              description="Tu peux rejoindre l’équipe de ta MDE, servir au bar de l’Entrepôt, être technicien de salle, tuteur pédagogique…"
            />
          </div>
    
          {/* Les associations étudiantes */}
          <div className="relative">
            <img
              alt="money1"
              src={moneyImage}
              className="absolute w-full h-full object-cover"
            />
            
          </div>
        </div>
      </div>
    );
  }
  