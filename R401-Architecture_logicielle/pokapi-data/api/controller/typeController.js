'use strict'

import typeDAO from "../dao/typeDAO.js";
import typeFetchDAO from "../dao/typeFetchDAO.js";
import CONFIG from "../../const.js"

let lasUpdate = null

const typeController = {
    findAll: async () => {
        if (lasUpdate == null || (parseInt(Date.now()/1000) - lasUpdate) > CONFIG.CACHE_EXPIRATION) {
            await typeDAO.deleteAll()
            let typeAPI = await typeFetchDAO.findAll()
            await typeDAO.addMany(typeAPI)
            lasUpdate = parseInt(Date.now()/1000)
            return await typeDAO.findAll()
        } else {
            return await typeDAO.findAll()
        }
    }
}

export default typeController