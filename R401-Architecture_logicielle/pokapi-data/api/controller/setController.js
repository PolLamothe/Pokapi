'use strict'

import setDAO from "../dao/setDAO.js"
import setFetchDAO from "../dao/setFetchDAO.js"
import CONFIG from "../../const.js"

let lasUpdate = null

const setController = {
    find : async (id)=> {
        const localSet = await setDAO.find(id)
        if (localSet != null) {
            if ((parseInt(Date.now()/1000) - localSet.storageDate) < CONFIG.CACHE_EXPIRATION) {
                return localSet
            } else { // Si le cache a expiré
                let newSet = await setFetchDAO.find(id)
                return await setDAO.update(id,newSet)
            }
        } else {
            const fetchedSet = await setFetchDAO.find(id)
            if (fetchedSet == null) {
                throw new Error("Set not found")
            }
            return await setDAO.add(fetchedSet)
        }
    },
    findAll: async () => {
        // FONCTIONNEMENT [CACHE] :
        /*
            1. Vérifier lastUpdate
            2. Si >1j
                2.1. Récupérer les sets depuis l'API
                2.2. Les ajouter à la BD
                2.3. Retourner les sets [END]
            3. Sinon
                3.1. Récupérer les sets de la BD
                3.1. Retourner les sets [END]
         */
        if (lasUpdate == null || (parseInt(Date.now()/1000) - lasUpdate) > CONFIG.CACHE_EXPIRATION) {
            let setsAPI = await setFetchDAO.findAll()
            await setDAO.addMany(setsAPI)
            lasUpdate = parseInt(Date.now()/1000)
            return await setDAO.findAll()
        } else {
            return await setDAO.findAll()
        }
    }
}

export default setController