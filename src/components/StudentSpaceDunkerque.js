import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Events from "./Events";
import News from "./News";
import Footer from "./Footer";
import heroImage1 from "../assets/images/dunkerque1.jpg"
import heroImage2 from "../assets/images/dunkerque2.png"

function StudentSpaceDunkerque(){
    const site = "Dunkerque"
    return(
        <>
        <Navbar city={site}/>
        <HeroSection
      videoUrl="https://www.youtube.com/embed/yxMlXhVTsLE"
      heroImage={heroImage1}
      heroImage2={heroImage2}
      
    />
        
        <News site={site} />
        <Events site={site} />
        <Footer />
        </>
    ); 
}

export default StudentSpaceDunkerque;