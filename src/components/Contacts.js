import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { useLocation } from "react-router-dom";

// Fonction pour extraire le site de l'URL (identique à celle du Navbar)
const extractSiteFromUrl = (pathname) => {
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

export default function Contacts() {
    const liste_des_services = [
        "Communication",
        "Service formation",
        "Service informatique",
        "Service relations entreprises",
        "Service internationales",
        "Vie associative",
    ];

    const niveaux_de_formation = ["CP1", "CP2", "ING1", "ING2", "ING3"];

    // États
    // Remplacé par un objet qui stocke les contacts pour chaque niveau
    const [contactsNiveaux, setContactsNiveaux] = useState({});
    const [contactsService, setContactsService] = useState({});
    const [openNiveau, setOpenNiveau] = useState({});
    const [openService, setOpenService] = useState({});
    const [currentSite, setCurrentSite] = useState("");
    const location = useLocation();

    // Déterminer le site actuel (similaire à celui du Navbar)
    useEffect(() => {
        const siteFromUrl = extractSiteFromUrl(location.pathname);
        if (siteFromUrl) {
            localStorage.setItem("lastVisitedSite", siteFromUrl);
            setCurrentSite(siteFromUrl);
            return;
        }

        const lastSite = localStorage.getItem("lastVisitedSite");
        if (lastSite) {
            setCurrentSite(lastSite);
            return;
        }

        // Fallback sur un site par défaut
        setCurrentSite("Calais");
    }, [location.pathname]);

    const fetchContactsService = async (service) => {
        if (!currentSite) return;
        
        try {
            const response = await fetch(
                `http://localhost/projet_tech-WorkingVersion/src/backend/get_contacts.php?service=${service}&site=${currentSite}`
            );
            const data = await response.json();

            setContactsService((prevContacts) => ({
                ...prevContacts,
                [service]: data.contacts || [],
            }));
        } catch (error) {
            console.error("Erreur lors de la récupération des contacts:", error);
        }
    };

    const fetchContacts = async (type, value) => {
        if (!currentSite) return;
        
        try {
            const response = await fetch(
                `http://localhost/projet_tech-WorkingVersion/src/backend/get_contacts.php?${type}=${value}&site=${currentSite}`
            );
            const data = await response.json();
            // Stocker les contacts du niveau sous la clé correspondante
            setContactsNiveaux((prevContacts) => ({
                ...prevContacts,
                [value]: data.contacts || [],
            }));
        } catch (error) {
            console.error("Erreur lors de la récupération des contacts:", error);
        }
    };

    const handleNiveauClick = (niveau) => {
        const isOpen = !!openNiveau[niveau];
        setOpenNiveau((prevState) => ({
            ...prevState,
            [niveau]: !isOpen,
        }));
        // Si l'utilisateur ouvre la section et que les contacts n'ont pas déjà été chargés, on les récupère
        if (!isOpen && !contactsNiveaux[niveau]) {
            fetchContacts("niveau", niveau);
        }
    };

    const handleServiceClick = (service) => {
        setOpenService((prevState) => ({
            ...prevState,
            [service]: !prevState[service],
        }));

        if (!contactsService[service]) {
            fetchContactsService(service);
        }
    };

    // Fonction pour afficher un contact en gérant les valeurs nulles
    const renderContact = (contact, index, showService = false) => (
        <li key={index} className="my-2">
            <p>
                <strong>
                    {contact.nom} {contact.prenom}
                </strong>
            </p>
            {contact.titre && <p className="text-primary italic">{contact.titre}</p>}
            <p>{contact.email}</p>
            <p>{contact.telephone}</p>
        </li>
    );

    return (
        <div className="flex flex-col items-center bg-gradient-to-tl from-light to-white pt-36 min-h-screen pb-20">
            <Navbar city={currentSite} />
            <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-4 mb-0">
                Contacts pédagogiques {currentSite && `- ${currentSite}`}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:w-[90%] w-[85%] mt-10">
                {/* Services pédagogiques */}
                <div className="border-[0.6px] border-light p-8 rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
                    <h2 className="text-2xl font-semibold text-primary text-left mb-2">
                        Services pédagogiques
                    </h2>
                    <hr />
                    {liste_des_services.map((service, index) => (
                        <div key={index} className="my-4">
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => handleServiceClick(service)}
                            >
                                {openService[service] ? (
                                    <SlArrowDown className="mx-2 text-[18px] font-bold text-secondary" />
                                ) : (
                                    <SlArrowRight className="mx-2 text-[18px] font-bold text-secondary" />
                                )}
                                <h3 className="text-[22px] font-semibold text-secondary text-left">
                                    {service}
                                </h3>
                            </div>

                            {/* Affichage des contacts sous le service */}
                            {openService[service] && (
                                <div className="mt-2 ml-6">
                                    {contactsService[service]?.length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {contactsService[service].map((contact, index) => 
                                                renderContact(contact, index)
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-secondary text-sm italic">
                                            Y'a aucun contact dans ce service.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Niveaux de formation */}
                <div className="sm:mb-0 mb-20 border-[0.6px] border-light p-8 rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
                    <h2 className="text-2xl font-semibold text-primary text-left mb-2">
                        Niveaux de formation
                    </h2>
                    <hr className="bg-secondary" />
                    {niveaux_de_formation.map((niveau, index) => (
                        <div key={index} className="my-4">
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => handleNiveauClick(niveau)}
                            >
                                {openNiveau[niveau] ? (
                                    <SlArrowDown className="mx-2 text-[18px] font-bold text-secondary" />
                                ) : (
                                    <SlArrowRight className="mx-2 text-[18px] font-bold text-secondary" />
                                )}
                                <h3 className="text-[22px] font-semibold text-secondary text-left">
                                    {niveau}
                                </h3>
                            </div>

                            {/* Affichage des contacts pour le niveau */}
                            {openNiveau[niveau] && (
                                <div className="mt-2 ml-6">
                                    {contactsNiveaux[niveau] && contactsNiveaux[niveau].length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {contactsNiveaux[niveau].map((contact, index) => 
                                                renderContact(contact, index)
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-secondary text-sm italic">
                                            Y'a aucun contact dans ce niveau de formation.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
