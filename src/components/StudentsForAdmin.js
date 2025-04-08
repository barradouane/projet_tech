"use client"

import { useState, useEffect } from "react"
import { FaSignOutAlt } from "react-icons/fa"

export default function StudentsForAdmin() {
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [filterSite, setFilterSite] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingStudent, setEditingStudent] = useState(null)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    site: "",
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    filterStudents()
  }, [filterSite, students])

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_users.php")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.")
      }
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      setError("Une erreur s'est produite lors du chargement des données.")
    } finally {
      setLoading(false)
    }
  }

  const filterStudents = () => {
    if (filterSite === "all") {
      setFilteredStudents(students)
    } else {
      setFilteredStudents(students.filter((student) => student.site.toLowerCase() === filterSite.toLowerCase()))
    }
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    setFormData({
      nom: student.nom,
      prenom: student.prenom,
      email: student.email,
      password: "",
      site: student.site,
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
      const response = await fetch("http://localhost:8000/update_user.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingStudent.id,
          ...formData,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        alert(data.success)
        setStudents(
          students.map((student) => (student.id === editingStudent.id ? { ...student, ...formData } : student)),
        )
        setEditingStudent(null)
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
      alert("Erreur lors de la mise à jour.")
    }
  }


  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout.php", {
        method: "POST",
        credentials: "include", // Important si les sessions sont gérées avec des cookies
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.success); // Afficher le message de succès
        window.location.href = "/"; // Redirection après déconnexion
      } else {
        console.error("Erreur HTTP:", response.status);
        alert("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de se déconnecter.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
      return
    }

    try {
      const response = await fetch("http://localhost:8000/delete_student.php", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })

      const data = await response.json()

      if (response.ok) {
        setStudents(students.filter((student) => student.id !== id))
        alert(data.success)
      } else {
        throw new Error(data.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      alert("Erreur lors de la suppression: " + error.message)
    }
  }

  const renderEditForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[50%]">
        <h2 className="text-2xl mb-4 text-primary font-medium text-center">Modifier l'étudiant</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Nom"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <input
            placeholder="Prenom"
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <input
            placeholder="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <select
            name="site"
            value={formData.site}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="Calais">Calais</option>
            <option value="Dunkerque">Dunkerque</option>
            <option value="Boulogne">Boulogne</option>
            <option value="Saint-Omer">Saint-Omer</option>
          </select>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setEditingStudent(null)}
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

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6">
      <nav className="flex justify-between items-center px-8 py-2 shadow-lg w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 bg-white text-secondary backdrop-blur-lg border border-white/20">
        <h2 className="text-lg sm:text-xl font-medium">Espace Administrateur</h2>
        <div
          className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Se déconnecter</span>
        </div>
      </nav>

      {editingStudent && renderEditForm()}

      <div className="mt-32">
        <h2 className="sm:text-4xl text-3xl font-semibold mb-6 text-secondary text-center">Liste des Étudiants</h2>
        <hr />
        <div className="flex justify-center items-center">
          <div className="my-4 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
            <label className="mr-4 font-medium text-[20px] text-white">Filtrer par site :</label>
            <select
              value={filterSite}
              onChange={(e) => setFilterSite(e.target.value)}
              className="p-3 border rounded-[14px] bg-light"
            >
              <option value="all" className="bg-light text-secondary">
                Tous
              </option>
              <option value="Calais" className="bg-light text-secondary">
                Calais
              </option>
              <option value="Dunkerque" className="bg-light text-secondary">
                Dunkerque
              </option>
              <option value="Boulogne" className="bg-light text-secondary">
                Boulogne
              </option>
              <option value="Saint-Omer" className="bg-light text-secondary">
                Saint-Omer
              </option>
            </select>
          </div>
        </div>

        <hr />

        {loading ? (
          <p className="text-center my-4">Chargement des étudiants...</p>
        ) : (
          <table className="my-7 w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-secondary to-primary border-secondarybg-gray-2">
                <th className="border border-secondary p-2 text-light">Nom</th>
                <th className="border border-secondary p-2 text-light">Prénom</th>
                <th className="border border-secondary p-2 text-light">Email</th>
                <th className="border border-secondary p-2 text-light">Site</th>
                <th className="border border-secondary p-2 text-light"></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100">
                    <td className="border border-secondary p-2">{student.nom}</td>
                    <td className="border border-secondary p-2">{student.prenom}</td>
                    <td className="border border-secondary p-2">{student.email}</td>
                    <td className="border border-secondary p-2">{student.site}</td>
                    <td className="border border-secondary p-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="sm:w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="sm:w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Aucun étudiant trouvé
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

