import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Events from "./Events";
import News from "./News";
import Footer from "./Footer";
import heroImage1 from "../assets/images/saintomer1.jpg"; 
import heroImage2 from "../assets/images/saintomer2.jpg"

function StudentSpaceSaintOmer(){
  const site = "Saint-Omer"
    return(
        <>
        <Navbar city={site}/>
        <HeroSection
      videoUrl="https://www.youtube.com/embed/P2y3Q3j2WhQ"
      heroImage={heroImage1}
      heroImage2={heroImage2}
      
    />
       
       <News site={site} />
       <Events site={site} />
        <Footer site={site}/>
        </>
    ); 
}

export default StudentSpaceSaintOmer;