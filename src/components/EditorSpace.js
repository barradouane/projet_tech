import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoImage from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function EditorSpace() {
  const navigate = useNavigate();

  // Gestion de la déconnexion
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen flex flex-col items-center">
      
     {/* Navbar */}
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-2 shadow-lg w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 bg-white text-secondary backdrop-blur-lg border border-white/20">
        {/* Logo */}
        <img src={logoImage} alt="logo" className="h-[60%] w-auto" />

        {/* Titre */}
        <h2 className="text-lg sm:text-xl font-medium">Espace d'édition</h2>

        {/* Bouton Se Déconnecter */}
        <div 
          className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Se déconnecter</span>
        </div>
      </nav>

 
      

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:w-[90%] w-[85%] sm:mt-48 mt-36">
        
        <div className="bg-gradient-to-bl from-primary to-secondary border-secondary border-[1px] p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-2xl font-semibold text-white text-left">
            Gestion des posts
          </h3>
          <hr />
          <motion.div
            className="bg-gray-50 hover:bg-light p-4 text-center text-secondary sm:text-[20px] text-[18px] font-medium rounded-lg shadow-md cursor-pointer "
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/posts-for-editor")}
          >
            Consulter la liste des posts
          </motion.div>
          
          <motion.div
            className="bg-gray-50 hover:bg-light text-secondary p-4 text-center sm:text-[20px] text-[18px] font-medium rounded-lg shadow-md cursor-pointer "
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/addData")}
          >
            Créer un post
          </motion.div>
          
        </div>

        <div className="bg-gradient-to-bl from-primary to-secondary border-secondary border-[1px] p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-2xl font-semibold text-white text-left">
            Gestion des contacts
          </h3>
          <hr />
          <motion.div
            className="bg-gray-50 hover:bg-light p-4 text-center text-secondary sm:text-[20px] text-[18px] font-medium rounded-lg shadow-md cursor-pointer "
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/contacts-for-editor")}
          >
            Consulter la liste des contacts
          </motion.div>
          
          <motion.div
            className="bg-gray-50 hover:bg-light text-secondary p-4 text-center sm:text-[20px] text-[18px] font-medium rounded-lg shadow-md cursor-pointer "
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/add-contact")}
          >
            Créer un contact
          </motion.div>
          
        </div>

        
        
      </div>
    </div>
  );
}
