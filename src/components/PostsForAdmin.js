import React, { useState, useEffect } from "react";
import logoImage from "../assets/images/logo.png";

export default function PostsForAdmin() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [filterType, posts]);



  // Pour faire l'affichage 
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_data.php");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }
      const data = await response.json();
      setPosts([...data.actualites, ...data.evenements]);
    } catch (error) {
      console.log("Erreur :", error);
      setError("Une erreur s'est produite lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  //Pour faire la suppression
  
  

  const filterPosts = () => {
    if (filterType === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.type === filterType));
    }
  };

 
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      
      <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
      {/* Logo */}
      <img src={logoImage} alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />
<h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">Espace administratif</h2>
</nav>
<div className="mt-32">
      <h2 className="sm:text-4xl text-3xl font-semibold mb-6 text-secondary text-center">Liste des Posts</h2>
      <hr/>
      
      
      <div className="flex justify-center items-center">
  <div className="my-4 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
    <label className="mr-4 font-medium text-[20px] text-white">Filtrer par type :</label>
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="p-3 border rounded-[14px]  bg-light"
    >
      <option value="all" className="bg-light text-secondary ">Tous</option>
      <option value="actualite" className="bg-light text-secondary ">Actualités</option>
      <option value="evenement" className="bg-light text-secondary ">Evénements</option>
    </select>
  </div>
</div>


<hr/>
     
      <table className="my-7 w-full table-auto ">
        <thead>
          <tr className="bg-gradient-to-r from-secondary to-primary  border-secondarybg-gray-2">
            <th className="border border-secondary p-2 text-light ">Titre</th>
            <th className="border border-secondary p-2 text-light">Description</th>

            <th className="border border-secondary p-2 text-light">Date</th>
            <th className="border border-secondary p-2 text-light"></th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-secondary p-2">{post.titre}</td>
              <td className="w-[50%] border border-secondary p-2">{post.description}</td>
              
              <td className="border border-secondary p-2">{post.date}</td>
              <td className="w-[14%] border border-secondary p-2">
                <button className="sm:w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]">Supprimer</button>
                <button className="sm:w-[50%] hover:cursor-pointer bg-secondary border-[0.6px] p-2 text-light border-e-gray-100 rounded-[16px] hover:bg-light hover:text-secondary hover:border-secondary hover:border-[0.6px]">Modifier</button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
}
