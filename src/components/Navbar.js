import React, { useState } from 'react';
import logoImage from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBriefcase, FaAddressBook } from 'react-icons/fa';

const MenuItems = [
  {
    title: "Accueil",
    url: "/",
    cName: "nav-links",
    icon: <FaHome />,
  },
  {
    title: "Contacts",
    url: "/contacts",
    cName: "nav-links",
    icon: <FaAddressBook />,
  },
];

export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const toggleServices = () => {
    setShowServices(!showServices);
  };
  return (
    <nav className="flex justify-between items-center px-[30px] py-0 shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-[95%] h-[80px] rounded-[13px] fixed top-[20px] left-1/2 transform -translate-x-1/2 z-[9999] bg-transparent text-white backdrop-blur-[30px] border-[3px] border-white/20 p-[30px] ">
      {/* Logo */}
      <img src={logoImage} alt="logo" className="h-[58%] w-[30%] sm:h-[65%] sm:w-[10%]" />

      {/* Mobile Menu Icon */}
      <div onClick={handleClick} className="sm:hidden">
        {clicked ? <FaTimes className="text-lg text-primary cursor-pointer" /> : <FaBars className="text-lg text-primary cursor-pointer" />}
      </div>

      {/* Navbar Links */}
      <ul
  className={`sm:mt-0 mt-2 sm:flex sm:items-center sm:static sm:w-auto sm:opacity-100 sm:flex-row 
  ${clicked ? "flex flex-col bg-light items-center flex-start-0 absolute top-[80px] left-0 w-full opacity-100 rounded-[13px] sm:shadow-none shadow-[0_5px_15px_rgba(0,0,0,0.25)] z-[9999]" : "hidden"}`}
>
        {MenuItems.map((item, index) => (
          <li key={index} className="w-full sm:w-auto sm:mx-auto text-secondary text-xl py-2 sm:py-0 hover:bg-secondary hover:text-light hover:rounded-[10px] transition-all duration-300 ease-in-out">
            <Link to={item.url} className={`${item.cName}sm:inline flex flex-row items-center p-4`}>
              <span className="mx-[10px] my-auto text-xl ">{item.icon}</span>{item.title}
              
            </Link>
          </li>
        ))}
       {/* Services Menu */}
<li
  className="w-full sm:w-auto text-secondary text-xl py-2 sm:py-0 hover:bg-secondary hover:text-light hover:rounded-[10px] transition-all duration-300 ease-in-out relative" // Added 'relative' for context
  onClick={toggleServices}
>
  <div className="flex flex-row items-center cursor-pointer p-4">
    <span className="mx-[10px] my-auto text-xl">
      <FaBriefcase />
    </span>
    Services
  </div>
  {showServices && (
  <ul className="rounded-[10px] absolute left-0 sm:left-auto sm:right-0 top-full bg-secondary text-light mt-0 w-full sm:w-[200px]">
    <li className="py-4 px-4 hover:bg-light hover:text-primary hover:rounded-[10px]">
      <a href="https://edt.univ-littoral.fr/direct/index.jsp?data=6b052c86649c89d6314052e0c2e2410df63f1816a4b0a6ae41893446ff37497ec55ef35a53135e002df1531698f94af0a3ec2aaf9a1c38d06b44c36d8361b35011a10a238b0a823699328a9323a95a07c004deba0e9910a95c5e72a718a33d6e" >Emploi du temps</a>
      
    </li>
    <li className="py-4 px-4 hover:bg-light hover:text-primary hover:rounded-[10px]">
      <a href="https://portail.eilco.fr:28/" rel="noopener noreferrer">
        Moodle
      </a>
    </li>
    <li className="py-4 px-4 hover:bg-light hover:text-primary hover:rounded-[10px]">
      <a href="//cloudeilco.univ-littoral.fr/" rel="noopener noreferrer">
        NextCloud
      </a>
    </li>
    <li className="py-4 px-4 hover:bg-light hover:text-primary hover:rounded-[10px]">
      <a className="w-full" href="https://webmail.univ-littoral.fr/" rel="noopener noreferrer">
        Zimbra
      </a>
    </li>
    <li className="py-4 px-4 hover:bg-light hover:text-primary hover:rounded-[10px]">
      <a href='https://www.absence.eilco-ulco.fr/'>Demande d'autorisation d'absence</a>
      
    </li>
  </ul>
)}

</li>



      </ul>
    </nav>
  );
}
