"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logoImage from "../assets/images/logo.png"
import { FaSignOutAlt , FaHome , FaBars, FaTimes} from "react-icons/fa";

export default function AddData() {
  const [type, setType] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); 
  const [plus_de_details, setPlus_de_details] = useState('');
  const [selectedSites, setSelectedSites] = useState([]); // Stocke les sites cochés
  const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const sitesList = ['Calais', 'Dunkerque', 'Boulogne', 'Saint-Omer']; // Liste des sites

  // Fonction pour gérer la sélection des sites
  const handleSiteChange = (site) => {
    setSelectedSites((prev) =>
      prev.includes(site) ? prev.filter((s) => s !== site) : [...prev, site]
    );
  };

  const handleAccueil = () => {
    
    navigate('/editor-space'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!titre || !description || !type || !image || (type === 'evenement' && !date) || !plus_de_details || selectedSites.length === 0) {
      setError('Tous les champs obligatoires doivent être remplis.');
      return;
    }

    setLoading(true); // Activer l'état de chargement
    setError(null); // Réinitialiser les erreurs

    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('titre', titre);
      formData.append('description', description);
      if (type === 'evenement') formData.append('date', date);
      formData.append('image', image);
      formData.append('plus_de_details', plus_de_details);
      
      // Ajouter chaque site individuellement pour que PHP les reçoivent correctement
      selectedSites.forEach(site => {
        formData.append('sites[]', site);
      });

      const response = await fetch('https://projetportailetudiant.eilco-ulco.fr/backend/add_data.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json(); // Attendre la réponse et convertir en JSON

      if (response.ok && result.success) {
        alert(result.message); // Afficher le message de succès
        // Réinitialisation des champs
        setTitre('');
        setDescription('');
        setDate('');
        setImage(null);
        setType('');
        setPlus_de_details('');
        setSelectedSites([]);
      } else {
        // Afficher le message d'erreur si la réponse n'est pas OK
        setError(result.message || 'Erreur lors de l\'ajout.');
      }
    } catch (error) {
      // Gérer les erreurs d'API ou de réseau
      setError('Une erreur est survenue : ' + error.message);
    } finally {
      setLoading(false); // Désactiver l'état de chargement
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch("https://projetportailetudiant.eilco-ulco.fr/backend/logout.php", {
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
        <img src={logoImage || "/placeholder.svg"} alt="logo" className="h-[60%] w-auto" />

        {/* Hamburger Menu Button (visible only on mobile) */}
        <button className="md:hidden text-secondary text-2xl focus:outline-none" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row">
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

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[80px] right-0 left-0 bg-white shadow-lg rounded-b-[13px] z-50 border border-white/20 border-t-0">
            <div
              className="flex items-center justify-center space-x-2 text-secondary text-xl py-4 px-6 cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
              onClick={handleAccueil}
            >
              <FaHome className="text-xl" />
              <span>Accueil</span>
            </div>
            <div
              className="flex items-center justify-center space-x-2 text-secondary text-xl py-4 px-6 cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-xl" />
              <span>Se déconnecter</span>
            </div>
          </div>
        )}
      </nav>

      <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[90%] p-6 bg-white shadow-lg rounded-[20px] mt-[120px] mb-[50px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-semibold my-3 text-[20px] text-secondary">Type de contenu :</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">-- Choisir un type --</option>
              <option value="actualite">Actualité</option>
              <option value="evenement">Événement</option>
            </select>
          </label>

          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            required
            className="border p-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="border p-2 rounded"
          />
          <textarea
            value={plus_de_details}
            onChange={(e) => setPlus_de_details(e.target.value)}
            placeholder="Plus de détails"
            required
            className="border p-2 rounded"
          />

          {/* Sélection des sites */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold my-3 text-[20px] text-secondary">Sélectionner les sites :</span>
            {sitesList.map((site) => (
              <label key={site} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={site}
                  checked={selectedSites.includes(site)}
                  onChange={() => handleSiteChange(site)}
                  className="h-5 w-5"
                />
                <span>{site}</span>
              </label>
            ))}
          </div>

          {/* Affichage conditionnel du champ date */}
          {type === 'evenement' && (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border p-2 rounded"
            />
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
            className="border p-2 rounded"
          />

          {/* Affichage du message d'erreur */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          {/* Bouton d'envoi */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[45px] ${loading ? 'bg-gray-400' : 'bg-secondary'} border-none outline-none rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-light font-bold`}
          >
            {loading ? 'Chargement...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );
}
