import React, { useState } from 'react';
import logoImage from '../assets/images/logo.png';


export default function AddData() {
  const [type, setType] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [plus_de_details, setPlus_de_details] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !description || !type || !image || (type === 'evenement' && !date) || !plus_de_details) {
      alert('Tous les champs obligatoires doivent être remplis.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('titre', titre);
      formData.append('description', description);
      if (type === 'evenement') formData.append('date', date);
      formData.append('image', image);
      formData.append('plus_de_details', plus_de_details);

      const response = await fetch('http://localhost/backend/add_data.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(result.message);
        setTitre('');
        setDescription('');
        setDate('');
        setImage(null);
        setType('');
        setPlus_de_details('');
      } else {
        alert(result.message || 'Erreur lors de l’ajout.');
      }
    } catch (error) {
      alert('Une erreur est survenue : ' + error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
       <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
      {/* Logo */}
      <img src={logoImage} alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />
<h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">Espace administratif</h2>
</nav>
      <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[85%] p-6 bg-white shadow-lg rounded-[20px] mt-24 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-semibold my-3 text-[20px] text-secondary">Type de contenu :</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">-- Choisir un type --</option>
              <option value="actualite">Actualité</option>
              <option value="evenement">Événement</option>
            </select>
          </label>

          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            required
            className="border p-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="border p-2 rounded"
          />
          <textarea
            value={plus_de_details}
            onChange={(e) => setPlus_de_details(e.target.value)}
            placeholder="Plus de détails"
            required
            className="border p-2 rounded"
          />

          {/* Affichage conditionnel du champ date */}
          {type === 'evenement' && (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border p-2 rounded"
            />
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className='w-full h-[45px] bg-secondary border-none outline-none rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-light font-bold '
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
