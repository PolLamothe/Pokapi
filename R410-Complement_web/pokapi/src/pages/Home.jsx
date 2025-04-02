import SetPresentation from "../components/SetPresentation";
import dao from "../dao/pokapiDAO.js"
import React,{useState,useEffect} from "react"
import Carousel from "../components/Carrousel.jsx";

function Home() {
    return (
        <>
            <h3>Page d'accueil (voir les booster)</h3>
            <Carousel></Carousel>
        </>
    )
}

const setWrapperStyle = {
    display : "flex",
    flexDirection : "row"
}

export default Home;