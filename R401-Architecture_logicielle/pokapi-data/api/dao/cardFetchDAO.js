import HttpsProxyAgent from 'https-proxy-agent';
import CONFIG from "../../const.js";
import {Card} from "../model/Card.js";

// Proxy configuration
let agent = null
if (CONFIG.PROXY !== undefined) {
    console.log(`PROXY DAO > Le proxy est ${CONFIG.PROXY}`)
    agent =  new HttpsProxyAgent(CONFIG.PROXY);
} else {
    console.log("PROXY DAO > Pas de proxy trouvé")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// URL
const url = "https://api.pokemontcg.io/v2/"
const urlCard = url+"cards/"

function fetchAPI(fetchUrl) {
    const fields = {
        method: "GET",
    }
    if (agent !== null) fields.agent = agent
    if (CONFIG.API_POKEMON_KEY !== undefined) fields.headers = {"X-Api-Key": CONFIG.API_POKEMON_KEY}
    return fetch(fetchUrl, fields)
}

// DAO
const cardFetchDAO = {
    findCardById : async (id)=> {
        let response = await fetchAPI(urlCard+`${id}`)
        let json = await response.json()
        return new Card(json.data)
    },
    findCardsByID : async (ids) => {
        // TODO: récupérer toutes les cartes à partir d'un tableau d'IDs
    },
    findSetCards: async (id) => {
        // TODO: récupérer toutes les cartes d'un set
    },
    findSets: async () => {
        // TODO: Récupère tous les sets : https://api.pokemontcg.io/v2/sets
        // Return un tableau d'objet setInfo
    },
    findSetPresentation: async (id) => {
        // TODO: Récupère 4 cartes d'un set en fonction de son id renvoie un tableau de cartes
        // https://api.pokemontcg.io/v2/cards?q=set.id:sv6pt5&pageSize=4
    }
}

export default cardFetchDAO