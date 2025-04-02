import React, { useState,useEffect } from 'react';
import config from "../config.js"
import dao from "../dao/pokapiDAO.js"

const SetPresentation = ({setId}) => {
    const [setData,setSetData] = useState(null)

    const [cardImages,setCardImages] = useState(null)

    useEffect(()=>{
        async function retrieveSetData(){
            const resultJSON = await dao.fetchSetPresentation(setId)
            setSetData(resultJSON.set)
            setCardImages(resultJSON.images)
        }
        retrieveSetData()
    },[setSetData,setCardImages])

    return (
        <div>
            {setData != null && (
                <img src={setData.images.logo} id="setLogo" style={setLogoStyle}/>
            )}
            <div id='cardContainer' style={cardContainerStyle}>
                {cardImages && cardImages.map((image, index) => (
                    <img key={index} src={image} className='cardImage' style={{...cardImageStyle,...rotationEffect(index)}}/>
                ))}
            </div>
        </div>
    )
};

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
}

const rotationEffect = (index)=>{
    const degrees = ["-15","-5","5","15"]
    const translates = ["5","0","0","5"]

    return {
        transform : `rotate(${degrees[index]}deg) translateY(${translates[index]}%)`,
    }
}

const cardImageStyle = {
    width : "32.5%",
    marginLeft : "-10%",
}

export default SetPresentation;
