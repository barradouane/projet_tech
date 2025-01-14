import React from "react";
import eilco from '../assets/eilco.jpg'
import logoportail from '../assets/logoportail.jpg'
import ulco from '../assets/ulco.png'
import './Header.css';

const Header=()=>{
    return(
        <header className="divheader">
        <img src={eilco} className="eilco-img">
        </img>
        <h1>
            Portail Etudiant
        </h1>
        <img src={logoportail} className="logoportail-img"/>
        <a href="https://eilco.univ-littoral.fr/">
        www.eilco.univ-littoral.fr
        </a>
        <img src={ulco} className="ulco-img"/>
        </header>
    
        

    );
};
export default Header;