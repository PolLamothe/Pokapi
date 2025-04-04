import React, { useState,useEffect } from 'react';
import config from "../config.js"
import dao from "../dao/pokapiDAO.js"

const SetPresentation = ({setId,displayState,middleState}) => {
    const [setData,setSetData] = useState(null)

    const [cardImages,setCardImages] = useState(null)

    const [everDisplayer,setEverDisplayed] = useState(false)

    const [middleStyle,setMiddleStyle] = useState({})

    useEffect(()=>{
        if(everDisplayer){
            async function retrieveSetData(){
                const resultJSON = await dao.fetchSetPresentation(setId)
                setSetData(resultJSON.set)
                setCardImages(resultJSON.images)
            }
            retrieveSetData()
        }
    },[everDisplayer])

    useEffect(() => {
        if (displayState) {
            setEverDisplayed(true)
        }
    }, [displayState]); 

    useEffect(()=>{
        if(middleState){
            setMiddleStyle({transform : "scale(1.25)"})
        }else{
            setMiddleStyle({})
        }
    },[middleState])

    return (
        <div id='container' style={{...middleStyle,...containerStyle}}>
            {setData != null && (
                <img src={setData.images.logo} id="setLogo" style={setLogoStyle}/>
            )}
            <div id='cardContainer' style={cardContainerStyle}>
                {cardImages && cardImages.map((image, index) => (
                    <img key={index} src={image} className='cardImage' style={{...cardImageStyle,...rotationEffect(index)}}/>
                ))}
            </div>
            <p>{setId || JSON.stringify(setId)}</p>
        </div>
    )

};

const containerStyle = {
    boxShadow : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius : "20px",
    padding : "1vw",
    margin : "4vw",
    transitionDuration : ".25s",
}

const cardContainerStyle = {
    display : "flex",
    flexDirection : "row",
    width : "fit-content",
    paddingLeft : "15%",
}

const setLogoStyle = {
    width : "40%",
    marginLeft : "50%",
    transform : "translateX(-50%)",
    marginBottom : "5vh",
}

const rotationEffect = (index)=>{
    const degrees = ["-15","-5","5","15"]
    const translates = ["10","0","0","10"]

    return {
        transform : `rotate(${degrees[index]}deg) translateY(${translates[index]}%)`,
    }
}

const cardImageStyle = {
    width : "32.5%",
    marginLeft : "-10%",
}

export default SetPresentation;
