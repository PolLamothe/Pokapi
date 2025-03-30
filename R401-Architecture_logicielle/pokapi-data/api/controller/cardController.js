'use strict'

import cardDAO from "../dao/cardDAO.js"
import cardFetchDAO from "../dao/cardFetchDAO.js"
import  CONFIG  from "../../const.js"

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
        if(localCard != null){
            if(((Date.now()/1000) - localCard.storageDate) < CONFIG.CACHEEXPIRATION){
                return localCard
            }else{//si le cache a expiré
                var newCard = await cardFetchDAO.findCardById(id)
                return cardDAO.updateCard(id,newCard)
            }
        }else{
            return await cardDAO.addOneCard((await cardFetchDAO.findCardById(id)))

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
        localCards.forEach(async localCard => {
            if(localCard != null){
                if(((Date.now()/1000) - localCard.storageDate) < CONFIG.CACHEEXPIRATION){
                    result.push(localCard)
                }else{//si le cache a expiré
                    var newCard = await cardFetchDAO.findCardById(id)
                    result.push(cardDAO.updateCard(id,newCard))
                }
            }else{
                result.push(await cardDAO.addOneCard((await cardFetchDAO.findCardById(id))))
    
            } 
        });
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
    },
    setPresentation: async (id) => {
        // FONCTIONNEMENT :
        /*
            1. Appeler findSetCards du controller
            2. Récupérer 1 setInfo et 3 images de cartes [END]
         */
    },
    findEvolution: async (id) => {
        // FONCTIONNEMENT :
        /*
            1. Appeler findCard du controller pour récupérer le setId
            2. Appeler findSetCards du controller
            3. Retourner toutes les évolutions possibles [END]
         */
    },
    openBooster: async (setId) => {
        // FONCTIONNEMENT :
        /*
            1. Appeler findSetCards du controller
            2. Retourner 5 cartes au hasard [END]
         */
    },
    deckPrice: async (ids) => {
        // FONCTIONNEMENT :
        /*
            1. Appeler findCards du controller
            2. Additionner les prix
            3. Retourner le prix total [END]
         */
    }
}

export default cardController