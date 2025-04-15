import {fetchAPI, url} from "./utility.js";

// URL
const urlRarities = url+"rarities"

// DAO
const raritiesFetchDAO = {
    findAll: async () => {
        let response = await fetchAPI(urlRarities)
        if (response.ok) return (await response.json()).data
        throw new Error("API error")
    }
}

export default raritiesFetchDAO