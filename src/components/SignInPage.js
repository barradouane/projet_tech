import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost/projet_tech-elmehdi/projet_tech-elmehdi/src/backend/login.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, mot_de_passe: motDePasse }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(result.success);
        localStorage.setItem('csrf_token', result.csrf_token);

        // Redirection selon le rôle
        setTimeout(() => {
          if (result.role === 'admin') {
            navigate('/ultra');
          } else {
            navigate('/student-space');
          }
        }, 2000);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[url('../assets/images/heroPicture.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-[420px] bg-transparent text-red backdrop-blur-[50px] border border-[rgba(255,255,255,0.2)] px-8 py-10 rounded-[20px] shadow-[0_7px_10px_rgba(255,255,255,0.5)]">
        <img src={logo} className="h-auto w-[50%] mx-auto mb-6" alt="Logo" />
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-center text-[28px] md:text-[36px] text-secondary mb-6">Connexion</h1>
          <div className="relative w-full h-[50px] mb-6">
            <input
              className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[2px] border-gray-500 rounded-[40px] text-secondary text-[16px] px-6 py-2"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative w-full h-[50px] mb-6">
            <input
              className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[2px] border-gray-500 rounded-[40px] text-secondary text-[16px] px-6 py-2"
              type="password"
              placeholder="Mot de passe"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center text-[14.5px] mt-[-15px] mb-[15px]">
            <a className="text-light" href="/forgot-password">Mot de passe oublié ?</a>
          </div>
          <button
            className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-[#333] font-bold"
            type="submit"
          >
            Se connecter
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
        <div className="flex items-center justify-center text-[14.5px] mt-[-15px] mb-[15px]">
          <a className="text-light mt-8" href="/sign-up">
            Vous n'avez pas encore créé votre compte ?
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
