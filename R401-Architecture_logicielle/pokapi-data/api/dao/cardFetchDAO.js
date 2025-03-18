import HttpsProxyAgent from 'https-proxy-agent';
import CONFIG from "../../const.js";
import {Card} from "../model/Card.js";

let agent = null
if (CONFIG.PROXY != undefined) {
    console.log(`Le proxy est ${CONFIG.PROXY}`)
    agent =  new HttpsProxyAgent(CONFIG.PROXY);
}
else {
    //pour pouvoir consulter un site avec un certificat invalide
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.log("Pas de proxy trouvé")
}


const url = "https://api.pokemontcg.io/v2/"
const urlCard = url+"cards/"

const cardFetchDAO = {
    // TODO : Faire le DAO qui récupère les données de l'API
    findById : async (id)=> {
        let response = await fetch(urlCard+`${id}`)
        let json = await response.json()
        return new Card(json.data)
    }
}

export default cardFetchDAO