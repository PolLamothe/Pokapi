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
            setCardList(result)
        }
        getOpenedCard()
    },[])

    useEffect(()=>{
        async function changeCurrentCardAnimationState(){
            if(currentCardAnimationState === false){
                await new Promise(r => setTimeout(r, 0));
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
                    {cardList.map((card,index)=>{
                        if(index > 4-currentIndex){
                            return null
                        }else{
                            return <img src="/public/cardBack.webp" 
                            className={"cardTransition card "+(!cardDisplayState ? "initSideCard" : "finalSideCard")} 
                            style={cardDisplayState ? dynamicCardStyle(index) : {}} onClick={nextCard}/>
                        }
                    })}
                    {currentIndex <= 5 && (
                        <img src={currentCardAnimationState === true ? cardList[currentIndex-1].images.large : "/public/cardBack.webp"}
                        className={"card " + (!cardDisplayState ? "initSideCard" : (currentCardAnimationState ? " mainCard" : "finalSideCard")) + (allCardAnimationState ? " cardTransition" : "")} 
                        style={(!cardDisplayState) ? {} : (!currentCardAnimationState ? dynamicCardStyle(4-currentIndex) : {})}
                        onClick={nextCard}
                        onTransitionEnd={()=>{
                            setAllCardAnimationState(false)
                        }}
                        />
                    )}
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