import React,{useState,useEffect} from "react"
import Carousel from "../components/Carrousel.jsx";
import {Button} from "@radix-ui/themes";
import BoosterOpening from "../components/BoosterOpening.jsx";
import config from "../config.js"

function Home() {

    const [openBoosterState,setOpenBoosterState] = useState(false)

    const [openBoosterSet,setOpenBoosterSet] = useState(null)

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    let heightHeader

    useEffect(()=>{
        if(openBoosterState){
            document.getElementsByTagName("html")[0].style.overflowY = "hidden"
            window.scrollTo("0px","0px")
            console.log(document.body.style.overflowY)
        }else(
            document.getElementsByTagName("html")[0].style.overflowY = "initial"
        )
    },[openBoosterState])

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        preloadImages([config.base+"/booster.png",config.base+"/cardBack.webp"])
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    function openingOver(){
        setOpenBoosterState(false)
    }

    function preloadImages(imageUrls) {
        imageUrls.forEach((url) => {
          const img = new Image()
          img.src = url
        })
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

    { windowSize < 1000 && windowSize > 600 ? (
        heightHeader = "160px"
    ) : windowSize < 600 ? (
        heightHeader = "110px"
    ) : windowSize > 1500 ? (
        heightHeader = "190px"
    ) : (
        heightHeader = "160px"
    )
    }

    return (
        <div style={{height: `calc(100vh - ${heightHeader})`}}>
            <Carousel setCurrentSetId={setOpenBoosterSet}></Carousel>
            <Button style={openButtonStyle} onClick={()=>setOpenBoosterState(true)}>OPEN</Button>
            {openBoosterState && (
                <BoosterOpening setId={openBoosterSet} callback={openingOver}/>
            )}
        </div>
    )
}

export default Home;