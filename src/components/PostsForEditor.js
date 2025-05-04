"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logoImage from "../assets/images/logo.png"
import { FaSignOutAlt , FaHome  , FaBars, FaTimes} from "react-icons/fa"

export default function PostsForEditor() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate(); 
  const [filteredPosts, setFilteredPosts] = useState([])
  const [filterType, setFilterType] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    plus_de_details: "",
    type: "",
    sites: "",
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [filterType, posts])

  // Pour faire l'affichage
  const fetchPosts = async () => {
    try {
      const response = await fetch("https://projetportailetudiant.eilco-ulco.fr/backend/get_data.php")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.")
      }
      const data = await response.json()
      setPosts([...data.actualites, ...data.evenements])
    } catch (error) {
      console.log("Erreur :", error)
      setError("Une erreur s'est produite lors du chargement des données.")
    } finally {
      setLoading(false)
    }
  }

  // Pour faire la suppression
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      return // Annuler si l'utilisateur clique sur "Annuler"
    }

    try {
      const response = await fetch("https://projetportailetudiant.eilco-ulco.fr/backend/delete_actualite.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })

      const data = await response.json()

      if (response.ok) {
        // Mettre à jour l'état local pour refléter la suppression
        setPosts(posts.filter((post) => post.id !== id))
        alert(data.message) // Afficher le message de succès
      } else {
        throw new Error(data.message || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      alert("Erreur lors de la suppression: " + error.message)
    }
  }

  const filterPosts = () => {
    if (filterType === "all") {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter((post) => post.type === filterType))
    }
  }

  const handleAccueil = () => {
    
    navigate('/editor-space'); 
  };

  // Gestion de la modification
  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      titre: post.titre,
      description: post.description,
      date: post.date,
      plus_de_details: post.plus_de_details || "",
      type: post.type,
      sites: post.sites || "",
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
      const response = await fetch("https://projetportailetudiant.eilco-ulco.fr/backend/update_posts.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingPost.id,
          ...formData,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        alert(data.success)
        setPosts(posts.map((post) => (post.id === editingPost.id ? { ...post, ...formData } : post)))
        setEditingPost(null)
      } 
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
      alert("Erreur lors de la mise à jour.")
    }
  }

  const renderEditForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[50%]">
        <h2 className="text-2xl mb-4 text-primary font-medium text-center">Modifier le post</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Titre"
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <textarea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            rows="3"
          ></textarea>

          <input
            placeholder="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <textarea
            placeholder="Plus de détails"
            name="plus_de_details"
            value={formData.plus_de_details}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            rows="5"
          ></textarea>

          <select
            name="type"
            value={formData.type}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="actualite">Actualité</option>
            <option value="evenement">Événement</option>
          </select>

          <input
            placeholder="Sites (séparés par des virgules)"
            type="text"
            name="sites"
            value={formData.sites}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
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
      const response = await fetch("https://projetportailetudiant.eilco-ulco.fr/backend/logout.php", {
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
        <img src={logoImage || "/placeholder.svg"} alt="logo" className="h-[60%] w-auto" />

        {/* Hamburger Menu Button (visible only on mobile) */}
        <button className="md:hidden text-secondary text-2xl focus:outline-none" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row">
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

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[80px] right-0 left-0 bg-white shadow-lg rounded-b-[13px] z-50 border border-white/20 border-t-0">
            <div
              className="flex items-center justify-center space-x-2 text-secondary text-xl py-4 px-6 cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
              onClick={handleAccueil}
            >
              <FaHome className="text-xl" />
              <span>Accueil</span>
            </div>
            <div
              className="flex items-center justify-center space-x-2 text-secondary text-xl py-4 px-6 cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-xl" />
              <span>Se déconnecter</span>
            </div>
          </div>
        )}
      </nav>

      {editingPost && renderEditForm()}

      <div className="mt-32">
        <h2 className="sm:text-4xl text-3xl font-semibold mb-6 text-secondary text-center">Liste des Posts</h2>
        <hr />

        <div className="flex justify-center items-center">
          <div className="my-4 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
            <label className="mr-4 font-medium text-[20px] text-white">Filtrer par type :</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-3 border rounded-[14px] bg-light"
            >
              <option value="all" className="bg-light text-secondary">
                Tous
              </option>
              <option value="actualite" className="bg-light text-secondary">
                Actualités
              </option>
              <option value="evenement" className="bg-light text-secondary">
                Evénements
              </option>
            </select>
          </div>
        </div>

        <hr />

        {loading ? (
          <p className="text-center my-4">Chargement des posts...</p>
        ) : (
          <table className="my-7 w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-secondary to-primary border-secondarybg-gray-2">
                <th className="border border-secondary p-2 text-light">Titre</th>
                <th className="border border-secondary p-2 text-light">Description</th>
                <th className="border border-secondary p-2 text-light">Date</th>
                <th className="border border-secondary p-2 text-light"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-100">
                    <td className="border border-secondary p-2">{post.titre}</td>
                    <td className="w-[50%] border border-secondary p-2">{post.description}</td>
                    <td className="border border-secondary p-2">{post.date}</td>
                    <td className="w-[14%] border border-secondary p-2">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="sm:w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]"
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="sm:w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]"
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    Aucun post trouvé
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

