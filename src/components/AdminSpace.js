import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoImage from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-0 shadow-lg w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 bg-white text-secondary backdrop-blur-lg border border-white/20">
        {/* Logo */}
        <img src={logoImage} alt="logo" className="h-[60%] w-auto" />

        {/* Titre */}
        <h2 className="text-lg sm:text-xl font-medium">Espace administratif</h2>

        {/* Bouton Se Déconnecter */}
        <Link
          to="/"
          className="flex items-center text-secondary text-lg font-medium px-4 py-2 hover:bg-secondary hover:text-white rounded-lg transition-all duration-300 ease-in-out"
        >
          <FaSignOutAlt className="mr-2" />
          Se déconnecter
        </Link>
      </nav>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 sm:w-[55%] w-[85%] sm:mt-48 mt-52">
        <div className="bg-gradient-to-bl from-primary to-secondary p-8 rounded-2xl shadow-xl space-y-6 text-white">
          <h3 className="text-2xl font-semibold">Gestion des étudiants</h3>
          <hr />
          <motion.div
            className="bg-gray-50 text-center text-secondary font-medium p-4 sm:text-lg text-base rounded-lg shadow-md cursor-pointer hover:bg-light"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/students-for-admin")}
          >
            Consulter la liste des étudiants
          </motion.div>
          <motion.div
            className="bg-gray-50 text-secondary p-4 text-center font-medium sm:text-lg text-base rounded-lg shadow-md cursor-pointer hover:bg-light"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/addStudent")}
          >
            Ajouter un étudiant
          </motion.div>
        </div>
      </div>
    </div>
  );
}
