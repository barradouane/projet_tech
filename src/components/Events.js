import EventsData from "./EventsData";
import newsImage1 from "../assets/images/news1.jpg"
import newsImage2 from "../assets/images/news2.jpg"
import newsImage3 from "../assets/images/news3.jpg"

export default function Events(){

        const eventItems = [
                {
                    image: newsImage1,
                    heading: "Conférence sur l'IA",
                    text: "Assistez à une conférence passionnante sur les dernières avancées de l'Intelligence Artificielle.",
                    date: "2025-02-25", 
                    
                },
                {
                    image: newsImage2,
                    heading: "Atelier de Robotique",
                    text: "Participez à un atelier pratique de robotique avec des experts du domaine.",
                    date: "2025-03-10",
                    
                },
                {
                    image: newsImage3,
                    heading: "Célébration des Réalisations Étudiantes",
                    text: "Rejoignez-nous pour fêter les réalisations exceptionnelles de nos étudiants cette année.",
                    date: "2025-04-05",
                    
                },
            ];
            


    return(
        <div className=" sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
            <h2 className="mt-10 sm:mb-0 mb-8 mx-0 sm:text-5xl text-3xl text-center text-secondary font-medium ">Evénements à venir</h2>

           <div className="flex sm:flex-row flex-col">
           {eventItems.map((events, index) => (
                    <EventsData
                        key={index}
                        image={events.image}
                        heading={events.heading}
                        text={events.text}
                        date={events.date}
                    />
                ))}
           </div>
        </div>
    ); 
}