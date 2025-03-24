import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import setDAO from "../../api/dao/setDAO.js"
import {SetInfo} from "../../api/model/SetInfo.js";
import mongoose from "mongoose";

let mongod=null
let connexion = null

describe("DAO - SetDAO", () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await setDAO.deleteAll()
    })

    it("Find all sets", async () => {
        // TODO
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})