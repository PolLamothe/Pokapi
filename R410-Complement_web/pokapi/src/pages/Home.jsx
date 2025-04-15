import React,{useState,useEffect} from "react"
import Carousel from "../components/Carrousel.jsx";
import {Button} from "@radix-ui/themes";
import BoosterOpening from "../components/BoosterOpening.jsx";

function Home() {

    const [openBoosterState,setOpenBoosterState] = useState(false)

    const [openBoosterSet,setOpenBoosterSet] = useState(null)

    useEffect(()=>{
        if(openBoosterState){
            document.body.style.overflowY = "hidden"
            window.scrollTo("0px","0px")
        }else(
            document.body.style.overflowY = "initial"
        )
    },[openBoosterState])

    function openingOver(){
        setOpenBoosterSet(null)
        setOpenBoosterState(false)
    }

    const openButtonStyle = {
        background: "#64408D",
        marginLeft : "50vw",
        transform : "translateX(-50%)",
        fontSize : "70px",
        padding : "3vh",
        cursor : "pointer",
        height : "fit-content",
        borderRadius : "40px",
        border: "2px solid #B42D5C",
        fontFamily: "'Racing Sans One', sans-serif",
        marginBottom : "2vh",
    }
            
    return (
        <>
            <Carousel setCurrentSetId={setOpenBoosterSet}></Carousel>
            <Button style={openButtonStyle} onClick={()=>setOpenBoosterState(true)}>OPEN</Button>
            {openBoosterState && (
                <BoosterOpening setId={openBoosterSet} callback={openingOver}/>
            )}
        </>
    )
}

export default Home;