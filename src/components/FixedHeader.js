import React from 'react';
import Header from './Header';  // Assurez-vous que le composant Header existe
import NavBar from './NavBar';  // Assurez-vous que le composant NavBar existe
import './FixedHeader.css';

const FixedHeader = () => {
  return (
    <header className="fixed-header">
      <Header />
      <NavBar />
    </header>
  );
};

export default FixedHeader;
