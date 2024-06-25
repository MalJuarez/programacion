import React from "react";
import './header.css';

function Header() {
    return (
        <header className="header">
             <div className="logo-container">
             <img src="Logo.png" alt="Logo" className="logo" />
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item"><a href="#login">Inicio de sesión</a></li>
                    <li className="nav-item"><a href="#nosotras">Nosotras</a></li>
                    <li className="nav-item"><a href="http://localhost:5173">Comenzar</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
