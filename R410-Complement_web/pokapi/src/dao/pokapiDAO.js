import config from "../config.js";

const pokapiDAO = {
    types: null,
    rarities: null,
    sets: null,
    fetchMyCards: async () => {
        let cards = await fetch(config.url + "/my-cards", {
            method: "GET",
            headers : {
                "Authentification-Token": localStorage.getItem("token")
            }
        })
        return await cards.json()
    },
    fetchSets: async () => {
        if (pokapiDAO.sets === null) {
            let allSets = await fetch(config.url + "/sets", {
                method: "GET"
            })
            pokapiDAO.sets = await allSets.json()
        }
        return pokapiDAO.sets
    },
    fetchRarities: async () => {
        if (pokapiDAO.rarities === null) {
            let allRarities = await fetch(config.url + "/rarities", {
                method: "GET"
            })
            pokapiDAO.rarities = await allRarities.json()
        }
        return pokapiDAO.rarities
    },
    fetchTypes: async () => {
        if (pokapiDAO.types === null) {
            let allTypes = await fetch(config.url + "/types", {
                method: "GET"
            })
            pokapiDAO.types = await allTypes.json()
        }
        return pokapiDAO.types
    },
    fetchCard: async (cardId) => {
        let card = await fetch(config.url + "/my-cards/" + cardId, {
            method: "GET",
            headers : {
                "Authentification-Token": localStorage.getItem("token")
            }
        });
        return await card.json();
    },
    fetchInfo: async () => {
        const response = await fetch(config.url + "/info",{
            method:"GET",
            headers : {
                "Authentification-Token": localStorage.getItem("token")
            }
        })
        if (response.status === 200) {
            return await response.json()
        } else {
            console.log(response.status)
        }
    }
}

export default pokapiDAO