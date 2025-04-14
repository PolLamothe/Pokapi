import React, { useState, useEffect } from 'react';
import pokapiLogo from "../assets/pokapi-logo.png";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //tout le responsif je sais pas faire avec un media query en react 
  const surTablette = windowWidth < 1024;
  const surMobile = windowWidth < 600;

  const getButtonStyle = (isHovered, borderRadius) => ({
    ...buttonBaseStyle,
    background: isHovered ? "white" : "#64408D",
    color: isHovered ? "#64408D" : "white",
    borderRadius,
    width: surMobile ? "120px" : surTablette ? "140px" : "175px",
    height: surMobile ? "50px" : surTablette ? "60px" : "70px",
    fontSize: surMobile ? "14px" : surTablette ? "18px" : "25px",
  });

  const dynamicLogoStyle = {
    ...logoStyle,
    height: surMobile ? "90px" : surTablette ? "120px" : "150px",
  };

  const dynamicContainerStyle = {
    ...containerStyle,
    gap: surMobile ? "20px" : surTablette ? "40px" : "60px",
    padding: surMobile ? "10px" : "20px",
  };

  return (
    <header style={dynamicContainerStyle}>
      <button
        style={getButtonStyle(hovered === 'cards', "50px 0 0 50px")}
        onMouseEnter={() => setHovered('cards')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/collection")}
      >
        Cards
      </button>
      <img
        src={pokapiLogo}
        alt="Pokapi Logo"
        style={dynamicLogoStyle}
        onClick={() => navigate("/")}
      />
      <button
        style={getButtonStyle(hovered === 'account', "0 50px 50px 0")}
        onMouseEnter={() => setHovered('account')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/account")}
      >
        Account
      </button>
    </header>
  );
};

const containerStyle = {
  width: "100%",
  margin: "0 auto",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Racing Sans One', sans-serif",
};

const buttonBaseStyle = {
  background: "#64408D",
  color: "white",
  padding: "10px",
  textTransform: "uppercase",
  fontWeight: "600",
  border: "2px solid #B42D5C",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const logoStyle = {
  filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
  cursor: "pointer",
};

export default Header;
