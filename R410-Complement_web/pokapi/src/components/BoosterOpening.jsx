import { useEffect, useState } from "react"
import "./BoosterOpening.css"
import pokapiDAO from "../dao/pokapiDAO"

function BoosterOpening({setId,callback}){

    const [cardList,setCardList] = useState([])

    const [currentIndex,setCurrentIndex] = useState(-1)

    const [cardDisplayState,setCardDisplayState] = useState(false)

    const [boosterStyle,setBoosterStyle] = useState(boosterImageStyle)

    useEffect(()=>{
        async function getOpenedCard(){
            const result = await pokapiDAO.openBooster(setId)
            setCardList(result)
        }
        getOpenedCard()
    },[])

    function nextCard(){
        setCurrentIndex(currentIndex+1)
    }

    function startBoosterAnimation(){
        setBoosterStyle({...boosterImageStyle,...boosterAnimation})
    }

    return (
        <>
            <div style={globalWrapperStyle}>
                <div style={mainWrapperStyle}>
                    {!cardDisplayState && (
                        <img src="/public/booster.png" style={boosterStyle} id="boosterImage" onAnimationEnd={()=>{setCardDisplayState(true)}} onClick={startBoosterAnimation}/>)}
                    {cardList.map((card,index)=>{
                        if(index < currentIndex+1){
                            return null
                        }else{
                            return <img src="/public/cardBack.webp" className={"sideCard "+(!cardDisplayState ? "initSideCard" : "finalSideCard")} style={cardDisplayState ? dynamicCardStyle(index) : {}} onClick={nextCard}/>
                        }
                    })}
                    {cardList.length > 0 && cardDisplayState && currentIndex >= 0 && currentIndex < 5 && (
                        <img src={cardList[currentIndex].images.large} style={{...cardStyle,...mainCardStyle}} onClick={nextCard}/>
                    )}
                    {currentIndex >= 5 && (
                        <div style={cardResultWrapper} onClick={callback}>
                            {cardList.map((card,index)=>{
                            return <img src={card.images.large} style={finalCardStyle}/>
                        })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const finalCardStyle = {
    width : "30%",
    cursor : "pointer"
}

const cardResultWrapper = {
    display : "flex",
    flexWrap : "wrap",
    justifyContent : "space-around",
    top : "50%",
    transform : "translateY(-50%)",
    position : "relative",
    gap : "1vw"
}

const boosterAnimation = {
    "animation": "boosterDisparition 1.5s forwards"
}

const initCardStyle = {
    left : "51%",
    transform : "translate(-50%,-50%)",
    height : "54%",
    position : "absolute",
    borderRadius : "1vw",
    marginTop : "40vh",
    transitionDuration : "1s"
}

const cardStyle = {
    position : "absolute",
    borderRadius : "1vw",
    marginTop : "40vh",
    transitionDuration : "1s",
    height : "60%",
    cursor : "pointer"
}

const mainCardStyle = {
    right : "10%",
    transform : "translateY(-50%)",
}

const dynamicCardStyle = (index)=> {
    const margin = index*10
    return {
        transform : "translate("+margin+"%,-50%)",
    }
}

const boosterImageStyle = {
    height : "80%",
    top: "50%",
    left : "50%",
    position : "relative",
    transform : "translate(-50%,-50%)",
    zIndex : "100",
    cursor : "pointer"
}

const mainWrapperStyle = {
    width : "60%",
    height : "80%",
    left : "50%",
    top: "50%",
    position : "relative",
    transform : "translate(-50%,-50%)",
    borderRadius : "30px",
    paddingLeft : "2%"
}

const globalWrapperStyle = {
    width:"100vw",
    height : "100vh",
    backgroundColor : "rgba(0,0,0,0.5)",
    position : "absolute",
    top : "0px",
    left : "0px",
    zIndex : "100",
    backdropFilter: "blur(5px)"
}

export default BoosterOpening