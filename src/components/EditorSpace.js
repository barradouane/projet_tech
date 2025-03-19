import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoImage from "../assets/images/logo.png";

export default function EditorSpace() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen flex flex-col items-center">
      
      <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
      {/* Logo */}
      <img src={logoImage} alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />
<h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">Espace d'édition</h2>
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
