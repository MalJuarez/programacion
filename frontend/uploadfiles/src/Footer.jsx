// Footer.js
import React from "react";
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Proyecto MAM. Todos los derechos reservados.</p>
                <p>Contactanos: info@nuestracompania.com</p>
                <p>Seguinos en:
                    <a href="https://twitter.com">Twitter</a> | 
                    <a href="https://facebook.com">Facebook</a> | 
                    <a href="https://instagram.com">Instagram</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;