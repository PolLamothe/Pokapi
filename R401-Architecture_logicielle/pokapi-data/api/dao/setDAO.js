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
            let realSet = new SetInfo(set)
            realSet.storageDate = parseInt(Date.now()/1000)
            return new SetInfo(await setModel.insertOne(realSet,projection))
        }else{
            return false
        }
    },
    addMany: async (sets) => {
        const allSets = await setDAO.findAll()
        for (let s of sets) {
            if (s instanceof SetInfo ) {
                if (!allSets.some(bdSet => bdSet.id === s.id)) {
                    s.storageDate = parseInt(Date.now()/1000)
                    await setModel.insertOne(s)
                }
            }
        }
    },
    update : async (id,set)=>{
        if(set instanceof SetInfo){
            set.storageDate = parseInt(Date.now()/1000)
            await setModel.updateOne({id : id,$set : set})
            return new SetInfo(await setModel.findOne({id: id}));
        }
        return null
    }
}

export default setDAO;