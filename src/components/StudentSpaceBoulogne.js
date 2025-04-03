import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Events from "./Events";
import News from "./News";
import Footer from "./Footer";
import heroImage1 from "../assets/images/boulogne1.jpg"

function StudentSpaceBoulogne(){
    const site = "Boulogne" 
    return(
        <>
        <Navbar city={site}/>
        <HeroSection
      videoUrl="https://www.youtube.com/embed/Fl8VjLg8Qso"
      heroImage={heroImage1}
      
    />
        
        <News site={site} />
       <Events site={site} />
        <Footer />
        </>
    ); 
}

export default StudentSpaceBoulogne;