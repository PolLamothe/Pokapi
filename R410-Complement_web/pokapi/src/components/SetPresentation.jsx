import React, { useState,useEffect } from 'react';
import dao from "../dao/pokapiDAO.js"
import {useNavigate} from "react-router";
import config from '../config.js';

const SetPresentation = ({setId,displayState,middleState}) => {
    const [setData,setSetData] = useState(null)

    const [cardImages,setCardImages] = useState(null)

    const [everDisplayer,setEverDisplayed] = useState(false)

    const [middleStyle,setMiddleStyle] = useState({})

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const [cardNumber,setCardNumber] = useState(4)

    const [loadCount,setLoadCount] = useState(0)

    const [setLogoStyle,setSetLogoStyle] = useState({
        height : "10vh",
        maxWidth : "90%",
        marginLeft : "50%",
        transform : "translateX(-50%)",
        marginBottom : "5vh",
        objectFit : "contain",
    })

    const navigateToSet = useNavigate()

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
        if(middleState && windowSize > 600){
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
        height : "40vh",
        cursor: "pointer"
    }
    
    var cardContainerStyle = {
        display : "flex",
        flexDirection : "row",
        width : "fit-content",
        paddingLeft : "15%",
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

    var loaderStyle = {
        position : "absolute",
        top : "50%",
        left : "50%",
        transform : "translate(-50%,-50%)",
    }

    const [loadImageStyle,setLoadImageStyle] = useState({
        width : "10vw",
        animation : "spinning .9s ease infinite",
    })

    useEffect(()=>{
        let tempSetLogoStyle = {...setLogoStyle}
        let tempLoadImageStyle = {...loadImageStyle}
        if(windowSize < 1000 && windowSize > 600){
            tempSetLogoStyle["width"] = "90%"
    
            cardImageStyle["width"] = "40%"
    
            containerStyle["marginLeft"] = "4vw"
            containerStyle["height"] = "35vh"
            tempLoadImageStyle["width"] = "10vw"
        }else if (windowSize > 1000 && windowSize < 1500) {
            containerStyle["marginLeft"] = "4vw"
            tempLoadImageStyle["width"] = "10vw"
        } else if(windowSize > 1500) {
            containerStyle["marginLeft"] = "4vw"
            tempLoadImageStyle["width"] = "10vw"
        } else if(windowSize <= 600){
            containerStyle["height"] = "45vh"
            tempLoadImageStyle["width"] = "40vw"
        }
        setSetLogoStyle(tempSetLogoStyle)
        setLoadImageStyle(tempLoadImageStyle)
    },[windowSize])

    return (
        <div id='container' style={{...middleStyle,...containerStyle,backgroundColor: "white"}} onClick={()=> navigateToSet(`/set/${setData.id}`)}>
            {setData != null && (
                <img src={setData.images.logo} id="setLogo" 
                style={setLogoStyle} onLoad={()=>setLoadCount(loadCount => loadCount+1)}/>
            )}
            <div id='cardContainer' style={cardContainerStyle}>
                {cardImages && cardImages.map((image, index) => {
                    if(index >= cardNumber){
                        return null
                    }
                    return <img key={index} src={image} className='cardImage' 
                    style={{...cardImageStyle,...rotationEffect(index)}}
                    onLoad={()=>setLoadCount(loadCount => loadCount+1)}/>
                })}
                {loadCount < cardNumber && (
                    <div style={loaderStyle}>
                        <img src={config.base+"/masterball.png"} style={{...loadImageStyle}}/>
                    </div>
                )}
            </div>
        </div>
    )

}

export default SetPresentation;
