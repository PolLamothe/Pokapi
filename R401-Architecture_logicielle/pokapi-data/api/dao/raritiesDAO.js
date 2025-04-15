'use strict';

import {mongoose} from 'mongoose';
import {projection} from "./utility.js";

const raritiesModel = mongoose.model("Rarities", new mongoose.Schema({
    name: String,
}))

const raritiesDAO = {
    findAll: async () => {
        const allRarities = await raritiesModel.find({}, projection)
        return allRarities.map(r => r.name)
    },
    deleteAll: async () => {
        await raritiesModel.deleteMany({})
    },
    addMany: async (rarities) => {
        const allRarities = await raritiesDAO.findAll()
        for (let r of rarities) {
            if (typeof r === 'string') {
                if (!allRarities.some(bdRarity => bdRarity.name === r)) {
                    await raritiesModel.insertOne({name: r})
                }
            }
        }
    }
}

export default raritiesDAO;