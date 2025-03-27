import Application from "./Application";
import Navbar from "./Navbar";

export default function Sport(){
    return(
        <div className="flex flex-col items-center pt-36 min-h-screen pb-20">
            <Navbar />
            
            <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-2 mb-0 sm:mt-3 mt-0">
                Vie sportive à l'EILCO
            </h1>

            
            <p className="text-1xl font-medium  sm:mx-24 mx-5 my-5 text-justify">
            Le campus, ce n’est pas que les études ! C'est aussi un lieu pour se défouler, se dépasser et partager des moments forts à travers le sport. Que ce soit en rejoignant une équipe, en testant de nouvelles disciplines ou simplement en profitant des infrastructures sportives, il y a mille façons de bouger ! Reste à l’affût des événements sportifs, des tournois et des séances d’initiation. C'est l'occasion parfaite pour allier bien-être, esprit d'équipe et fun tout au long de l'année !
            </p>
            
            <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-0 sm:mx-16 mx-6">
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

                
        </div>
    )
}