import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
      </ul>
    </nav>
  );
}

export default Navbar;
