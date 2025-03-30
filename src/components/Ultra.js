import NavbarForAdmin from "./NavbarForAdmin";
import HeroSection from "./HeroSection";
import Events from "./Events";
import News from "./News";
import Footer from "./Footer";

function StudentSpace(){
    return(
        <>
        <NavbarForAdmin/>
        <HeroSection />
        <News />
        <Events />
     

        <Footer />
        </>
    ); 
}

export default StudentSpace;