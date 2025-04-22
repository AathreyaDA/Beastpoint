import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">
        BeastPoint: A user-friendly zoo management system
      </h1>
      <p className="home-subtitle">
        Discover the wildest experience in the heart of nature!
      </p>

      {/* Filler content about PES Zoo */}
      <div className="zoo-description">
        <h2>Welcome to PES Zoo</h2>
        <p>
          Nestled in the heart of the city, PES Zoo is a sanctuary for over 500
          animals representing 100 species from around the world. Our 50-acre
          facility combines conservation, education, and recreation to create
          unforgettable experiences.
        </p>

        <div className="zoo-highlights">
          <h3>Zoo Highlights</h3>
          <ul>
            <li>🐘 The largest elephant habitat in the region</li>
            <li>🦁 Award-winning big cat enclosures</li>
            <li>🐧 State-of-the-art penguinarium</li>
            <li>🌿 5-acre tropical rainforest biodome</li>
          </ul>
        </div>

        <div className="zoo-mission">
          <h3>Our Mission</h3>
          <p>
            PES Zoo is committed to wildlife conservation, providing exceptional
            animal care, and inspiring the next generation of environmental
            stewards through engaging educational programs.
          </p>
        </div>
      </div>

      <div className="button-group">
        <motion.div whileHover={{ scale: 1.1 }}>
          <button
            className="jungle-button"
            onClick={() => navigate("/ticketing")}
          >
            <GroupIcon /> Visitor
          </button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <button
            className="jungle-button"
            onClick={() => navigate("/admin/login")}
          >
            <AdminPanelSettingsIcon /> Admin
          </button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <button
            className="jungle-button"
            onClick={() => navigate("/staff/login")}
          >
            <BadgeIcon /> Staff
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
