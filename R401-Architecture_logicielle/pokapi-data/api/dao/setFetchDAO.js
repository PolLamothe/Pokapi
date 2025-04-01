import {SetInfo} from "../model/SetInfo.js";
import {fetchAPI, url} from "./utility.js";

// URL
const urlSet = url+"sets"

// DAO
const setFetchDAO = {
    find : async(id)=>{
        const data = (await (await fetchAPI(urlSet+"/"+id)).json())["data"]
        return new SetInfo(data)
    },
    findAll: async () => {
        let response = await fetchAPI(urlSet)
        let json = await response.json()
        return json.data.map(s =>  new SetInfo(s))
    }
}

export default setFetchDAO