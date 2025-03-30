import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function PasswordReset() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost/projet_tech-elmehdi/projet_tech-elmehdi/src/backend/password_reset.php';
    const payload = token ? { token, new_password: password } : { email };

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
        if (token) {
          alert('✅ Mot de passe mis à jour');
        } else {
          alert('📧 Veuillez vérifier votre mail');
        }
        setMsg('');
     
      }
    } catch {
     
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[85%] p-6 bg-white shadow-lg rounded-[20px] mt-24">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">
            {token ? 'Nouveau mot de passe' : 'Mot de passe oublié'}
          </h2>
          {token ? (
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />
          ) : (
            <input
              type="email"
              placeholder="Ton email étudiant"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />
          )}
          <button
            type="submit"
            className="w-full h-[45px] bg-secondary border-none outline-none rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-light font-bold"
          >
            {token ? 'Valider' : 'Envoyer'}
          </button>
          {msg && <p className="mt-2 text-center">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
