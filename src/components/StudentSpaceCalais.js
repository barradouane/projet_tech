import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import HeroSection from "./HeroSection"
import Events from "./Events"
import News from "./News"
import AllEvents from "./AllEvents"
import heroImage1 from "../assets/images/hero1.jpg"
import heroImage2 from "../assets/images/hero.jpg"
import Footer from "./Footer"

function StudentSpaceCalais() {
  const site = "Calais" // Définir le site pour cette page
  const location = useLocation()

  console.log("Current path:", location.pathname) // Pour déboguer

  return (
    <Routes>
      {/* Route principale pour l'espace étudiant de Calais */}
      <Route
        path="/"
        element={
          <>
            <Navbar city={site}/>
            <HeroSection
              videoUrl="https://www.youtube.com/embed/cnHqA-TT4D0"
              heroImage={heroImage1}
              heroImage2={heroImage2}
            />
            <News site={site} />
            <Events site={site} />
            <Footer site={site}/>
          </>
        }
      />

      {/* Route pour tous les événements de Calais */}
      <Route path="all-events" element={<AllEvents siteProp={site} />} />
    </Routes>
  )
}

export default StudentSpaceCalais

