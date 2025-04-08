"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import logoImage from "../assets/images/logo.png"
import { FaSignOutAlt, FaUsers, FaUserPlus, FaFileExcel } from "react-icons/fa"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [importStatus, setImportStatus] = useState(null)

  const handleImportExcel = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = ".xls,.xlsx"

    fileInput.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return

      setIsLoading(true)
      setImportStatus(null)
      const formData = new FormData()
      formData.append("excelFile", file)

      try {
        const response = await fetch("http://localhost:8000/import_users.php", {
          method: "POST",
          body: formData,
          // Don't set Content-Type header when using FormData
          // The browser will set it automatically with the correct boundary
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.success) {
          setImportStatus({
            type: "success",
            message: result.success
          })
          
          if (result.errors && result.errors.length > 0) {
            console.log("Erreurs:", result.errors)
            setImportStatus({
              type: "warning",
              message: `${result.success} Cependant, ${result.errors.length} erreur(s) sont survenues.`,
              details: result.errors
            })
          }
        } else if (result.error) {
          setImportStatus({
            type: "error",
            message: result.error
          })
        }
      } catch (error) {
        console.error("Erreur:", error)
        setImportStatus({
          type: "error",
          message: error.message || "Une erreur s'est produite lors de l'importation."
        })
      } finally {
        setIsLoading(false)
      }
    }

    fileInput.click()
  }

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (response.ok) {
        const result = await response.json()
        alert(result.success)
        window.location.href = "/"
      } else {
        console.error("Erreur HTTP:", response.status)
        alert("Erreur lors de la déconnexion.")
      }
    } catch (error) {
      console.error("Erreur:", error)
      alert("Impossible de se déconnecter.")
    }
  }

  return (
    <div className="h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-2 shadow-lg w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 bg-white text-secondary backdrop-blur-lg border border-white/20">
        {/* Logo */}
        <img src={logoImage || "/placeholder.svg"} alt="logo" className="h-[60%] w-auto" />

        {/* Titre */}
        <h2 className="text-lg sm:text-xl font-medium">Espace administratif</h2>

        {/* Bouton Se Déconnecter */}
        <div
          className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Se déconnecter</span>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:w-[90%] w-[85%] sm:mt-48 mt-52">
        <div className="bg-gradient-to-bl from-primary to-secondary p-8 rounded-2xl shadow-xl space-y-6 text-white">
          <h3 className="text-2xl font-semibold">Gestion des étudiants</h3>
          <hr />
          <motion.div
            className="bg-gray-50 text-center text-secondary font-medium p-4 sm:text-lg text-base rounded-lg shadow-md cursor-pointer hover:bg-light"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/students-for-admin")}
          >
            <FaUsers className="inline-block mr-2" />
            Consulter la liste des étudiants
          </motion.div>
          <motion.div
            className="bg-gray-50 text-secondary p-4 text-center font-medium sm:text-lg text-base rounded-lg shadow-md cursor-pointer hover:bg-light"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/add-student")}
          >
            <FaUserPlus className="inline-block mr-2" />
            Ajouter un étudiant
          </motion.div>

          <motion.div
            className="bg-gray-50 text-secondary p-4 text-center font-medium sm:text-lg text-base rounded-lg shadow-md cursor-pointer hover:bg-light"
            whileHover={{ scale: 1.05 }}
            onClick={handleImportExcel}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            <FaFileExcel className="inline-block mr-2" />
            {isLoading ? "Importation en cours..." : "Importer des étudiants via un fichier excel"}
          </motion.div>
          
          
        </div>
        <div className="bg-gradient-to-bl from-primary to-secondary p-8 rounded-2xl shadow-xl space-y-6 text-white">
          <h3 className="text-2xl font-semibold">Gestion des éditeurs</h3>
          <hr />
          <motion.div
            className="bg-gray-50 text-center text-secondary font-medium p-4 sm:text-lg text-base rounded-lg shadow-md cursor-pointer hover:bg-light"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/students-for-admin")}
          >
            <FaUsers className="inline-block mr-2" />
            Consulter la liste des éditeurs
          </motion.div>
          <motion.div
            className="bg-gray-50 text-secondary p-4 text-center font-medium sm:text-lg text-base rounded-lg shadow-md cursor-pointer hover:bg-light"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/add-student")}
          >
            <FaUserPlus className="inline-block mr-2" />
            Ajouter un éditeur
          </motion.div>

         
          
        </div>
      </div>
    </div>
  )
}
