'use strict'

import cardDAO from "../dao/cardDAO.js"
import cardFetchDAO from "../dao/cardFetchDAO.js"
import CONFIG from "../../const.js"
import setDAO from "../dao/setDAO.js"
import setFetchDAO from "../dao/setFetchDAO.js"
import setController from "./setController.js"

// This object stores the date of
// last update of each set if it
// has already been fetch from the API
const setsUpdates = {}

const cardController = {
    findCard: async (id) => {
        // FONCTIONNEMENT [CACHE] :
        /*
            1. Récupérer la carte depuis la BD
            2. Si elle n'existe pas ou la date de dernière mise à jour > 1j
                2.1. Récupérer la carte depuis l'API
                2.2. L'ajouté à la BD
                2.3. Retourner la carte [END]
            3. Sinon
                3.1. Retourner la carte [END]
         */
        const localCard = await cardDAO.findCardByID(id)
        if (localCard != null) {
            if ((parseInt(Date.now()/1000) - localCard.storageDate) < CONFIG.CACHE_EXPIRATION) {
                return localCard
            } else { // Si le cache a expiré
                let newCard = await cardFetchDAO.findCardById(id)
                return cardDAO.updateCard(id,newCard)
            }
        } else {
            let fetchedCard = await cardFetchDAO.findCardById(id)
            if (fetchedCard == null) {
                throw new Error("Card not found")
            }
            return await cardDAO.addOneCard(fetchedCard)
        }
    },
    findCards: async (ids) => {
        // FONCTIONNEMENT [CACHE] :
        /*
            1. Récupérer toutes les cartes depuis la BD
            2. Identifié celles qui n'existe pas ou la date de dernière mise à jour > 1j
            3. Pour toutes ces cartes fetch API
            4. Puis ajout BD
            5. Retourner toutes les cartes depuis la BD [END]
         */
        const localCards = await cardDAO.findCards(ids)
        let result = []
        let toFetchUpdate = []
        let toFetchAdd = []

        for (const id of ids) {
            if (localCards.some((card) => card.id === id)) {
                let correspondingCard = localCards.find((local) => local.id === id)
                if (((Date.now()/1000) - correspondingCard.storageDate) < CONFIG.CACHE_EXPIRATION) {
                    result.push(correspondingCard)
                } else {
                    toFetchUpdate.push(id)
                }
            } else {
                toFetchAdd.push(id)
            }
        }

        let fetchedCards = await cardFetchDAO.findCardsByID(toFetchAdd.concat(toFetchUpdate))
        for (const fetchedCard of fetchedCards) {
            if (toFetchAdd.includes(fetchedCard.id)) {
                result.push(await cardDAO.addOneCard(fetchedCard))
            } else if (toFetchUpdate.includes(fetchedCard.id)) {
                result.push(await cardDAO.updateCard(fetchedCard.id, fetchedCard))
            }
        }

        return result
    },
    findSetCards: async (id) => {
        // FONCTIONNEMENT [CACHE] :
        /*
            1. Vérifier la présence et la dernière date de mise à jour du set
            2. Si c'est bon → Récupérer toutes les cartes du set depuis la BD puis return [END]
            3. Si ce n'est pas bon → Récupérer toutes les cartes du set depuis l'API
                3.1. Ajouter à la BD
                3.2. Update la date de mise à jour
                3.3 Retourner les cartes [END]
         */
        let localSet = await setDAO.find(id)
        if (localSet != null) {
            if ((parseInt(Date.now()/1000) - localSet.storageDate) > CONFIG.CACHE_EXPIRATION) {
                // Si le cache a expiré
                localSet = await setDAO.update(id, await setFetchDAO.find(id))
            }
        } else {
            localSet = await setDAO.add(await setFetchDAO.find(id))
        }
        const localCards = await cardDAO.findCardsBySet(localSet.id)
        const localIds = new Set(localCards.map(card=>card.id))
        if(localCards.filter(card => (parseInt(Date.now()/1000) - card.storageDate) < CONFIG.CACHE_EXPIRATION).length < localSet.total){
            let allSetCards = await cardFetchDAO.findSetCards(localSet.id)
            return [
                ...(await cardDAO.updateCards(allSetCards.filter(card => localIds.has(card.id)))),
                ...(await cardDAO.addManyCards(allSetCards.filter(card => !localIds.has(card.id))))
            ]
        } else {
            return localCards
        }
    },
    setPresentation: async (id) => {
        const set = await setController.find(id)
        let setCards = await cardController.findSetCards(id)
        const cards = []
        while(cards.length < 3){
            const randomIndex = parseInt(Math.random() * (setCards.length-1))
            cards.push(setCards[randomIndex])
            setCards.splice(randomIndex,1)
        }
        return {
            set : set,
            images : cards.map((card)=>card.images)
        }
    },
    findEvolution: async (id) => {
        // FONCTIONNEMENT :
        /*
            1. Appeler findCard du controller pour récupérer le setId
            2. Appeler findSetCards du controller
            3. Retourner toutes les évolutions possibles [END]
         */
        const card = await cardController.findCard(id)
        if(card.evolvesTo == null){
            return null
        }
        return await cardController.findByName(card.set.id,card.evolvesTo[0])
    },
    findByName : async(setId,name)=>{
        const localCard = await cardDAO.findCardByName(setId,name)
        if (localCard != null) {
            if((parseInt(Date.now()/1000) - localCard.storageDate) < CONFIG.CACHE_EXPIRATION) {
                return localCard
            } else { // Si le cache a expiré
                let newCard = await cardFetchDAO.findCardByName(setId,name)
                return cardDAO.updateCard(newCard.id,newCard)
            }
        } else {
            return await cardDAO.addOneCard(await cardFetchDAO.findCardByName(setId,name))
        }
    },
    openBooster: async (setId) => {
        // FONCTIONNEMENT :
        /*
            1. Appeler findSetCards du controller
            2. Retourner 5 cartes au hasard [END]
         */
        let allCards = await cardController.findSetCards(setId)
        let result = []
        for(let i = 0;i<5;i++){
            const index = parseInt(Math.random()*(allCards.length-1))
            result.push(allCards[index])
            allCards.splice(index,1)
        }
        return result
    },
    deckPrice: async (ids) => {
        // FONCTIONNEMENT :
        /*
            1. Appeler findCards du controller
            2. Additionner les prix
            3. Retourner le prix total [END]
         */
        let cards = []
        for (const id of ids) {
            let res = await cardController.findCard(id)
            cards.push(res)
        }
        let prix_total = 0

        cards.forEach((card) => {
            prix_total+= card.cardmarket.prices.trendPrice
        })

        return prix_total
    }
}

export default cardController