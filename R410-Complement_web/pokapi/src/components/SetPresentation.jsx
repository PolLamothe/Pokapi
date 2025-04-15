import React, { useState,useEffect } from 'react';
import dao from "../dao/pokapiDAO.js"

const SetPresentation = ({setId,displayState,middleState}) => {
    const [setData,setSetData] = useState(null)

    const [cardImages,setCardImages] = useState(null)

    const [everDisplayer,setEverDisplayed] = useState(false)

    const [middleStyle,setMiddleStyle] = useState({})

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const [cardNumber,setCardNumber] = useState(4)

    useEffect(() => {
            const handleResize = () => {
                setWindowSize(window.innerWidth);
            }
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize);
            }
        }, [])
    

    useEffect(()=>{
        if(everDisplayer){
            async function retrieveSetData(){
                const resultJSON = await dao.fetchSetPresentation(setId)
                setSetData(resultJSON.set)
                setCardImages(resultJSON.images.map(i => i.small))
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

    useEffect(()=>{
        if(windowSize > 600 && windowSize < 1000){
            setCardNumber(3)
        }else{
            setCardNumber(4)
        }
    },[windowSize])

    var containerStyle = {
        boxShadow : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius : "20px",
        padding : "1vw",
        marginTop: "4vw",
        marginRight: "4vw",
        marginBottom: "4vw",
        marginLeft: "4vw",
        transitionDuration : ".25s",
        height : "40vh"
    }
    
    var cardContainerStyle = {
        display : "flex",
        flexDirection : "row",
        width : "fit-content",
        paddingLeft : "15%",
    }
    
    var setLogoStyle = {
        height : "10vh",
        maxWidth : "90%",
        marginLeft : "50%",
        transform : "translateX(-50%)",
        marginBottom : "5vh",
        objectFit : "contain",
    }
    
    const rotationEffect = (index)=>{
        var degrees = null
        var translates = null
        if(cardNumber == 4){
            degrees = ["-15","-5","5","15"]
            translates = ["10","0","0","10"]
        }else{
            degrees = ["-10","0","10"]
            translates = ["5","0","5"]
        }
    
        return {
            transform : `rotate(${degrees[index]}deg) translateY(${translates[index]}%)`,
        }
    }
    
    var cardImageStyle = {
        width : "32.5%",
        marginLeft : "-10%",
    }

    if(windowSize < 1000 && windowSize > 600){
        setLogoStyle["width"] = "90%"

        cardImageStyle["width"] = "40%"

        containerStyle["marginLeft"] = "4vw"
        containerStyle["height"] = "35vh"
    }else if (windowSize > 1000 && windowSize < 1500) {
        containerStyle["marginLeft"] = "4vw"
    } else if(windowSize > 1500) {
        containerStyle["marginLeft"] = "4vw"
    } else if(windowSize <= 600){
        containerStyle["height"] = "45vh"
    }

    return (
        <div id='container' style={{...middleStyle,...containerStyle,backgroundColor: "white"}}>
            {setData != null && (
                <img src={setData.images.logo} id="setLogo" style={setLogoStyle}/>
            )}
            <div id='cardContainer' style={cardContainerStyle}>
                {cardImages && cardImages.map((image, index) => {
                    if(index >= cardNumber){
                        return null
                    }
                    return <img key={index} src={image} className='cardImage' style={{...cardImageStyle,...rotationEffect(index)}}/>
                })}
            </div>
        </div>
    )

}

export default SetPresentation;
