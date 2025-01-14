import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest('.dropdown-menu') && !e.target.closest('.nav-item.dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  // Ajoute un listener pour fermer le dropdown en cliquant à l'extérieur
  React.useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#" className="nav-link">Home</a>
        </li>
        <li className="nav-item dropdown">
          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault(); // Empêche le comportement par défaut du lien
              toggleDropdown();
            }}
          >
            Services
          </a>
          <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
            <li className="dropdown-item">
              <a href="https://cloudeilco.univ-littoral.fr/index.php/apps/dashboard/" className="dropdown-link">NextCloud</a>
            </li>
            <li className="dropdown-item">
              <a href="https://portail.eilco.fr:28/" className="dropdown-link">Moodle</a>
            </li>
            <li className="dropdown-item">
              <a href="https://edt.univ-littoral.fr/public/eilco-calais" className="dropdown-link">Emploi du temps</a>
            </li>
            <li className="dropdown-item">
              <a href="https://www.absence.eilco-ulco.fr/" className="dropdown-link">Demande d'Absence</a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Contacts</a>
        </li>
        
      </ul>
    </nav>
  );
};

export default NavBar;
