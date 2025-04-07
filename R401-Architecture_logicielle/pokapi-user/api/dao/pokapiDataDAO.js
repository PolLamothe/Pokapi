import CONFIG from "../../const.js";
import {fetchAPI} from "./utility.js";

export const pokapiDataDAO = {
    openBooster: async (setId) => {
        const url = `${CONFIG.POKAPI_DATA_URL}/open-booster/${setId}`
        const res = await fetchAPI(url)
        if (res.ok) {
            return await res.json()
        } else if (res.status === 400) {
            throw new Error(`This set does not exist`)
        }
        throw new Error(`Can't fetch Pokapi-data API : ${res.status} ${res.statusText}`, {cause: "API_ERROR"})
    },
    fetchCards: async (cardIds) => {
        const url = `${CONFIG.POKAPI_DATA_URL}/cards`
        const res = await fetchAPI(url, "POST", {cards: cardIds})
        if (res.ok) {
            return await res.json()
        }
        throw new Error(`Can't fetch Pokapi-data API : ${res.status} ${res.statusText}`, {cause: "API_ERROR"})
    },
    fetchCard: async (cardId) => {
        const url = `${CONFIG.POKAPI_DATA_URL}/card/${cardId}`
        const res = await fetchAPI(url)
        if (res.ok) {
            return await res.json()
        }
        throw new Error(`Can't fetch Pokapi-data API : ${res.status} ${res.statusText}`, {cause: "API_ERROR"})
    }
}