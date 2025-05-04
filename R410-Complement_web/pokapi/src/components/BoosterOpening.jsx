import {useEffect, useState} from "react"
import "./boosterOpening.css"
import pokapiDAO from "../dao/pokapiDAO"
import config from "../config"

function BoosterOpening({setId,callback}){

    const [cardList,setCardList] = useState([])

    const [currentIndex,setCurrentIndex] = useState(0)

    const [cardDisplayState,setCardDisplayState] = useState(false)

    const [boosterAnimationState,setBoosterAnimationState] = useState(false)

    useEffect(()=>{
        async function getOpenedCard(){
            const result = await pokapiDAO.openBooster(setId)
            setCardList(result)
            preloadImages(result.map((card)=>card["images"]["large"]))
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

    function preloadImages(imageUrls) {
        imageUrls.forEach((url) => {
          const img = new Image()
          img.src = url
        })
        console.log("booster images loaded")
      }

    return (
        <>
            <div id="globalWrapper" onClick={currentIndex > 5 ? callback : nextCard}>
                <div className={"mainWrapper " + (currentIndex > 5 ? "cardResultWrapper" : "")}>
                    {!cardDisplayState && (
                        <img src={config.base+"/booster.png"} className={boosterAnimationState ? "boosterAnimation" : ""} id="boosterImage" onAnimationEnd={()=>{setCardDisplayState(true)}} onClick={startBoosterAnimation}/>
                    )}
                    {cardList.map((card,index)=>{
                        return <img src={(index >= 5-currentIndex) ? cardList[index].images.large : config.base+"/cardBack.webp"}
                        className={currentIndex <= 5 ?
                            (index < 5-currentIndex ?
                                ("cardTransition card "+
                                    (!cardDisplayState ?
                                        "initSideCard" :
                                        "finalSideCard"
                                    )
                                ) :
                                ("card mainCard")) :
                            ("finalCard")
                            }
                        style={(cardDisplayState && index < 5-currentIndex && currentIndex <= 5) ?
                            dynamicCardStyle(index) :
                            {zIndex : 5-index}
                        }/>
                    })}
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