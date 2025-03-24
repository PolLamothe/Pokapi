import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {SetInfo} from "../model/SetInfo.js";

const setModel = mongoose.model("Set", buildMongooseSchema(SetInfo))

const setDAO = {
    findAll: async () => {
        // TODO
    },
    deleteAll: async () => {
        // TODO
    },
    addMany: async () => {
        // TODO
    }
}

export default setDAO;