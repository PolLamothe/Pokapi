import CONFIG from "../../const.js";
import {fetchAPI} from "./utility.js";

export const pokapiDataDAO = {
    openBooster: async (setId) => {
        const url = `${CONFIG.POKAPI_DATA_URL}/open-booster/${setId}`
        const res = await fetchAPI(url)
        if (res.ok) {
            return await res.json()
        }
        throw new Error(`Can't fetch Pokapi-data API : ${res.status} ${res.statusText}`)
    },
    fetchCards: async (cardIds) => {
        const url = `${CONFIG.POKAPI_DATA_URL}/cards`
        const res = await fetchAPI(url, "POST", {cards: cardIds})
        if (res.ok) {
            return await res.json()
        }
        throw new Error(`Can't fetch Pokapi-data API : ${res.status} ${res.statusText}`)
    }
}