'use strict';

import {mongoose} from 'mongoose';
import {projection} from "./utility.js";

const typeModel = mongoose.model("Type", new mongoose.Schema({
    name: String,
}))

const typeDAO = {
    findAll: async () => {
        const allTypes = await typeModel.find({}, projection)
        return allTypes.map(t => t.name)
    },
    deleteAll: async () => {
        await typeModel.deleteMany({})
    },
    addMany: async (types) => {
        const allTypes = await typeDAO.findAll()
        for (let t of types) {
            if (typeof t === 'string') {
                if (!allTypes.some(bdType => bdType.name === t)) {
                    await typeModel.insertOne({name: t})
                }
            }
        }
    }
}

export default typeDAO;