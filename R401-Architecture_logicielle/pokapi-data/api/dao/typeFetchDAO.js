import {fetchAPI, url} from "./utility.js";

// URL
const urlType = url+"types"

// DAO
const typeFetchDAO = {
    findAll: async () => {
        let response = await fetchAPI(urlType)
        if (response.ok) return (await response.json()).data
        throw new Error("API error")
    }
}

export default typeFetchDAO