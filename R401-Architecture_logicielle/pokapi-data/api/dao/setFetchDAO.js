import {SetInfo} from "../model/SetInfo.js";
import {fetchAPI, url} from "./utility.js";

// URL
const urlSet = url+"sets"

// DAO
const setFetchDAO = {
    find : async(id)=>{
        const response = await fetchAPI(urlSet+"/"+id)
        if (response.ok){
            const data = (await response.json())["data"]
            return new SetInfo(data)
        }
        return null
    },
    findAll: async () => {
        let response = await fetchAPI(urlSet)
        let json = await response.json()
        return json.data.map(s =>  new SetInfo(s))
    }
}

export default setFetchDAO