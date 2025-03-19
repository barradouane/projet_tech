import React, { useState, useEffect } from "react";
import logoImage from "../assets/images/logo.png";


export default function ContactsForEditor(){
  const [filterType, setFilterType] = useState("all");
    return(
    <div className="p-6">
      
      <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
      {/* Logo */}
      <img src={logoImage} alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />
<h2 className="sm:text-[20px] text-[18px] font-medium text-secondary">Espace d'édition</h2>
</nav>
<div className="mt-32">
      <h2 className="sm:text-4xl text-3xl font-semibold mb-6 text-secondary text-center">Liste des contacts pédagogiques</h2>
      <hr/>
      
      
      <div className="flex flex-wrap justify-center items-center sm:gap-10 gap-0">
  <div className="my-4 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
    <label className="mr-4 font-medium sm:text-[20px] text-[16px] text-white">Filtrer par niveau de formation :</label>
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="p-3 border rounded-[14px]  bg-light"
    >
      <option value="all" className="bg-light text-secondary ">Tous</option>
      <option value="actualite" className="bg-light text-secondary ">CP1</option>
      <option value="evenement" className="bg-light text-secondary ">CP2</option>
      <option value="evenement" className="bg-light text-secondary ">ING1</option>
      <option value="evenement" className="bg-light text-secondary ">ING2</option>
      <option value="evenement" className="bg-light text-secondary ">ING3</option>
    </select>

    
  </div>

  <div className="sm:my-4 my-0 flex justify-center items-center bg-gradient-to-bl from-primary to-secondary p-2 sm:w-[30%] w-[80%] rounded-[14px]">
  <label className="mx-4 font-medium sm:text-[20px] text-[16px] text-white">Filtrer par service :</label>
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="p-3 border rounded-[14px]  bg-light"
    >
      <option value="all" className="bg-light text-secondary ">Tous</option>
      <option value="actualite" className="bg-light text-secondary ">Communication</option>
      <option value="evenement" className="bg-light text-secondary ">Formation</option>
      <option value="evenement" className="bg-light text-secondary ">Informatique</option>
      <option value="evenement" className="bg-light text-secondary ">Relations entreprises</option>
      <option value="evenement" className="bg-light text-secondary ">Internationale</option>
      <option value="evenement" className="bg-light text-secondary ">Vie associative</option>
    </select>
  </div>
</div>


<hr/>
     
      <table className="my-7 w-full table-auto ">
        <thead>
          <tr className="bg-gradient-to-r from-secondary to-primary  border-secondarybg-gray-2">
            <th className="border border-secondary p-2 text-light ">Nom</th>
            <th className="border border-secondary p-2 text-light">Prénom</th>

            <th className="border border-secondary p-2 text-light">Adresse mail</th>
            <th className="border border-secondary p-2 text-light">Numéro de téléphone</th>
          </tr>
        </thead>
        <tbody>
          {/* A remplir */}
        </tbody>
      </table>

      </div>
    </div>
    )
}