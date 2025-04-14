import { useEffect, useState } from "react"
import "./BoosterOpening.css"
import pokapiDAO from "../dao/pokapiDAO"

function BoosterOpening({setId,callback}){

    const [cardList,setCardList] = useState([])

    const [currentIndex,setCurrentIndex] = useState(-1)

    const [cardDisplayState,setCardDisplayState] = useState(false)

    const [boosterAnimationState,setBoosterAnimationState] = useState(false)

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
        setBoosterAnimationState(true)
    }

    return (
        <>
            <div id="globalWrapper">
                <div id="mainWrapper">
                    {!cardDisplayState && (
                        <img src="/public/booster.png" className={boosterAnimationState ? "boosterAnimation" : ""} id="boosterImage" onAnimationEnd={()=>{setCardDisplayState(true)}} onClick={startBoosterAnimation}/>)}
                    {cardList.map((card,index)=>{
                        if(index < currentIndex+1){
                            return null
                        }else{
                            return <img src="/public/cardBack.webp" className={"sideCard "+(!cardDisplayState ? "initSideCard" : "finalSideCard")} style={cardDisplayState ? dynamicCardStyle(index) : {}} onClick={nextCard}/>
                        }
                    })}
                    {cardList.length > 0 && cardDisplayState && currentIndex >= 0 && currentIndex < 5 && (
                        <img src={cardList[currentIndex].images.large} className="mainCard" onClick={nextCard}/>
                    )}
                    {currentIndex >= 5 && (
                        <div id="cardResultWrapper" onClick={callback}>
                            {cardList.map((card,index)=>{
                            return <img src={card.images.large} className="finalCard"/>
                        })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const dynamicCardStyle = (index)=> {
    const margin = index*10
    return {
        transform : "translate("+margin+"%,-50%)",
    }
}

export default BoosterOpening