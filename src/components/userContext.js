"use client"

// Si vous n'avez pas encore de fichier userContext.jsx, voici un exemple
import { createContext, useState, useContext, useEffect } from "react"

// Créer le contexte
const UserContext = createContext()

// Hook personnalisé pour utiliser le contexte
export const useUser = () => useContext(UserContext)

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialiser l'état avec les données de localStorage si disponibles
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        return {
          firstName: parsedUser.prenom || "",
          lastName: parsedUser.nom || "",
          site: parsedUser.site || "",
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error)
        return null
      }
    }
    return null
  })

  // Mettre à jour localStorage quand le contexte utilisateur change
  useEffect(() => {
    if (user) {
      const userData = {
        prenom: user.firstName || "",
        nom: user.lastName || "",
        site: user.site || "",
      }
      localStorage.setItem("user", JSON.stringify(userData))
    }
  }, [user])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

