import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

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
    const [contactsNiveau, setContactsNiveau] = useState([]);
    const [contactsService, setContactsService] = useState({});
    const [niveauSelectionne, setNiveauSelectionne] = useState("");
    const [openNiveau, setOpenNiveau] = useState({});
    const [openService, setOpenService] = useState({});

    useEffect(() => {
        if (niveauSelectionne) {
            fetchContacts("niveau", niveauSelectionne);
        }
    }, [niveauSelectionne]);

    const fetchContactsService = async (service) => {
        try {
            const response = await fetch(
                `http://localhost:8000/get_contacts.php?service=${service}`
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
        try {
            const response = await fetch(
                `http://localhost:8000/get_contacts.php?${type}=${value}`
            );
            const data = await response.json();
            setContactsNiveau(data.contacts || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des contacts:", error);
        }
    };

    const handleNiveauClick = (niveau) => {
        setOpenNiveau((prevState) => ({
            ...prevState,
            [niveau]: !prevState[niveau],
        }));
        setNiveauSelectionne(niveau);
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

    return (
        <div className="flex flex-col items-center bg-gradient-to-tl from-light to-white pt-36 min-h-screen pb-20">
            <Navbar />
            <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-4 mb-0">
                Contacts pédagogiques
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
                                            {contactsService[service].map((contact, index) => (
                                                <li key={index} className="my-2">
                                                    <p>
                                                        <strong>
                                                            {contact.nom} {contact.prenom}
                                                        </strong>
                                                    </p>
                                                    <p>{contact.email}</p>
                                                    <p>{contact.telephone}</p>
                                                </li>
                                            ))}
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
                                {openNiveau[niveau] ? (
                                    <SlArrowDown className="mx-2 text-[18px] font-bold text-secondary" />
                                ) : (
                                    <SlArrowRight className="mx-2 text-[18px] font-bold text-secondary" />
                                )}
                                <h3 className="text-[22px] font-semibold text-secondary text-left">
                                    {niveau}
                                </h3>
                            </div>

                            {/* Affichage des contacts sous le niveau */}
                            {openNiveau[niveau] && (
                                <div className="mt-2 ml-6">
                                    {contactsNiveau.length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {contactsNiveau.map((contact, index) => (
                                                <li key={index} className="my-2">
                                                    <p>
                                                        <strong>
                                                            {contact.nom} {contact.prenom}
                                                        </strong>
                                                    </p>
                                                    <p>{contact.email}</p>
                                                    <p>{contact.telephone}</p>
                                                    <p>
                                                        <strong>Service:</strong> {contact.service}
                                                    </p>
                                                </li>
                                            ))}
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
