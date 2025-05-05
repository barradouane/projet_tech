"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [testLink, setTestLink] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setIsError(false)
    setTestLink("")

    try {
      const response = await fetch("http://localhost/projet_tech-WorkingVersion/src/backend/password_reset.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      // Vérifier si la réponse est du JSON valide
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json()

        if (data.success) {
          setMessage("Un email de réinitialisation a été envoyé à votre adresse email.")
          setIsError(false)

          // Pour le test uniquement - afficher le lien de réinitialisation
          if (data.test_link) {
            setTestLink(data.test_link)
          }
        } else {
          setMessage(data.error || "Une erreur est survenue.")
          setIsError(true)
        }
      } else {
        // Si la réponse n'est pas du JSON, afficher le texte brut
        const text = await response.text()
        console.error("Réponse non-JSON reçue:", text)
        setMessage("Erreur de communication avec le serveur.")
        setIsError(true)
      }
    } catch (err) {
      console.error("Erreur dans le fetch :", err)
      setMessage("Erreur lors de l'envoi de l'email de réinitialisation.")
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[url('../assets/images/heroPicture.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-[420px] bg-transparent text-red backdrop-blur-[50px] border border-[rgba(255,255,255,0.2)] px-8 py-10 rounded-[20px] shadow-[0_7px_10px_rgba(255,255,255,0.5)]">
        <img src={logo || "/placeholder.svg"} className="h-auto w-[50%] mx-auto mb-6" alt="Logo" />
        <h2 className="font-bold text-center text-[28px] md:text-[36px] text-secondary mb-6">Mot de passe oublié</h2>

        {message && <p className={`text-center mb-4 ${isError ? "text-red-500" : "text-green-500"}`}>{message}</p>}

       

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-full h-[45px] mb-4">
            <input
              type="email"
              value={email}
              placeholder="Votre adresse email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300 rounded-[40px] text-light text-[16px] px-6 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-[#333] font-bold"
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
          </button>
        </form>

        <div className="flex items-center justify-center text-[14.5px] mt-4">
          <Link to="/" className="text-light">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}

