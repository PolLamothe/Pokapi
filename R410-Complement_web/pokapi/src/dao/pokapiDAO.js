import config from "../config.js";

const baseHeaders = {
    "Content-Type": "application/json",
}

const athenticationHeader = () => (
    {"Authorization": "Bearer " + localStorage.getItem("token")}
)

const extractInfoFromJWT = (token) => {
    return JSON.parse(atob(token.split('.')[1]))
}

const pokapiDAO = {
    types: null,
    rarities: null,
    sets: null,
    fetchPokemonPresentation : async(cardId) => {
        let text = await fetch(config.url + `/openai/presentation/${cardId}`, {
            method: "GET",
            headers : {
                ...baseHeaders,
                ...athenticationHeader()
            }
        })
        return await text.json()
    },
    fetPokemonResponse : async(cardId,message,previous) => {
        const text = await fetch(config.url + `/openai/pokemonResponse/${cardId}`,{
            method : "POST",
            headers : {
                ...baseHeaders,
                ...athenticationHeader()
            },
            body : JSON.stringify({
                "message" : message,
                "previous" : JSON.stringify(previous)
            })
        })
        return await text.json()
    },
    openBooster : async (setId)=>{
        let cards = await fetch(config.url + `/user/open-booster/${setId}`, {
            method: "GET",
            headers : {
                ...baseHeaders,
                ...athenticationHeader()
            }
        })
        return await cards.json()
    },
    fetchMyCards: async () => {
        let cards = await fetch(config.url + "/user/my-cards", {
            method: "GET",
            headers : {
                ...baseHeaders,
                ...athenticationHeader()
            }
        })
        return await cards.json()
    },
    fetchSets: async () => {
        if (pokapiDAO.sets === null) {
            let allSets = await fetch(config.url + "/data/sets", {
                method: "GET",
                headers: baseHeaders
            })
            pokapiDAO.sets = await allSets.json()
        }
        return pokapiDAO.sets
    },
    fetchRarities: async () => {
        if (pokapiDAO.rarities === null) {
            let allRarities = await fetch(config.url + "/data/rarities", {
                method: "GET",
                headers: baseHeaders
            })
            pokapiDAO.rarities = await allRarities.json()
        }
        return pokapiDAO.rarities
    },
    fetchTypes: async () => {
        if (pokapiDAO.types === null) {
            let allTypes = await fetch(config.url + "/data/types", {
                method: "GET",
                headers: baseHeaders
            })
            pokapiDAO.types = await allTypes.json()
        }
        return pokapiDAO.types
    },
    fetchCard: async (cardId) => {
        let card = await fetch(config.url + "/user/my-cards/" + cardId, {
            method: "GET",
            headers : {
                ...baseHeaders,
                ...athenticationHeader()
            }
        });
        return await card.json();
    },
    fetchInfo: async () => {
        const response = await fetch(config.url + "/user/info",{
            method:"GET",
            headers : {
                ...baseHeaders,
                ...athenticationHeader()
            }
        })
        if (response.status === 200) {
            return await response.json()
        } else {
            console.log(response.status)
        }
    },
    fetchSetPresentation : async(setId)=>{
        const result = await fetch(config.url+"/data/set/presentation/"+setId,{
            method : "GET",
            headers: baseHeaders
        })
        if(result.status === 200){
            return await result.json()
        }else if (result.status === 404) {
            let content = await result.json()
            console.log("Not found : ", content.message)
            return content
        } else {
            console.log(result.status)
        }
    },
    fetchSet : async(setId) => {
        const result = await fetch(config.url + "/data/set/"+setId, {
            method : "GET",
            headers: baseHeaders
        })
        if(result.status === 200) {
            return await result.json()
        } else
            console.log(result.status)
    },
    fetchSetsCards : async(setId) => {
        const result = await fetch(config.url + "/data/set/cards/"+setId, {
            method : "GET",
            headers : baseHeaders
        })
        if(result.status === 200) {
            return await result.json()
        } else
            console.log(result.status)
    },
    fetchAuthentication: async ()=> {
        if (localStorage.getItem("token") !== null) {
            const result = await fetch(config.url+"/user/login",{
                method : "post",
                headers : {
                    ...baseHeaders,
                    ...athenticationHeader()
                }
            })
            if (result.status === 200) {
                localStorage.setItem("token", (await result.json()).token)
                return true
            }
        }
        localStorage.removeItem("token")
        return false
    },
    fetchLogin: async (login, password) => {
        const response = await fetch(config.url+"/user/login",{
            method: "POST",
            headers: baseHeaders,
            body : JSON.stringify({
                login: login,
                password: password
            })
        })
        if(response.status === 200) {
            let newToken = await response.json()
            localStorage.setItem("token", newToken.token)
            return true
        } else if (response.status === 401) {
            return false
        }
        throw new Error(`${response.status} : ${response.statusText}`)
    },
    fetchRegister: async (login, pseudo, password) => {
        const response = await fetch(config.url+"/user/register",{
            method:"POST",
            headers: baseHeaders,
            body : JSON.stringify({
                login: login,
                pseudo: pseudo,
                password: password
            })
        })
        if(response.status === 200) {
            localStorage.setItem("token", (await response.json()).token)
            return true
        }
        throw new Error((await response.json()).message)
    },
    fetchUpdate: async (pseudo, password) => {
        const response = await fetch(config.url+"/user/update",{
            method:"PUT",
            headers: {
                ...baseHeaders,
                ...athenticationHeader()
            },
            body: JSON.stringify({
                pseudo: pseudo,
                password: password
            })
        })
        if(response.status === 200) {
            const newToken = (await response.json()).token
            localStorage.setItem("token", newToken)
            return extractInfoFromJWT(newToken)
        }
        throw new Error((await response.json()).message)
    },
    fetchSearched : async ()=>{
        const response = await fetch(config.url+"/user/searched",{
            method:"GET",
            headers: {
                ...baseHeaders,
                ...athenticationHeader()
            },
        })
        if(response.status === 200) {
            return await response.json()
        }
    },
    addInSearched : async (cardId)=>{
        await fetch(config.url+"/user/searched/add",{
            method:"POST",
            headers: {
                ...baseHeaders,
                ...athenticationHeader()
            },
            body : JSON.stringify({
                id : cardId
            })
        })
    },
    fetchCards : async(cardsId)=>{
        const response = await fetch(config.url+"/data/cards",{
            method : "POST",
            headers : baseHeaders,
            body : JSON.stringify({cards : cardsId})
        })
        if(response.status == 200){
            return await response.json()
        }
    }
}

export default pokapiDAO