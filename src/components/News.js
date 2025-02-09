import NewsData from "./NewsData";
import newsImage1 from "../assets/images/news1.jpg"
import newsImage2 from "../assets/images/news2.jpg"
import newsImage3 from "../assets/images/news3.jpg"

export default function News(){

    const newsItems = [
        {
            image: newsImage1,
            heading: "Nouveau Laboratoire Ouvert",
            text: "Notre école a ouvert un nouveau laboratoire à la pointe de la technologie pour améliorer les opportunités de recherche.",
        },
        {
            image: newsImage2,
            heading: "Atelier sur l'IA",
            text: "Rejoignez-nous pour un atelier passionnant sur l'Intelligence Artificielle le 25 février !",
        },
        {
            image: newsImage3,
            heading: "Réussite Étudiante",
            text: "Félicitations à nos étudiants pour avoir remporté la compétition nationale de robotique !",
        },
    ];
    


    return(
        <div className=" sm:m-[4rem_6rem] m-0 text-[#2a2a2a]">
            <h2 className="mx-0 sm:text-5xl text-3xl text-center text-secondary font-medium ">Actualités de l'école</h2>

           <div className="flex sm:flex-row flex-col">
           {newsItems.map((news, index) => (
                    <NewsData
                        key={index}
                        image={news.image}
                        heading={news.heading}
                        text={news.text}
                    />
                ))}
           </div>
        </div>
    ); 
}