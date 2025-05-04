import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { useLocation } from "react-router-dom";

const extractSiteFromUrl = (pathname) => {
  if (pathname.includes("student-space-")) {
    const sitePart = pathname.split("student-space-")[1];

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

  const [contactsNiveau, setContactsNiveau] = useState([]);
  const [contactsService, setContactsService] = useState({});
  const [niveauOuvert, setNiveauOuvert] = useState(""); // Nouveau
  const [serviceOuvert, setServiceOuvert] = useState(""); // Nouveau, un seul service ouvert à la fois
  const [currentSite, setCurrentSite] = useState("");
  const location = useLocation();

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

    setCurrentSite("Calais");
  }, [location.pathname]);

  const fetchContactsService = async (service) => {
    if (!currentSite) return;

    try {
      const response = await fetch(
        `https://projetportailetudiant.eilco-ulco.fr/backend/get_contacts.php?service=${service}&site=${currentSite}`
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
        `https://projetportailetudiant.eilco-ulco.fr/backend/get_contacts.php?${type}=${value}&site=${currentSite}`
      );
      const data = await response.json();
      setContactsNiveau(data.contacts || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des contacts:", error);
    }
  };

  const handleNiveauClick = (niveau) => {
    if (niveauOuvert === niveau) {
      setNiveauOuvert("");
      setContactsNiveau([]);
    } else {
      setNiveauOuvert(niveau);
      fetchContacts("niveau", niveau);
    }
  };

  const handleServiceClick = (service) => {
    if (serviceOuvert === service) {
      setServiceOuvert(""); // Fermer le service si déjà ouvert
    } else {
      setServiceOuvert(service); // Ouvrir le nouveau service
    }

    if (!contactsService[service]) {
      fetchContactsService(service);
    }
  };

  const renderContact = (contact, index) => (
    <li key={index} className="my-2">
      <p>
        <strong>
          {contact.nom} {contact.prenom}
        </strong>
      </p>
      {contact.titre && (
        <p className="text-primary italic">{contact.titre}</p>
      )}
      {contact.email && (
        <p>
          <a
            href={`mailto:${contact.email}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {contact.email}
          </a>
        </p>
      )}
      {contact.telephone && <p>{contact.telephone}</p>}
    </li>
  );
  

  return (
    <div className="flex flex-col items-center bg-gradient-to-tl from-light to-white pt-36 min-h-screen pb-20">
      <Navbar city={currentSite} />
      <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-4 mb-0">
        Contacts pédagogiques {currentSite && `- ${currentSite}`}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:w-[90%] w-[85%] mt-10">
        {/* Services Pédagogiques */}
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
                {serviceOuvert === service ? (
                  <SlArrowDown className="mx-2 text-[18px] font-bold text-secondary" />
                ) : (
                  <SlArrowRight className="mx-2 text-[18px] font-bold text-secondary" />
                )}
                <h3 className="text-[22px] font-semibold text-secondary text-left">
                  {service}
                </h3>
              </div>

              {serviceOuvert === service && (
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

        {/* Niveaux de Formation */}
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
                {niveauOuvert === niveau ? (
                  <SlArrowDown className="mx-2 text-[18px] font-bold text-secondary" />
                ) : (
                  <SlArrowRight className="mx-2 text-[18px] font-bold text-secondary" />
                )}
                <h3 className="text-[22px] font-semibold text-secondary text-left">
                  {niveau}
                </h3>
              </div>

              {niveauOuvert === niveau && (
                <div className="mt-2 ml-6">
                  {contactsNiveau.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {contactsNiveau.map((contact, index) =>
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
