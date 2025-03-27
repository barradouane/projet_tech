import React, { useState, useEffect } from "react";
import logoImage from "../assets/images/logo.png";

export default function ContactsForEditor() {
  const [contacts, setContacts] = useState([]);
  const [filterNiveau, setFilterNiveau] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [editingContact, setEditingContact] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [niveauDeFormation, setNiveauDeFormation] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    fetch("http://localhost/projet_tech/src/backend/get_contacts")
      .then(response => response.json())
      .then(data => setContacts(data.contacts || []))
      .catch(error => console.error("Erreur lors de la récupération des contacts:", error));
  }, []);

  const handleEditing = (contact) => {
    setEditingContact(contact.id);
    setNom(contact.nom);
    setPrenom(contact.prenom);
    setEmail(contact.email);
    setTelephone(contact.telephone);
    setNiveauDeFormation(contact.niveau_de_formation);
    setService(contact.service);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = {
      id: editingContact,
      nom,
      prenom,
      email,
      telephone,
      niveau_de_formation: niveauDeFormation,
      service
    };
    
    fetch("http://localhost/projet_tech/src/backend/update_contacts.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(updatedContact)
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      if (data.success) {
        const updatedContacts = contacts.map(contact =>
          contact.id === editingContact ? updatedContact : contact
        );
        setContacts(updatedContacts);
        setEditingContact(null);
      }
    })
    .catch(error => console.error("Erreur lors de la mise à jour du contact:", error));
  };

  const supprimerContact = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce contact ?")) {
      fetch("http://localhost/projet_tech/src/backend/delete-contacts", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id })
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.success) {
          setContacts(contacts.filter(contact => contact.id !== id));
        }
      })
      .catch(error => console.error("Erreur lors de la suppression:", error));
    }
  };

  const filteredContacts = contacts.filter(contact =>
    (filterNiveau === "all" || contact.niveau_de_formation === filterNiveau) &&
    (filterService === "all" || contact.service === filterService)
  );

  return (
    <div className="p-6">
      <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px]">
        <img src={logoImage} alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />
        <h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">Espace d'édition</h2>
      </nav>
      <div className="mt-32">
        <h2 className="sm:text-4xl text-3xl font-semibold mb-6 text-secondary text-center">Liste des contacts pédagogiques</h2>
        <hr />
        <div className="flex flex-wrap justify-center items-center sm:gap-10 gap-0">
          <div className="my-4 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
            <label className="mr-4 font-medium sm:text-[20px] text-[16px] text-white">Filtrer par niveau de formation :</label>
            <select
              value={filterNiveau}
              onChange={(e) => setFilterNiveau(e.target.value)}
              className="p-3 border rounded-[14px] bg-light"
            >
              <option value="all">Tous</option>
              <option value="cp1">CP1</option>
              <option value="cp2">CP2</option>
              <option value="ing1">ING1</option>
              <option value="ing2">ING2</option>
              <option value="ing3">ING3</option>
            </select>
          </div>
          <div className="sm:my-4 my-0 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
            <label className="mx-4 font-medium sm:text-[20px] text-[16px] text-white">Filtrer par service :</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="p-3 border rounded-[14px] bg-light"
            >
              <option value="all">Tous</option>
              <option value="communication">Communication</option>
              <option value="formation">Formation</option>
              <option value="informatique">Informatique</option>
              <option value="relations-entreprises">Relations entreprises</option>
              <option value="internationales">Internationale</option>
              <option value="vie-associative">Vie associative</option>
            </select>
          </div>
        </div>
        <hr />
        <table className="my-7 w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-secondary to-primary border-secondarybg-gray-2">
              <th className="border border-secondary p-2 text-light">Nom</th>
              <th className="border border-secondary p-2 text-light">Prénom</th>
              <th className="border border-secondary p-2 text-light">Adresse mail</th>
              <th className="border border-secondary p-2 text-light">Numéro de téléphone</th>
              <th className="border border-secondary p-2 text-light">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr key={contact.id}>
                <td className="border border-secondary p-2">{contact.nom}</td>
                <td className="border border-secondary p-2">{contact.prenom}</td>
                <td className="border border-secondary p-2">{contact.email}</td>
                <td className="border border-secondary p-2">{contact.telephone}</td>
                <td className="border border-secondary p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEditing(contact)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => supprimerContact(contact.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulaire pour modifier le contact */}
        {editingContact && (
          <form onSubmit={handleSubmit} className="mt-6">
            <h3 className="text-2xl font-medium text-secondary text-center">Modifier le contact</h3>
            <div className="my-4">
              <label className="block text-sm font-medium text-secondary">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="p-3 border rounded-[14px] w-full bg-light"
                required
              />
            </div>
            <div className="my-4">
              <label className="block text-sm font-medium text-secondary">Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="p-3 border rounded-[14px] w-full bg-light"
                required
              />
            </div>
            <div className="my-4">
              <label className="block text-sm font-medium text-secondary">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-[14px] w-full bg-light"
                required
              />
            </div>
            <div className="my-4">
              <label className="block text-sm font-medium text-secondary">Numéro de téléphone</label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="p-3 border rounded-[14px] w-full bg-light"
                required
              />
            </div>
            <div className="my-4">
              <label className="block text-sm font-medium text-secondary">Niveau de formation</label>
              <select
                value={niveauDeFormation}
                onChange={(e) => setNiveauDeFormation(e.target.value)}
                className="p-3 border rounded-[14px] w-full bg-light"
                required
              >
                <option value="cp1">CP1</option>
                <option value="cp2">CP2</option>
                <option value="ing1">ING1</option>
                <option value="ing2">ING2</option>
                <option value="ing3">ING3</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block text-sm font-medium text-secondary">Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="p-3 border rounded-[14px] w-full bg-light"
                required
              >
                <option value="communication">Communication</option>
                <option value="formation">Formation</option>
                <option value="informatique">Informatique</option>
                <option value="relations-entreprises">Relations entreprises</option>
                <option value="internationales">Internationale</option>
                <option value="vie-associative">Vie associative</option>
              </select>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">Enregistrer</button>
          </form>
        )}
      </div>
    </div>
  );
}
