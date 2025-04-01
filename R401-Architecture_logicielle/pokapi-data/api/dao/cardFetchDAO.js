import {Card} from "../model/Card.js";
import {fetchAPI, url} from "./utility.js";

// URL
const urlCard = url+"cards"

// DAO
const cardFetchDAO = {
    findCardById : async (id)=> {
        let response = await fetchAPI(urlCard+`/${id}`)
        let json = await response.json()
        return new Card(json.data)
    },
    findCardsByID : async (ids) => {
        let resultat = [];
        for (let i = 0; i < ids.length; i += 250) {
             resultat.push(ids.slice(i, i + 250))
        }

        let Cards = []
        for (let j = 0; j < resultat.length; j++) {
            let ajoutUrl = '?q=('
            for (let i = 0; i < resultat[j].length; i++) {
                if (i === 0) {
                    ajoutUrl = ajoutUrl + `id:${resultat[j][i]}`
                } else {
                    ajoutUrl = ajoutUrl + ` OR id:${resultat[j][i]}`
                }

            }
            ajoutUrl = ajoutUrl + ')'

            let response = await fetchAPI(urlCard + ajoutUrl)
            let json = await response.json()
            let data = json.data.map(e => new Card(e))
            Cards.push(...data)
        }

        return Cards

    },
    findCardByName : async (setId,name)=>{
        let response = await fetchAPI(urlCard+`?q=name:"${name}" set.id:${setId}`)
        let json = await response.json()
        return new Card(json.data[0])
    },
    findSetCards: async (id) => {
        let response = await fetchAPI(urlCard + `?q=set.id:${id}`)
        let json = await response.json()
        return json.data.map(e =>  new Card(e))
    },
}

export default cardFetchDAO