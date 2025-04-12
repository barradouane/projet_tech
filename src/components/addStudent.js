import { useState } from "react";
import logoImage from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom"
import { Link, Navigate } from "react-router-dom";
import { FaSignOutAlt , FaHome , FaBars, FaTimes} from "react-icons/fa";

const AddStudent = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [site, setSite] = useState(""); // Champ site
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }


  const handleAccueil = () => {
    
    navigate('/admin-space'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://projetportailetudiant.eilco-ulco.fr/backend/add_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, email, password, site }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Étudiant ajouté avec succès !");
        setNom("");
        setPrenom("");
        setEmail("");
        setPassword("");
        setSite("");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Erreur lors de l'ajout de l'étudiant.");
    } finally {
      setLoading(false);
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
      <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[85%] p-6 bg-white shadow-lg rounded-[20px] mt-[170px] mb-[50px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            type="password"
            placeholder="Mot de passe"
            required
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Champ de sélection du site */}
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
            className="w-full h-[45px] bg-secondary border-none outline-none rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-light font-bold"
            disabled={loading}
          >
            {loading ? "Ajout en cours..." : "Ajouter"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
