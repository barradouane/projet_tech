import Navbar from "./Navbar";
import foodImage from "../assets/images/foodService.jpeg";
export default function RestaurationDunkerque(){
    return(
        <div className="flex flex-col items-center pt-36 min-h-screen pb-20">
            <Navbar />
            <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-2 mb-0 sm:mt-3 mt-0">
                Restauration à l'EILCO - Dunkerque
            </h1>
            <p className="text-1xl font-medium sm:mx-24 mx-5 my-5 text-justify">
            Les repas sont gérés par le Crous, celui-là même qui s'occupe des bourses et des logements étudiants. Pour un prix abordable, tu peux choisir un repas composé d'un plat principal et de trois éléments à ta convenance, et régler avec ta carte Izly.

Si tu préfères profiter de ton propre repas maison, rendez-vous à la Maison des Étudiants (MDE) de ton campus, où des micro-ondes sont disponibles pour réchauffer ton déjeuner.

Tu trouveras ci-dessous les adresses et horaires des Restaurants Universitaires ainsi que des MDE.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:w-[80%] w-[90%] mt-6">
        
        <div className="relative">
          <img
            alt="Repas à l'EILCO"
            src={foodImage}
            className="w-full h-56 object-cover rounded-[12px] shadow-md transition-all duration-300 hover:scale-105"
          />
        </div>
            
           
           
            <div className="h-56 bg-light text-secondary border-[0.6px] border-light py-2 px-8 rounded-[16px] shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl]">
                <ul className="text-[18px]">    
                    <li className="font-bold text-2xl text-secondary my-2 text-center">RU DUNKERQUE</li>
                    <li>1, place des Nations</li>
                    <li>03 74 09 12 81</li>
                    <li>Ouvert de 11h30 à 13h30</li>
                    <li>Cafétéria à la MDE</li>
                    <li>MDE l’Entrepôt</li>
                    <li>10h30 – 16h30</li>
                </ul>
            </div>
            </div>
        </div>
    )
}