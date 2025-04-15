import config from "../config.js";

const baseHeaders = {
    "Content-Type": "application/json",
}

const extractInfoFromJWT = (token) => {
    return JSON.parse(atob(token.split('.')[1]))
}

const pokapiDAO = {
    types: null,
    rarities: null,
    sets: null,
    fetchPokemonPresentation : async(cardId) => {
        let text = await fetch(`http://localhost:8083/api/v0/presentation/${cardId}`, {
            method: "GET",
            headers : {
                ...baseHeaders,
                "Authentification-Token": localStorage.getItem("token")
            }
        })
        return await text.json()
    },
    fetPokemonResponse : async(cardId,message,previous) => {
        const text = await fetch(`http://localhost:8083/api/v0/pokemonResponse/${cardId}`,{
            method : "POST",
            headers : {
                ...baseHeaders,
                "Authentification-Token": localStorage.getItem("token")
            },
            body : JSON.stringify({
                "message" : message,
                "previous" : JSON.stringify(previous)
            })
        })
        return await text.json()
    },
    openBooster : async (setId)=>{
        let cards = await fetch(config.url + `/open-booster/${setId}`, {
            method: "GET",
            headers : {
                ...baseHeaders,
                "Authentification-Token": localStorage.getItem("token")
            }
        })
        return await cards.json()
    },
    fetchMyCards: async () => {
        let cards = await fetch(config.url + "/my-cards", {
            method: "GET",
            headers : {
                ...baseHeaders,
                "Authentification-Token": localStorage.getItem("token")
            }
        })
        return await cards.json()
    },
    fetchSets: async () => {
        if (pokapiDAO.sets === null) {
            let allSets = await fetch(config.url + "/sets", {
                method: "GET",
                headers: baseHeaders
            })
            pokapiDAO.sets = await allSets.json()
        }
        return pokapiDAO.sets
    },
    fetchRarities: async () => {
        if (pokapiDAO.rarities === null) {
            let allRarities = await fetch(config.url + "/rarities", {
                method: "GET",
                headers: baseHeaders
            })
            pokapiDAO.rarities = await allRarities.json()
        }
        return pokapiDAO.rarities
    },
    fetchTypes: async () => {
        if (pokapiDAO.types === null) {
            let allTypes = await fetch(config.url + "/types", {
                method: "GET",
                headers: baseHeaders
            })
            pokapiDAO.types = await allTypes.json()
        }
        return pokapiDAO.types
    },
    fetchCard: async (cardId) => {
        let card = await fetch(config.url + "/my-cards/" + cardId, {
            method: "GET",
            headers : {
                ...baseHeaders,
                "Authentification-Token": localStorage.getItem("token")
            }
        });
        return await card.json();
    },
    fetchInfo: async () => {
        const response = await fetch(config.url + "/info",{
            method:"GET",
            headers : {
                ...baseHeaders,
                "Authentification-Token": localStorage.getItem("token")
            }
        })
        if (response.status === 200) {
            return await response.json()
        } else {
            console.log(response.status)
        }
    },
    fetchSetPresentation : async(setId)=>{
        const result = await fetch(config.url+"/set/presentation/"+setId,{
            method : "GET",
            headers: baseHeaders
        })
        if(result.status === 200){
            return await result.json()
        }else{
            console.log(result.status)
        }
    },
    fetchAuthentication: async ()=> {
        if (localStorage.getItem("token") !== null) {
            const result = await fetch(config.url+"/login",{
                method : "post",
                headers : {
                    ...baseHeaders,
                    "Authentification-Token": localStorage.getItem("token")
                }
            })
            if (result.status === 200) {
                localStorage.setItem("token", (await result.json()).token)
                return true
            }
        }
        return false
    },
    fetchLogin: async (login, password) => {
        const response = await fetch(config.url+"/login",{
            method: "POST",
            headers: baseHeaders,
            body : JSON.stringify({
                login: login,
                password: password
            })
        })
        if(response.status === 200) {
            localStorage.setItem("token", (await response.json()).token)
            return true
        } else if (response.status === 401) {
            return false
        }
        throw new Error(`${response.status} : ${response.statusText}`)
    },
    fetchRegister: async (login, pseudo, password) => {
        const response = await fetch(config.url+"/register",{
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
        const response = await fetch(config.url+"/update",{
            method:"PUT",
            headers: baseHeaders,
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
        const response = await fetch(config.url+"/searched",{
            method:"GET",
            headers: {
                ...baseHeaders,
                "Authentification-Token": localStorage.getItem("token")
            },
        })
        if(response.status == 200){
            return await response.json()
        }
    }
}

export default pokapiDAO