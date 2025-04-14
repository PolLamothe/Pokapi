import { useEffect, useState } from "react"
import "./boosterOpening.css"
import pokapiDAO from "../dao/pokapiDAO"

function BoosterOpening({setId,callback}){

    const [cardList,setCardList] = useState([])

    const [currentIndex,setCurrentIndex] = useState(0)

    const [cardDisplayState,setCardDisplayState] = useState(false)

    const [boosterAnimationState,setBoosterAnimationState] = useState(false)

    useEffect(()=>{
        async function getOpenedCard(){
            const result = await pokapiDAO.openBooster(setId)
            console.log(result)
            setCardList(result)
        }
        getOpenedCard()
    },[])

    function nextCard(){
        if(boosterAnimationState){
            setCurrentIndex(currentIndex+1)
        }
    }

    function startBoosterAnimation(){
        setBoosterAnimationState(true)
    }

    return (
        <>
            <div id="globalWrapper" onClick={currentIndex > 5 ? callback : nextCard}>
                <div id="mainWrapper">
                    {!cardDisplayState && (
                        <img src="/public/booster.png" className={boosterAnimationState ? "boosterAnimation" : ""} id="boosterImage" onAnimationEnd={()=>{setCardDisplayState(true)}} onClick={startBoosterAnimation}/>
                    )}
                    {currentIndex <= 5 && cardList.map((card,index)=>{
                        return <img src={(index >= 5-currentIndex) ? cardList[index].images.large : "/public/cardBack.webp"}
                        className={index < 5-currentIndex ? 
                            ("cardTransition card "+ 
                                (!cardDisplayState ? 
                                    "initSideCard" : 
                                    "finalSideCard"
                                )
                            ) : 
                            ("card mainCard")
                            }
                        style={(cardDisplayState && index < 5-currentIndex) ? 
                            dynamicCardStyle(index) : 
                            {zIndex : 5-index}
                        }/>
                    })}
                    {currentIndex > 5 && (
                        <div id="cardResultWrapper">
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