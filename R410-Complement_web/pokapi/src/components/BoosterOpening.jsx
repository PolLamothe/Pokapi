import { useEffect, useState } from "react"
import "./boosterOpening.css"
import pokapiDAO from "../dao/pokapiDAO"

function BoosterOpening({setId}){

    const [imageList,setImageList] = useState([])

    const [cardList,setCardList] = useState([])

    useEffect(()=>{
        async function getOpenedCard(){
            const result = await pokapiDAO.openBooster(setId)
            setCardList(result)
        }
        getOpenedCard()
    },[])

    useEffect(()=>{
        let tempImageList = []
        for(let i = 1;i<cardList.length;i++){
            tempImageList.push(<img src="/public/cardBack.webp" style={{...dynamicCardStyle(i-1),...cardStyle}}/>)
        }
        setImageList(tempImageList)
    },[cardList])

    function removeFirstCard(){
        let temp = [...cardList]
        temp.splice(0,1)
        setCardList(temp)
    }

    return (
        <>
            <div style={globalWrapperStyle}>
                <div style={mainWrapperStyle}>
                    <img src="/public/booster.png" style={boosterImageStyle} id="boosterImage"/>
                    {imageList}
                    {cardList.length > 0 && (
                        <img src={cardList[0].images.large} style={{...cardStyle,...mainCardStyle}} onClick={removeFirstCard}/>
                    )}
                </div>
            </div>
        </>
    )
}

const cardStyle = {
    height : "60%",
    position : "absolute",
    borderRadius : "1vw",
    marginTop : "40vh",
    transform : "translateY(-50%)",
    cursor : "pointer"
}

const mainCardStyle = {
    right : "10%"
}

const dynamicCardStyle = (index)=> {
    const margin = index*3
    return {
        marginLeft : margin + "%",
    }
}

const boosterImageStyle = {
    height : "80%",
    top: "50%",
    left : "50%",
    position : "relative",
    transform : "translate(-50%,-50%)",
}

const mainWrapperStyle = {
    width : "70%",
    height : "80%",
    backgroundColor : "white",
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
    zIndex : "100"
}

export default BoosterOpening