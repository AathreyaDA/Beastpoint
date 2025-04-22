import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">BeastPoint</h1>
        <div className="navbar-links">
          <button className="navbar-link" onClick={() => navigate("/")}>
            <HomeIcon className="navbar-icon" /> Home
          </button>
          <button className="navbar-link" onClick={() => navigate("/animals")}>
            <PetsIcon className="navbar-icon" /> Animals
          </button>
          <button
            className="navbar-link"
            onClick={() => navigate("/ticketing")}
          >
            <ConfirmationNumberIcon className="navbar-icon" /> Ticketing
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
