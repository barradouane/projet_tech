import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import logoImage from "../assets/images/logo.png";
import { FaSignOutAlt  , FaHome} from "react-icons/fa";

export default function AddContact() {
    const [nom, setNom] = useState("");
    const navigate = useNavigate(); 
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [titre, setTitre] = useState(""); // Nouveau champ titre
    const [service, setService] = useState("");
    const [niveauDeFormation, setNiveauDeFormation] = useState("");
    const [site, setSite] = useState(""); // State for site selection
   

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the data object
        const data = {
            nom,
            prenom,
            email,
            telephone,
            titre, // Ajout du champ titre
            service: service || null, // Peut être null
            niveau_de_formation: niveauDeFormation || null, // Peut être null
            site,
        };

        try {
            const response = await fetch("http://localhost/projet_tech-WorkingVersion/src/backend/add_contacts.php", {
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


    const handleAccueil = () => {
    
        navigate('/editor-space'); 
      };
    // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/projet_tech-WorkingVersion/src/backend/logout.php", {
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


    return (
        <div className="h-auto flex items-center justify-center bg-white">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-2 shadow-lg w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 bg-white text-secondary backdrop-blur-lg border border-white/20">
        {/* Logo */}
        <img src={logoImage} alt="logo" className="h-[60%] w-auto" />

  
<div className="flex flex-row">
        <div 
          className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
          onClick={handleAccueil}
        >
          <FaHome className="text-xl" />
          <span>Accueil</span>
        </div>

        {/* Bouton Se Déconnecter */}
        <div 
          className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Se déconnecter</span>
        </div>
        </div>
      </nav>
            <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[85%] p-6 bg-white shadow-lg rounded-[20px] mt-[120px] mb-[50px]">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="flex flex-col">
                        <select
                            className="border p-2 rounded"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                        >
                            <option value="">-- Choisir un service (optionnel) --</option>
                            <option value="Communication">Communication</option>
                            <option value="Service formation">Service formation</option>
                            <option value="Service informatique">Service informatique</option>
                            <option value="Service relations entreprises">Service relations entreprises</option>
                            <option value="Service internationales">Service internationales</option>
                            <option value="Vie associative">Vie associative</option>
                        </select>
                    </label>
                    <label className="flex flex-col">
                        <select
                            className="border p-2 rounded"
                            value={niveauDeFormation}
                            onChange={(e) => setNiveauDeFormation(e.target.value)}
                        >
                            <option value="">-- Choisir un niveau (optionnel) --</option>
                            <option value="CP1">CP1</option>
                            <option value="CP2">CP2</option>
                            <option value="ING1">ING1</option>
                            <option value="ING2">ING2</option>
                            <option value="ING3">ING3</option>
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
                        type="text"
                        placeholder="Titre ou description (ex: Responsable pédagogique)"
                        className="border p-2 rounded"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
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