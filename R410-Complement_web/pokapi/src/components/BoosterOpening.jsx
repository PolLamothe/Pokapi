import { useEffect, useState } from "react"
import "./boosterOpening.css"
import pokapiDAO from "../dao/pokapiDAO"

function BoosterOpening({setId,callback}){

    const [cardList,setCardList] = useState([])

    const [currentIndex,setCurrentIndex] = useState(0)

    const [cardDisplayState,setCardDisplayState] = useState(false)

    const [boosterAnimationState,setBoosterAnimationState] = useState(false)

    const [currentCardAnimationState,setCurrentCardAnimationState] = useState(null)

    const [allCardAnimationState,setAllCardAnimationState] = useState(true)

    useEffect(()=>{
        async function getOpenedCard(){
            const result = await pokapiDAO.openBooster(setId)
            console.log(result)
            setCardList(result)
        }
        getOpenedCard()
    },[])

    useEffect(()=>{
        async function changeCurrentCardAnimationState(){
            if(currentCardAnimationState === false){
                setCurrentCardAnimationState(true)
            }
        }
        changeCurrentCardAnimationState()
    },[currentCardAnimationState])

    function nextCard(){
        setCurrentIndex(currentIndex+1)
        setCurrentCardAnimationState(false)
    }

    function startBoosterAnimation(){
        setBoosterAnimationState(true)
    }

    return (
        <>
            <div id="globalWrapper">
                <div id="mainWrapper">
                    {!cardDisplayState && (
                        <img src="/public/booster.png" className={boosterAnimationState ? "boosterAnimation" : ""} id="boosterImage" onAnimationEnd={()=>{setCardDisplayState(true)}} onClick={startBoosterAnimation}/>
                    )}
                    {currentIndex <= 5 && cardList.map((card,index)=>{
                        return <img src={(currentCardAnimationState === true && index >= 5-currentIndex) ? cardList[index].images.large : "/public/cardBack.webp"}
                        className={index < 5-currentIndex ? 
                            ("cardTransition card "+ 
                                (!cardDisplayState ? 
                                    "initSideCard" : 
                                    "finalSideCard"
                                )
                            ) : 
                            ("card " + (!cardDisplayState ?
                                "initSideCard" : 
                                (currentCardAnimationState ? 
                                    " mainCard" : 
                                    "finalSideCard"
                                )
                                ) + (allCardAnimationState ? 
                                    " cardTransition" : 
                                    ""
                                )
                            )}
                        style={(cardDisplayState && index < 5-currentIndex) ? 
                            dynamicCardStyle(index) : 
                            {zIndex : 5-index}
                        } 
                        onClick={nextCard}/>
                    })}
                    {currentIndex > 5 && (
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