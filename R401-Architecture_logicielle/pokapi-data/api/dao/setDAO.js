import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {SetInfo} from "../model/SetInfo.js";

const setModel = mongoose.model("Set", buildMongooseSchema(SetInfo))

const setDAO = {
    find : async(id)=>{
        const data = await setModel.findOne({id : id})
        if(data != null){
            return new SetInfo(data)
        }
        return null
    },
    findAll: async () => {
        const allSets = await setModel.find({}, projection)
        return allSets.map(s => new SetInfo(s))
    },
    deleteAll: async () => {
        await setModel.deleteMany({})
    },
    add: async(set)=>{
        const localSet = await setDAO.find(set.id,projection)
        if(localSet == null){
            return new SetInfo(await setModel.insertOne(set,projection))
        }else{
            return false
        }
    },
    addMany: async (sets) => {
        const allSets = await setDAO.findAll()//TODO : Très mal optimisé
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