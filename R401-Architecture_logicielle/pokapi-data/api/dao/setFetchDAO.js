import {SetInfo} from "../model/SetInfo.js";
import {fetchAPI, url} from "./utility.js";

// URL
const urlCard = url+"sets"

// DAO
const setFetchDAO = {
    findAll: async () => {
        // TODO: Récupère tous les sets : https://api.pokemontcg.io/v2/sets
        // Return un tableau d'objet setInfo
    }
}

export default setFetchDAO