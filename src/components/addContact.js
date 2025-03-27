import { useState } from "react";

export default function AddContact() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    service: "",
    telephone: "",
    niveau_de_formation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom || !formData.prenom || !formData.email) {
      alert("Nom, Prénom et Email sont obligatoires !");
      return;
    }

    const formBody = new URLSearchParams();
    for (let key in formData) {
      formBody.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost/projet_tech/src/backend/add_contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      const result = await response.json();

      if (result.success) {
        alert("Contact ajouté avec succès !");
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      console.error("Une erreur est survenue:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
        <img src="../assets/images/logo.png" alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />
        <h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">Espace d'édition</h2>
      </nav>
      
      <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[85%] p-6 bg-white shadow-lg rounded-[20px] mt-24 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">-- Choisir un service (facultatif) --</option>
              <option value="communication">Communication</option>
              <option value="formation">Formation</option>
              <option value="informatique">Informatique</option>
              <option value="relations-entreprises">Relations Entreprises</option>
              <option value="vie-associative">Vie Associative</option>
            </select>
          </label>

          <label className="flex flex-col">
            <select
              name="niveau_de_formation"
              value={formData.niveau_de_formation}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">-- Choisir un niveau de formation (facultatif) --</option>
              <option value="cp1">CP1</option>
              <option value="cp2">CP2</option>
              <option value="ing1">ING1</option>
              <option value="ing2">ING2</option>
              <option value="ing3">ING3</option>
            </select>
          </label>

          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Adresse mail"
            required
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Numéro de téléphone si disponible"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className='w-full h-[45px] bg-secondary border-none outline-none rounded-[10px] shadow-[0,0,10px,rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-light font-bold '
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
