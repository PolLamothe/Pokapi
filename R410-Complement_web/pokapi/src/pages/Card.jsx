import {useParams} from "react-router";
import { useState,useEffect } from "react";
import config from "../config";

function Card() {
    let params = useParams()

    let [cardData,setCardData] = useState({})

    useEffect(() => {
        const fetchCardData = async () => {
            let card = await fetch(config.url + "/card/" + params.cardId, {
                method: "GET"
            });
            let cardJSON = await card.json();
            setCardData(cardJSON);
        };
        fetchCardData();
    }, [params.cardId, setCardData]);

    return (
        <>
            <h3>Voir les détails d'une carte : {params.cardId}</h3>
            <p>{JSON.stringify(cardData)}</p>
        </>
    )
}

export default Card;