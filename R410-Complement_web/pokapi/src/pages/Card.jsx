import {useParams} from "react-router";

function Card() {
    let params = useParams()

    return (
        <>
            <h3>Voir les détails d'une carte : {params.cardId}</h3>
        </>
    )
}

export default Card;