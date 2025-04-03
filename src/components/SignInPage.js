import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser(); // Récupérer setUser du contexte
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/signin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Mettre à jour le contexte User
        setUser({ firstName: data.firstName, lastName: data.lastName });

        if (email === "admin@eilco.etu.univ-littoral.fr" && password === "admineilco123") {
          navigate("/admin-space");
        } else if (email === "editeur@eilco.etu.univ-littoral.fr" && password === "editeureilco123") {
          navigate("/editor-space");
        } else {
          switch (data.site) {
            case "Calais":
              navigate("/student-space-calais");
              break;
            case "Dunkerque":
              navigate("/student-space-dunkerque");
              break;
            case "Boulogne":
              navigate("/student-space-boulogne");
              break;
            case "Saint-Omer":
               navigate("/student-space-saintomer");
               break;
            default:
              navigate("/student-space-calais");
          }
        }
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch (err) {
      console.error("Erreur dans le fetch :", err);
      setError("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[url('../assets/images/heroPicture.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-[420px] bg-transparent text-red backdrop-blur-[50px] border border-[rgba(255,255,255,0.2)] px-8 py-10 rounded-[20px] shadow-[0_7px_10px_rgba(255,255,255,0.5)]">
      <img src={logo} className="h-auto w-[50%] mx-auto mb-6" alt="Logo" />
        <h2 className="font-bold text-center text-[28px] md:text-[36px] text-secondary mb-6">Connexion</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-full h-[45px] mb-4">

            <input 
            type="email" 
            value={email} 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-6 py-2"/>
          </div>
          <div className="relative w-full h-[45px] mb-4">
            
            <input 
            type="password" 
            value={password} 
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[1px] border-gray-300  rounded-[40px] text-light text-[16px] px-6 py-2"/>
          </div>

          <div className="flex items-center justify-center text-[14.5px] mt-[-15px] mb-[15px] ">
  <a className="text-light">Mot de passe oublié ?</a>
</div>
          <button type="submit" 
          className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-[#333] font-bold">Se connecter</button>
        </form>
        <div className="flex items-center justify-center text-[14.5px] mt-[-15px] mb-[15px]">
  <Link to="/sign-up" className="text-light mt-8">Vous n'avez pas encore créé votre compte ?</Link>
</div>
      </div>
    </div>
  );
}
