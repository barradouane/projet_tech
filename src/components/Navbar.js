"use client"

import { useState, useCallback, memo, useEffect } from "react"
import logoImage from "../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"
import { FaSignOutAlt, FaBars, FaTimes, FaHome, FaBriefcase, FaAddressBook } from "react-icons/fa"

// Fonction pour formater le nom du site pour l'URL
const formatSiteForUrl = (site) => {
  if (!site) return "";
  // Convertir en minuscules et supprimer les tirets
  return site.toLowerCase().replace(/-/g, "");
};

// Fonction pour extraire le site de l'URL actuelle
const extractSiteFromUrl = (pathname) => {
  // Vérifie si l'URL contient "student-space-"
  if (pathname.includes("student-space-")) {
    const sitePart = pathname.split("student-space-")[1];
    
    // Mapping des noms de sites dans l'URL vers les noms de props
    if (sitePart === "calais") return "Calais";
    if (sitePart === "dunkerque") return "Dunkerque";
    if (sitePart === "saintomer") return "Saint-Omer";
    if (sitePart === "boulogne") return "Boulogne";
  }
  
  return null;
};


//Gestion de la déconnexion
const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:8000/logout.php", {
      method: "POST",
      credentials: "include", // Important si les sessions sont gérées avec des cookies
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.success); // Afficher le message de succès
      window.location.href = "/"; // Redirection après déconnexion
    } else {
      console.error("Erreur HTTP:", response.status);
      alert("Erreur lors de la déconnexion.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Impossible de se déconnecter.");
  }
};

// MenuItems est maintenant une fonction qui prend le site en paramètre
const getMenuItems = (site) => [
  {
    title: "Accueil",
    url: `/student-space-${formatSiteForUrl(site)}`,
    cName: "nav-links",
    icon: <FaHome />,
  },
  {
    title: "Contacts",
    url: "/contacts",
    cName: "nav-links",
    icon: <FaAddressBook />,
  },
];

const ServiceMenuItem = memo(({ href, children, isLink = false }) => {
  if (isLink) {
    return (
      <Link to={href}>
        <li className="py-4 px-4 hover:bg-light hover:text-primary hover:rounded-[10px]">{children}</li>
      </Link>
    )
  }

  return (
    <li className="py-4 px-4 hover:bg-light hover:text-primary hover:rounded-[10px]">
      <a href={href} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    </li>
  )
})

const MenuItem = memo(({ item }) => (
  <li className="w-full sm:w-auto sm:mx-auto text-secondary text-xl py-2 sm:py-0 hover:bg-secondary hover:text-light hover:rounded-[10px] transition-all duration-300 ease-in-out">
    <Link to={item.url} className={`${item.cName}sm:inline flex flex-row items-center p-4`}>
      <span className="mx-[10px] my-auto text-xl ">{item.icon}</span>
      {item.title}
    </Link>
  </li>
))

export default function Navbar({ city }) {
  const [clicked, setClicked] = useState(false)
  const [showServices, setShowServices] = useState(false)
  const [currentSite, setCurrentSite] = useState("")
  const location = useLocation()
  
  // Effet pour gérer le site actuel
  useEffect(() => {
    // 1. Essayer d'utiliser le props city s'il existe
    if (city) {
      // Sauvegarder dans localStorage pour les futures navigations
      localStorage.setItem("lastVisitedSite", city);
      setCurrentSite(city);
      return;
    }
    
    // 2. Essayer d'extraire le site de l'URL actuelle
    const siteFromUrl = extractSiteFromUrl(location.pathname);
    if (siteFromUrl) {
      localStorage.setItem("lastVisitedSite", siteFromUrl);
      setCurrentSite(siteFromUrl);
      return;
    }
    
    // 3. Utiliser le dernier site visité depuis localStorage
    const lastSite = localStorage.getItem("lastVisitedSite");
    if (lastSite) {
      setCurrentSite(lastSite);
      return;
    }
    
    // 4. Fallback sur un site par défaut si rien d'autre n'est disponible
    setCurrentSite("Calais"); // Site par défaut
  }, [city, location.pathname]);
  
  // Générer les items de menu avec le site actuel
  const menuItems = getMenuItems(currentSite);

  const handleClick = useCallback(() => {
    setClicked((prev) => !prev)
  }, [])

  const toggleServices = useCallback(() => {
    setShowServices((prev) => !prev)
  }, [])

  // Générer la route pour la restauration en fonction de la ville
  const getFoodServiceLink = () => {
    switch (currentSite) {
      case "Calais":
        return "/food-service-calais"
      case "Dunkerque":
        return "/food-service-dunkerque"
      case "Saint-Omer":
        return "/food-service-saintomer"
      case "Boulogne":
        return "/food-service-boulogne"
      default:
        return "/food-service"
    }
  }

  const servicesMenu = showServices && (
    <ul className="rounded-[10px] absolute left-0 sm:left-auto sm:right-0 top-full bg-secondary text-light mt-0 w-full sm:w-[200px] sm:max-h-[450px] max-h-[300px] overflow-y-auto">
      <ServiceMenuItem href="https://edt.univ-littoral.fr/direct/index.jsp?data=6b052c86649c89d6314052e0c2e2410df63f1816a4b0a6ae41893446ff37497ec55ef35a53135e002df1531698f94af0a3ec2aaf9a1c38d06b44c36d8361b35011a10a238b0a823699328a9323a95a07c004deba0e9910a95c5e72a718a33d6e">
        Emploi du temps
      </ServiceMenuItem>
      <ServiceMenuItem href="https://portail.eilco.fr:28/">Moodle</ServiceMenuItem>
      <ServiceMenuItem href="//cloudeilco.univ-littoral.fr/">NextCloud</ServiceMenuItem>
      <ServiceMenuItem href="https://webmail.univ-littoral.fr/">Zimbra</ServiceMenuItem>
      <ServiceMenuItem href="https://www.absence.eilco-ulco.fr/">Demande d'autorisation d'absence</ServiceMenuItem>
      <ServiceMenuItem href="/stage-service" isLink={true}>
        Stages et alternances
      </ServiceMenuItem>
      <ServiceMenuItem href="https://www.bulco.univ-littoral.fr/">Bibliothèque de l'ULCO</ServiceMenuItem>
      <ServiceMenuItem href="/vie-etudiante-service" isLink={true}>
        Vie étudiante
      </ServiceMenuItem>
      {/* Changer le lien en fonction de la ville */}
      <ServiceMenuItem href={getFoodServiceLink()} isLink={true}>
        Restauration
      </ServiceMenuItem>
      <ServiceMenuItem href="/sante-service" isLink={true}>
        Santé et social
      </ServiceMenuItem>
      <ServiceMenuItem href="/financement-service" isLink={true}>
        Financement des études
      </ServiceMenuItem>
    </ul>
  )

  return (
    <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
      <img
        src={logoImage || "/placeholder.svg"}
        alt="logo"
        className="h-[58%] w-[25%] lg:w-[10%] sm:h-[65%] sm:w-[10%]"
      />

      <div onClick={handleClick} className="sm:hidden">
        {clicked ? (
          <FaTimes className="text-lg text-primary cursor-pointer" />
        ) : (
          <FaBars className="text-lg text-primary cursor-pointer" />
        )}
      </div>

      <ul
        className={`sm:mt-0 mt-2 sm:flex sm:items-center sm:static sm:w-auto sm:opacity-100 sm:flex-row 
        ${clicked ? "flex flex-col bg-light items-center flex-start-0 absolute top-[80px] left-0 w-full opacity-100 rounded-[13px] sm:shadow-none shadow-[0_5px_15px_rgba(0,0,0,0.25)] z-[9999]" : "hidden"}`}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}

        {/* Menu services */}
        <li
          className="w-full sm:w-auto text-secondary text-xl py-2 sm:py-0 hover:bg-secondary hover:text-light hover:rounded-[10px] transition-all duration-300 ease-in-out relative"
          onClick={toggleServices}
        >
          <div className="flex flex-row items-center cursor-pointer p-4">
            <span className="mx-[10px] my-auto text-xl">
              <FaBriefcase />
            </span>
            Services
          </div>
          {servicesMenu}
        </li>

        {/* Se déconnecter - avec style corrigé */}
        <li
          className="w-full sm:w-auto text-secondary text-xl py-2 sm:py-0 hover:bg-secondary hover:text-light hover:rounded-[10px] transition-all duration-300 ease-in-out cursor-pointer"
          onClick={handleLogout}
        >
          <div className="flex flex-row items-center p-4">
            <span className="mx-[10px] my-auto text-xl">
              <FaSignOutAlt />
            </span>
            Se déconnecter
          </div>
        </li>
      </ul>
    </nav>
  )
}