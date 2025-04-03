import SetPresentation from "../components/SetPresentation";
import dao from "../dao/pokapiDAO.js"
import React,{useState,useEffect} from "react"
import Carousel from "../components/Carrousel.jsx";
import {Button} from "@radix-ui/themes";

function Home() {
    return (
        <>
            <Carousel></Carousel>
            <Button>OPEN</Button> {/*TODO*/}
        </>
    )
}

export default Home;