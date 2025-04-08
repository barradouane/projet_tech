"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logoImage from "../assets/images/logo.png"
import { FaSignOutAlt , FaHome } from "react-icons/fa"

export default function ContactsForEditor() {
  const [contacts, setContacts] = useState([])
  const navigate = useNavigate(); 
  const [filterType, setFilterType] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [niveauFilter, setNiveauFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingContact, setEditingContact] = useState(null)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    titre: "",
    service: "",
    niveau_de_formation: "",
    site: "Calais",
  })


  const handleAccueil = () => {
    
    navigate('/editor-space'); 
  };
  // Fetch contacts data when component mounts or filter changes
  useEffect(() => {
    fetchContacts()
  }, [serviceFilter, niveauFilter])

  const fetchContacts = async () => {
    setLoading(true)
    try {
      let url = `http://localhost:8000/get_contacts.php?site=Calais`

      // Add filters to URL if set
      if (serviceFilter !== "all") {
        url += `&service=${serviceFilter}`
      }
      if (niveauFilter !== "all") {
        url += `&niveau=${niveauFilter}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setContacts(data.contacts)
      } else {
        setError(data.message)
        console.error(data.message)
      }
    } catch (error) {
      setError("Erreur lors de la récupération des contacts")
      console.error("Erreur lors de la récupération des contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  // Gestion de la suppression
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
      return // Annuler si l'utilisateur clique sur "Annuler"
    }

    try {
      const formData = new FormData()
      formData.append("id", id)

      const response = await fetch("http://localhost:8000/delete_contacts.php", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        // Mettre à jour l'état local pour refléter la suppression
        setContacts(contacts.filter((contact) => contact.id !== id))
        alert(data.message) // Afficher le message de succès
      } else {
        throw new Error(data.message || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      alert("Erreur lors de la suppression: " + error.message)
    }
  }

  // Gestion de la modification
  const handleEdit = (contact) => {
    setEditingContact(contact)
    setFormData({
      nom: contact.nom,
      prenom: contact.prenom,
      email: contact.email,
      telephone: contact.telephone,
      titre: contact.titre || "",
      service: contact.service || "",
      niveau_de_formation: contact.niveau_de_formation || "",
      site: contact.site,
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()

      // Ajouter toutes les données du formulaire
      formDataToSend.append("id", editingContact.id)
      formDataToSend.append("nom", formData.nom)
      formDataToSend.append("prenom", formData.prenom)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("telephone", formData.telephone)
      formDataToSend.append("titre", formData.titre)
      formDataToSend.append("service", formData.service)
      formDataToSend.append("niveau_de_formation", formData.niveau_de_formation)
      formDataToSend.append("site", formData.site)

      const response = await fetch("http://localhost:8000/update_contacts.php", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.success) {
        alert(data.message)
        // Mettre à jour l'état local pour refléter les modifications
        setContacts(
          contacts.map((contact) => (contact.id === editingContact.id ? { ...contact, ...formData } : contact)),
        )
        setEditingContact(null)
      } else {
        alert(data.message || "Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
      alert("Erreur lors de la mise à jour: " + error.message)
    }
  }

  const renderEditForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[50%]">
        <h2 className="text-2xl mb-4 text-primary font-medium text-center">Modifier le contact</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="Nom"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />

            <input
              placeholder="Prénom"
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />

            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />

            <input
              placeholder="Téléphone"
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />

            <input
              placeholder="Titre"
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Sélectionner un service</option>
              <option value="Communication">Communication</option>
              <option value="Formation">Formation</option>
              <option value="Informatique">Informatique</option>
              <option value="Relations entreprises">Relations entreprises</option>
              <option value="Internationale">Internationale</option>
              <option value="Vie associative">Vie associative</option>
            </select>

            <select
              name="niveau_de_formation"
              value={formData.niveau_de_formation}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Sélectionner un niveau</option>
              <option value="CP1">CP1</option>
              <option value="CP2">CP2</option>
              <option value="ING1">ING1</option>
              <option value="ING2">ING2</option>
              <option value="ING3">ING3</option>
            </select>

            <select
              name="site"
              value={formData.site}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Calais">Calais</option>
              <option value="Boulogne">Boulogne</option>
              <option value="Dunkerque">Dunkerque</option>
              <option value="Saint-Omer">Saint-Omer</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setEditingContact(null)}
              className="px-4 py-2 bg-light text-secondary rounded-md"
            >
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-secondary text-light rounded-md">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout.php", {
        method: "POST",
        credentials: "include", // Important si les sessions sont gérées avec des cookies
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (response.ok) {
        const result = await response.json()
        alert(result.success) // Afficher le message de succès
        window.location.href = "/" // Redirection après déconnexion
      } else {
        console.error("Erreur HTTP:", response.status)
        alert("Erreur lors de la déconnexion.")
      }
    } catch (error) {
      console.error("Erreur:", error)
      alert("Impossible de se déconnecter.")
    }
  }

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-2 shadow-lg w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 bg-white text-secondary backdrop-blur-lg border border-white/20">
        {/* Logo */}
        <img src={logoImage} alt="logo" className="h-[60%] w-auto" />

  
<div className="flex flex-row">
        <div 
          className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
          onClick={handleAccueil}
        >
          <FaHome className="text-xl" />
          <span>Accueil</span>
        </div>

        {/* Bouton Se Déconnecter */}
        <div 
          className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Se déconnecter</span>
        </div>
        </div>
      </nav>

      {editingContact && renderEditForm()}

      <div className="mt-32">
        <h2 className="sm:text-4xl text-3xl font-semibold mb-6 text-secondary text-center">
          Liste des contacts pédagogiques
        </h2>
        <hr />

        <div className="flex flex-wrap justify-center items-center sm:gap-10 gap-0">
          {/* Filter by Niveau */}
          <div className="my-4 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
            <label className="mr-4 font-medium sm:text-[20px] text-[16px] text-white">
              Filtrer par niveau de formation :
            </label>
            <select
              value={niveauFilter}
              onChange={(e) => setNiveauFilter(e.target.value)}
              className="p-3 border rounded-[14px]  bg-light"
            >
              <option value="all" className="bg-light text-secondary ">
                Tous
              </option>
              <option value="CP1" className="bg-light text-secondary ">
                CP1
              </option>
              <option value="CP2" className="bg-light text-secondary ">
                CP2
              </option>
              <option value="ING1" className="bg-light text-secondary ">
                ING1
              </option>
              <option value="ING2" className="bg-light text-secondary ">
                ING2
              </option>
              <option value="ING3" className="bg-light text-secondary ">
                ING3
              </option>
            </select>
          </div>

          {/* Filter by Service */}
          <div className="sm:my-4 my-0 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
            <label className="mx-4 font-medium sm:text-[20px] text-[16px] text-white">Filtrer par service :</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="p-3 border rounded-[14px]  bg-light"
            >
              <option value="all" className="bg-light text-secondary ">
                Tous
              </option>
              <option value="Communication" className="bg-light text-secondary ">
                Communication
              </option>
              <option value="Formation" className="bg-light text-secondary ">
                Formation
              </option>
              <option value="Informatique" className="bg-light text-secondary ">
                Informatique
              </option>
              <option value="Relations entreprises" className="bg-light text-secondary ">
                Relations entreprises
              </option>
              <option value="Internationale" className="bg-light text-secondary ">
                Internationale
              </option>
              <option value="Vie associative" className="bg-light text-secondary ">
                Vie associative
              </option>
            </select>
          </div>
        </div>

        <hr />

        {loading ? (
          <p className="text-center my-4">Chargement des contacts...</p>
        ) : (
          <table className="my-7 w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-secondary to-primary border-secondarybg-gray-2">
                <th className="border border-secondary p-2 text-light">Nom</th>
                <th className="border border-secondary p-2 text-light">Prénom</th>
                <th className="border border-secondary p-2 text-light">Adresse mail</th>
                <th className="border border-secondary p-2 text-light">Numéro de téléphone</th>
                <th className="border border-secondary p-2 text-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-100">
                    <td className="border border-secondary p-2">{contact.nom}</td>
                    <td className="border border-secondary p-2">{contact.prenom}</td>
                    <td className="border border-secondary p-2">{contact.email}</td>
                    <td className="border border-secondary p-2">{contact.telephone}</td>
                    <td className="border border-secondary p-2">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucun contact trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

