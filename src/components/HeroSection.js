"use client"

import { useState, useEffect } from "react"

export default function HeroSection({ videoUrl, heroImage, heroImage2 }) {
  const [userName, setUserName] = useState("Malki Nawal") // Valeur par défaut

  useEffect(() => {
    // Fonction pour récupérer le nom d'utilisateur de différentes sources
    const fetchUserName = async () => {
      try {
        // 1. Essayer de récupérer depuis localStorage (méthode la plus fiable)
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            if (userData.prenom || userData.nom || userData.firstName || userData.lastName) {
              const firstName = userData.prenom || userData.firstName || ""
              const lastName = userData.nom || userData.lastName || ""
              setUserName(`${firstName} ${lastName}`.trim())
              return
            }
          } catch (e) {
            console.log("Erreur de parsing localStorage:", e)
          }
        }

        // 2. Méthode alternative: créer un petit script qui stocke directement le nom dans localStorage
        // Cette méthode ne nécessite pas de modifier signin.php
        const script = document.createElement("script")
        script.innerHTML = `
          // Stocker le nom d'utilisateur dans localStorage après connexion
          if (typeof window.__storeUserName !== 'function') {
            window.__storeUserName = function(firstName, lastName) {
              localStorage.setItem('userName', JSON.stringify({firstName, lastName}));
            }
          }
        `
        document.head.appendChild(script)

        // 3. Vérifier si le nom a été stocké par le script
        const storedName = localStorage.getItem("userName")
        if (storedName) {
          try {
            const nameData = JSON.parse(storedName)
            if (nameData.firstName || nameData.lastName) {
              setUserName(`${nameData.firstName} ${nameData.lastName}`.trim())
              return
            }
          } catch (e) {
            console.log("Erreur de parsing userName:", e)
          }
        }

        // 4. Dernière tentative: essayer de récupérer depuis la session
        // Utiliser un timeout pour éviter de bloquer le rendu
        setTimeout(async () => {
          try {
            const response = await fetch("http://localhost:8000/get_user_name.php", {
              method: "GET",
              credentials: "include",
            })

            const text = await response.text()

            // Vérifier si la réponse est du JSON valide
            try {
              const data = JSON.parse(text)
              if (data.success && (data.prenom || data.nom)) {
                setUserName(`${data.prenom || ""} ${data.nom || ""}`.trim())
              }
            } catch (e) {
              console.log("Réponse non-JSON:", text)
              // Essayer d'extraire le nom directement du texte (si c'est un format simple)
              if (text.includes("prenom") && text.includes("nom")) {
                const match = text.match(/prenom['":\s]+([^'"]+)['"]\s*,\s*['"]nom['":\s]+([^'"]+)/i)
                if (match) {
                  setUserName(`${match[1]} ${match[2]}`.trim())
                }
              }
            }
          } catch (error) {
            console.log("Erreur lors de la récupération du nom:", error)
          }
        }, 500)
      } catch (error) {
        console.log("Erreur générale:", error)
      }
    }

    fetchUserName()
  }, [])

  return (
    <div className="m-0 p-0">
      <div className="relative flex items-center justify-center w-full sm:h-screen h-[400px] bg-black overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] object-cover transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={`${videoUrl}?autoplay=1&loop=1&playlist=${videoUrl.split("/").pop()}&mute=1&controls=0&disablekb=1&modestbranding=1&playsinline=1&fs=0`}
          title="Hero Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      <div className="sm:my-1 my-1 sm:mx-28 mx-8">
        <div className="flex sm:flex-row flex-col items-center justify-between sm:mt-[60px] mt-[10px]">
          <div className="bg-gray-100 mx-2 p-14 sm:w-[50%] w-full text-center sm:text-left text-[1.1rem]">
            <h2 className="sm:text-[30px] text-[40px] text-center font-medium text-secondary pb-4 pt-0">Bienvenue dans votre espace personnel</h2>
            <p className="text-justify sm:pr-5 pr-0">
              Explore ton espace étudiant, conçu pour répondre à tous tes besoins quotidiens ! Retrouve facilement tes
              cours, actualités, outils, et plus encore sur une interface intuitive et moderne, pensée pour simplifier
              ta vie à <span className="text-primary font-extrabold">EILCO</span>. Gagne du temps et reste connecté à
              l'essentiel, que ce soit sur ton ordinateur ou ton smartphone.
            </p>
          </div>
          <div className="relative sm:w-1/2 w-full my-7 flex flex-col items-start z-[-99] sm:mt-0 mt-[40px]">
            <img
              alt="img"
              src={heroImage || "/placeholder.svg"}
              className="sm:h-[400px] h-[260px] w-1/2 object-cover rounded-[6px] shadow-[rgba(0,0,0,0.19)_-1px_1px_62px_-18px] mb-4"
            />
            <img
              alt="img"
              src={heroImage2 || "/placeholder.svg"}
              className="absolute top-[-8%] right-[-4px] sm:h-[400px] h-[260px] w-1/2 object-cover rounded-[6px] shadow-[rgba(0,0,0,0.19)_-1px_1px_62px_-18px] mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

