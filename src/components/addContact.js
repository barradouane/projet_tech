import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import logoImage from "../assets/images/logo.png";

export default function AddContact() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [service, setService] = useState("");
    const [niveauDeFormation, setNiveauDeFormation] = useState("");
    const [site, setSite] = useState(""); // State for site selection
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the data object
        const data = {
            nom,
            prenom,
            email,
            telephone,
            service,
            niveau_de_formation: niveauDeFormation,
            site,
        };

        try {
            const response = await fetch("http://localhost:8000/add_contacts.php", {
                method: "POST",
                body: new URLSearchParams(data), // Convert the data object to form data
            });

            const result = await response.json();
            if (result.success) {
                alert("Contact ajouté avec succès !");
                
            } else {
                alert(`Erreur : ${result.message}`);
            }
        } catch (error) {
            alert(`Erreur lors de l'ajout du contact : ${error.message}`);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-white">
            <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
                {/* Logo */}
                <img src={logoImage} alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />
                <h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">Espace d'édition</h2>
            </nav>
            <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[85%] p-6 bg-white shadow-lg rounded-[20px] mt-24 ">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="flex flex-col">
                        <select
                            required
                            className="border p-2 rounded"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                        >
                            <option value="">-- Choisir un service --</option>
                            <option value="communication">Communication</option>
                            <option value="formation">Formation</option>
                            <option value="informatique">Informatique</option>
                            <option value="relations-entreprises">Relations entreprises</option>
                            <option value="vie-associative">Vie associative</option>
                        </select>
                    </label>
                    <label className="flex flex-col">
                        <select
                            required
                            className="border p-2 rounded"
                            value={niveauDeFormation}
                            onChange={(e) => setNiveauDeFormation(e.target.value)}
                        >
                            <option value="">-- Choisir un niveau --</option>
                            <option value="cp1">CP1</option>
                            <option value="cp2">CP2</option>
                            <option value="ing1">ING1</option>
                            <option value="ing2">ING2</option>
                            <option value="ing3">ING3</option>
                        </select>
                    </label>

                    <input
                        type="text"
                        placeholder="Nom"
                        required
                        className="border p-2 rounded"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Prénom"
                        required
                        className="border p-2 rounded"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Adresse mail"
                        required
                        className="border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Numéro de téléphone si disponible"
                        className="border p-2 rounded"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />

                    {/* Site select */}
                    <label className="flex flex-col">
                        <select
                            required
                            className="border p-2 rounded"
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                        >
                            <option value="">-- Choisir un site --</option>
                            <option value="Calais">Calais</option>
                            <option value="Boulogne">Boulogne</option>
                            <option value="Dunkerque">Dunkerque</option>
                            <option value="Saint-Omer">Saint-Omer</option>
                        </select>
                    </label>

                    <button
                        type="submit"
                        className='w-full h-[45px] bg-secondary border-none outline-none rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-light font-bold '
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
}
