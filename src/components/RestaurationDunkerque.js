import Navbar from "./Navbar";
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:w-[90%] w-[85%] mt-6">
            
           
           
            <div className="bg-light border-[0.6px] border-light p-8 rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
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