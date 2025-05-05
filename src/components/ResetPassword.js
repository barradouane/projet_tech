"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import logo from "../assets/images/logo.png"

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setMessage("Token de réinitialisation manquant.")
      setIsError(true)
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.")
      setIsError(true)
      return
    }

    setIsLoading(true)
    setMessage("")
    setIsError(false)

    try {
      const response = await fetch("http://localhost/projet_tech-WorkingVersion/src/backend/password_reset.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: newPassword,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Votre mot de passe a été mis à jour avec succès.")
        setIsError(false)
        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          navigate("/")
        }, 3000)
      } else {
        setMessage(data.error || "Une erreur est survenue.")
        setIsError(true)
      }
    } catch (err) {
      console.error("Erreur dans le fetch :", err)
      setMessage("Erreur lors de la réinitialisation du mot de passe.")
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[url('../assets/images/heroPicture.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-[420px] bg-transparent text-red backdrop-blur-[50px] border border-[rgba(255,255,255,0.2)] px-8 py-10 rounded-[20px] shadow-[0_7px_10px_rgba(255,255,255,0.5)]">
        <img src={logo || "/placeholder.svg"} className="h-auto w-[50%] mx-auto mb-6" alt="Logo" />
        <h2 className="font-bold text-center text-[28px] md:text-[36px] text-secondary mb-6">
          Réinitialiser le mot de passe
        </h2>

        {message && <p className={`text-center mb-4 ${isError ? "text-red-500" : "text-green-500"}`}>{message}</p>}

        {!token ? (
          <div className="text-center">
            <Link to="/" className="text-light underline">
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative w-full h-[45px] mb-4">
              <input
                type="password"
                value={newPassword}
                placeholder="Nouveau mot de passe"
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300 rounded-[40px] text-light text-[16px] px-6 py-2"
              />
            </div>

            <div className="relative w-full h-[45px] mb-4">
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirmer le mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300 rounded-[40px] text-light text-[16px] px-6 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-[#333] font-bold"
            >
              {isLoading ? "Traitement en cours..." : "Réinitialiser le mot de passe"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

