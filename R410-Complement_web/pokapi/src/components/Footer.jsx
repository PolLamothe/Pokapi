import React from 'react';
import pokapimini from "../assets/masterball.svg";
import {NavLink} from "react-router";
import {Link} from "@radix-ui/themes";

const Footer = () => {
  return (
    <footer style={footerStyle}>
        <div style={imageSlotStyle}>
          <img src={pokapimini} alt="Logo" style={imageStyle} />
        </div>
        <div style={columnStyle}>
          <h4 style={titleStyle}>Pages</h4>
          <ul style={listStyle}>

            <li><NavLink to="/collection">Cards</NavLink></li>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/account">Account</NavLink></li>
          </ul>
        </div>
        <div style={columnStyle}>
          <h4 style={titleStyle}>Source</h4>
          <ul style={listStyle}>
            <li><Link href="https://www.pokemon.com/fr">Pokémon Company</Link></li>
            <li><Link href="https://dev.pokemontcg.io/">API Pokemon</Link></li>
            <li><Link href="https://gitlab.univ-nantes.fr/pub/but/but2/sae4/sae4_class_grp1_eq1_arnaud-kyllian_destain-jauzua_lamothe-pol_le-carluer-brieuc_souchet-thomas">Code</Link></li>
          </ul>
        </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#fff',
  color: '#333',
  padding: '48px 80px',
  textAlign: 'center',
  boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1)",
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',
  gap: "10%",
};

const columnStyle = {
  fontFamily: 'Rambla, sans-serif',
  color: '#000000',
  fontWeight: 'bold',
  fontSize: '25px',
  textAlign: 'left',
};

const titleStyle = {
  margin: '0 0 10px 0',
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
};

const imageStyle = {
  height: '40px',
  filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))",
};

export default Footer;