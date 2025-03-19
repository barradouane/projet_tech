import Navbar from './Navbar';
import { SlArrowRight } from "react-icons/sl";

export default function Contacts() {
    const liste_des_services = [
        { nom: "Communication" },
        { nom: "Service formation" },
        { nom: "Service informatique" },
        { nom: "Service relations entreprises" },
        { nom: "Service internationales" },
        { nom: "Vie associative" },
    ];

    const niveaux_de_formation = ["CP1", "CP2", "ING1", "ING2","ING3"];

    return (
        <div className="flex flex-col items-center bg-gradient-to-tl from-light to-white pt-36 min-h-screen pb-20">
            <Navbar />
            <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-6 mb-0">
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
                        <div key={index} className="flex items-center my-4">
                            <SlArrowRight className="mx-2 text-[18px] font-bold text-secondary" />
                            <h3 className="text-[22px] font-semibold text-secondary text-left">
                                {service.nom}
                            </h3>
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
                        <div key={index} className="flex items-center my-4">
                            <SlArrowRight className="mx-2 text-[18px] font-bold text-secondary" />
                            <h3 className="text-[22px] font-semibold text-secondary text-left">
                                {niveau}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
