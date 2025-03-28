import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {SetInfo} from "../model/SetInfo.js";

const setModel = mongoose.model("Set", buildMongooseSchema(SetInfo))

const setDAO = {
    findAll: async () => {
        const allSets = await setModel.find({}, projection)
        return allSets.map(s => new SetInfo(s))
    },
    deleteAll: async () => {
        await setModel.deleteMany({})
    },
    addMany: async (sets) => {
        const allSets = await setDAO.findAll()
        for (const s of sets) {
            if (s instanceof SetInfo ) {
                if (!allSets.includes(s)) {
                    await setModel.insertOne(s)
                }
            }
        }
    }
}

export default setDAO;