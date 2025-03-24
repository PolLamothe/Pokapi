'use strict'

let lasUpdate = null

const setController = {
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
    }
}

export default setController