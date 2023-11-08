import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";
import {useState} from "react";

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const handleClearData = () => {
    localStorage.clear();
    setShowModal(false);
  };

  return (
    <nav>
      <Link to="/" className="title">
        Inneliggande
      </Link>
      <ul>
        <li>
          <Link to="/statistik">Aktuell Statistik</Link>
        </li>
        <li>
          <Link to="/sammanlagd">Filtrerad Statistik</Link>
        </li>
        <li>
          <button onClick={() => setShowModal(true)}>Ny Avd</button>
        </li>
      </ul>
      {showModal && (
        <div className="modal">
          <h3>Vill du verkligen radera all lagrad data?</h3>
          <button onClick={handleClearData}>JA!</button>
          <button onClick={() => setShowModal(false)}>NEJ!</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
