import React, { useState } from 'react';
import pokapiLogo from "../assets/pokapi-logo.png";
import {useNavigate} from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);

    const getButtonStyle = (isHovered, borderRadius) => ({
      ...buttonBaseStyle,
      background: isHovered ? "white" : "#64408D",
      color: isHovered ? "#64408D" : "white",
      borderRadius,
    });

    return (
        <header style={containerStyle}>
            <button
                style={getButtonStyle(hovered === 'cards', "50px 0 0 50px")}
                onMouseEnter={() => setHovered('cards')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate("/collection")}
            >
                Cards
            </button>
            <img src={pokapiLogo} alt="Pokapi Logo"
                 style={logoStyle}
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
  gap: "60px",
  fontFamily: "'Racing Sans One', sans-serif",
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

const logoStyle = {
    height: "150px",
    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
    cursor: "pointer"
}

export default Header;
