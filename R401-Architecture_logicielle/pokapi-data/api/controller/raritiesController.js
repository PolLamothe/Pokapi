'use strict'

import raritiesFetchDAO from "../dao/raritiesFetchDAO.js";
import raritiesDAO from "../dao/raritiesDAO.js";
import CONFIG from "../../const.js"

let lasUpdate = null

const raritiesController = {
    findAll: async () => {
        if (lasUpdate == null || (parseInt(Date.now()/1000) - lasUpdate) > CONFIG.CACHE_EXPIRATION) {
            await raritiesDAO.deleteAll()
            let raritiesAPI = await raritiesFetchDAO.findAll()
            await raritiesDAO.addMany(raritiesAPI)
            lasUpdate = parseInt(Date.now()/1000)
            return await raritiesDAO.findAll()
        } else {
            return await raritiesDAO.findAll()
        }
    }
}

export default raritiesController