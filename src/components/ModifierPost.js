import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logoImage from "../assets/images/logo.png";

export default function ModifierPost() {
    const { postId } = useParams(); 
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");
    const [plusDeDetails, setPlusDeDetails] = useState("");
    const [sites, setSites] = useState("");
    const [categorie, setCategorie] = useState("");
    const [site, setSite] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost/projet_tech-WorkingVersion/src/backend/get_data.php?id=${postId}`);
                const data = await response.json();
    
                console.log("Données reçues:", data); 
    
                if (data.success) {
                    setTitre(data.post.titre || "");  
                    setDescription(data.post.description || "");  
                    setCategorie(data.post.categorie || "");  
                    setDate(data.post.date || "");  
                    setSite(data.post.site || "");  
                } else {
                    console.error("Erreur: ", data.message);
                }
            } catch (error) {
                console.error("Erreur fetch:", error.message);
            }
        };
    
        fetchPostData();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            id: postId,
            ...(titre && { titre }),
            ...(description && { description }),
            ...(date && { date }),
            ...(image && { image }),
            ...(plusDeDetails && { plus_de_details: plusDeDetails }),
            ...(sites && { sites }),
            ...(categorie && { categorie }),
            ...(site && { site }),
        };

        try {
            const response = await fetch("http://localhost/projet_tech-WorkingVersion/src/backend/update_posts.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();
            console.log("Réponse du serveur:", result);

            if (result.message.includes("succès")) {
                alert("Post modifié avec succès !");
                navigate("/posts");
            } else {
                alert(`Erreur: ${result.message}`);
            }
        } catch (error) {
            console.error("Erreur de mise à jour:", error);
            alert(`Erreur lors de la modification du post: ${error.message}`);
        }
    };

    return (
        <div className="h-auto flex items-center justify-center bg-white">
            <nav className="flex justify-between items-center px-8 py-2 shadow-lg w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 bg-white text-secondary backdrop-blur-lg border border-white/20">
                <img src={logoImage} alt="logo" className="h-[60%] w-auto" />
                <h2 className="text-lg sm:text-xl font-medium">Espace d'édition</h2>
                <div className="flex items-center justify-center space-x-2 text-secondary text-xl py-2 px-4 sm:px-6 rounded-[10px] cursor-pointer hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out">
                    <FaSignOutAlt className="text-xl" />
                    <span>Se déconnecter</span>
                </div>
            </nav>

            <div className="border-[1px] border-secondary max-w-lg sm:w-full w-[85%] p-6 bg-white shadow-lg rounded-[20px] mt-[120px] mb-[50px]">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Titre du post" className="border p-2 rounded" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    <textarea placeholder="Description du post" className="border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="date" className="border p-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />
                    <input type="text" placeholder="Image URL" className="border p-2 rounded" value={image} onChange={(e) => setImage(e.target.value)} />
                    <textarea placeholder="Plus de détails" className="border p-2 rounded" value={plusDeDetails} onChange={(e) => setPlusDeDetails(e.target.value)} />
                    <input type="text" placeholder="Sites" className="border p-2 rounded" value={sites} onChange={(e) => setSites(e.target.value)} />
                    <input type="text" placeholder="Catégorie" className="border p-2 rounded" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
                    <input type="text" placeholder="Site" className="border p-2 rounded" value={site} onChange={(e) => setSite(e.target.value)} />
                    <button type="submit" className="w-full h-[45px] bg-secondary border-none outline-none rounded-[10px] text-[16px] text-light font-bold">Modifier</button>
                </form>
            </div>
        </div>
    );
}
