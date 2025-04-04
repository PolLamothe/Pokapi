import SetPresentation from "../components/SetPresentation";
import dao from "../dao/pokapiDAO.js"
import React,{useState,useEffect} from "react"
import Carousel from "../components/Carrousel.jsx";
import {Button} from "@radix-ui/themes";

function Home() {
    return (
        <>
            <Carousel></Carousel>
            <Button style={openButtonStyle}>OPEN</Button>
        </>
    )
}

const openButtonStyle = {
    marginLeft : "50vw",
    transform : "translateX(-50%)",
    fontSize : "110px",
    padding : "2vw",
    cursor : "pointer",
    height : "fit-content",
    borderRadius : "40px",
    border : "solid 5px rgba(200,50,50,1)",
    fontFamily: "'Racing Sans One', sans-serif",
    marginBottom : "2vh",
}

export default Home;