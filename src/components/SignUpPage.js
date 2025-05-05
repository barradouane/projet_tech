import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.png';

const SignUpPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    site: "Calais",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Reset error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost/projet_tech-WorkingVersion/src/backend/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Réponse brute du backend :", text);

      const data = JSON.parse(text);

      if (data.error) {
        setError(data.error);
      } else if (data.success) {
        setSuccess(data.success);
        // Ne pas rediriger automatiquement, laisser l'utilisateur lire le message
      } else {
        setError("Réponse inattendue du serveur.");
      }
    } catch (error) {
      console.error("Erreur dans le fetch :", error);
      setError("Erreur lors de l'inscription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 sm:px-0 px-4 bg-[url('../assets/images/heroPicture.jpg')] bg-no-repeat bg-cover bg-center min-h-screen">
      <div className="w-full max-w-[450px] bg-transparent text-red backdrop-blur-[50px] border border-[rgba(255,255,255,0.2)] px-8 py-10 rounded-[20px] shadow-[0_7px_10px_rgba(255,255,255,0.5)]">
      <img src={logo || "/placeholder.svg"} className="h-auto w-[50%] mx-auto mb-6" alt="Logo" />
        <h2 className="font-bold text-center text-[28px] md:text-[36px] text-secondary mb-6">Inscription</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="text-sm text-center">{success}</p>
            
          </div>
        )}

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="relative w-full h-[45px] mb-2">
              <input 
                type="text" name="nom" placeholder="Nom" value={formData.nom} 
                onChange={handleChange} required 
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-6 py-2"
              />
            </div>

            <div className="relative w-full h-[45px] mb-2">
              <input 
                type="text" name="prenom" placeholder="Prénom" value={formData.prenom} 
                onChange={handleChange} required 
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-6 py-2"
              />
            </div>
            
            <div className="relative w-full h-[45px] mb-2">
              <input 
                type="email" name="email" placeholder="Email universitaire" value={formData.email} 
                onChange={handleChange} required
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-6 py-2"
              />
            </div>

            <div className="relative w-full h-[45px] mb-2">
              <input 
                type="password" name="password" placeholder="Mot de passe" value={formData.password} 
                onChange={handleChange} required 
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-6 py-2"
              />
            </div>

            <div className="relative w-full h-[45px] mb-2">
              <input 
                type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" value={formData.confirmPassword} 
                onChange={handleChange} required 
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-6 py-2"
              />
            </div>

            <div className="relative w-full h-[45px] mb-2">
              <select 
                name="site" value={formData.site} onChange={handleChange} 
                className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-10 py-2"
              >
                <option value="Calais" className="text-secondary">Calais</option>
                <option value="Boulogne" className="text-secondary">Boulogne</option>
                <option value="Dunkerque" className="text-secondary">Dunkerque</option>
                <option value="Saint-Omer" className="text-secondary">Saint-Omer</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-[#333] font-bold disabled:opacity-70"
            >
              {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>
        ) : (
          <button 
            onClick={() => navigate("/")} 
            className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-[#333] font-bold mt-4"
          >
            Aller à la page de connexion
          </button>
        )}

        {!success && (
          <p className="text-center text-sm mt-4">
            Vous avez déjà un compte ? 
            <span 
              onClick={() => navigate("/")} 
              className="text-light cursor-pointer hover:underline ml-4"
            >
              Connectez-vous ici
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;