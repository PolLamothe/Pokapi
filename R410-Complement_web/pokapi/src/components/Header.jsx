import React, { useState } from 'react';
import pokapiLogo from "../assets/pokapi-logo.png";

const containerStyle = {
  width: "50%",
  margin: "0 auto",
  position: "relative",
  marginBottom: "100px",
};

const style = {
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: "'Racing Sans One', sans-serif",
  position: "relative",
  zIndex: 1,
};

const shadowStyle = {
  position: "absolute",
  bottom: "0px",
  width: "100%",
  height: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "1px",
  zIndex: 0,
};

const buttonBaseStyle = {
  background: "#64408D",
  color: "white",
  padding: "10px",
  textTransform: "uppercase",
  fontSize: "25px",
  fontWeight: "600",
  border: "2px solid #B42D5C",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "175px",
  height: "70px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const Header = () => {
  const [hovered, setHovered] = useState(null);

  const getButtonStyle = (isHovered, borderRadius) => ({
    ...buttonBaseStyle,
    background: isHovered ? "white" : "#64408D",
    color: isHovered ? "#64408D" : "white",
    borderRadius,
  });

  return (
    <div style={containerStyle}>
      <div style={shadowStyle}></div>
      <header style={style}>
        <button
          style={getButtonStyle(hovered === 'cards', "50px 0 0 50px")}
          onMouseEnter={() => setHovered('cards')}
          onMouseLeave={() => setHovered(null)}
        >
          Cards
        </button>
        <img src={pokapiLogo} alt="Pokapi Logo" style={{ height: "150px", filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))" }} />
        <button
          style={getButtonStyle(hovered === 'account', "0 50px 50px 0")}
          onMouseEnter={() => setHovered('account')}
          onMouseLeave={() => setHovered(null)}
        >
          Account
        </button>
      </header>
    </div>
  );
};

export default Header;
