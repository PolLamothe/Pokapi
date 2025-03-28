import React from 'react';
import pokapimini from "../assets/masterball.png";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={imageSlotStyle}>
          <img src={pokapimini} alt="Logo" style={imageStyle} />
        </div>
        <div style={columnStyle}>
          <h4 style={titleStyle}>Pages</h4>
          <ul style={listStyle}>
            <li>Cards</li>
            <li>Home</li>
            <li>Settings</li>
            <li>Code</li>
          </ul>
        </div>
        <div style={columnStyle}>
          <h4 style={titleStyle}>Source</h4>
          <ul style={listStyle}>
            <li>Pokemon Compagnie</li>
            <li>API Pokemon</li>
            <li>API Bot</li>
          </ul>
        </div>
        <div style={shadowStyle}></div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#fff',
  color: '#333',
  padding: '10px 0',
  textAlign: 'center',
};

const containerStyle = {
  position: "relative", // Change "absolute" to "relative" for better alignment
  width: "100%",
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const columnStyle = {
  marginLeft: '20%',
  fontFamily: 'Rambla, sans-serif',
  color: '#000000',
  fontWeight: 'bold',
  fontSize: '25px',
  flex: 1,
  margin: '0 15px',
  textAlign: 'left',
};

const titleStyle = {
  marginBottom: '10px',
};

const listStyle = {
  fontWeight: 'normal',
  fontFamily: 'Arial, sans-serif',
  color: '#000000',
  fontSize: '14px',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const imageSlotStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '20px',
  marginLeft: '5%',
};

const imageStyle = {
  height: '80px',
  filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
};

const shadowStyle = {
  position: "absolute",
  top: "0px", 
  left: "5%", 
  width: "90%", 
  height: "10px",
  boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1)", 
  borderRadius: "8px",
  zIndex: 0,
};

export default Footer;