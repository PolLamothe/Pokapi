import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import mongoose from "mongoose";
import typeDAO from "../../api/dao/typeDAO.js";

let mongod=null
let connexion = null

describe("DAO - TypeDAO", () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await typeDAO.deleteAll()
    })

    it("Add many types findAll and delete", async () => {
        assert((await typeDAO.findAll()).length === 0)
        await typeDAO.addMany(["type1", "type2", "type3", "type4"])
        const all = await typeDAO.findAll()
        assert(all.length === 4)
        assert.equal(all[0], "type1")
        assert.equal(all[1], "type2")
        assert.equal(all[2], "type3")
        assert.equal(all[3], "type4")
        await typeDAO.deleteAll()
        assert((await typeDAO.findAll()).length === 0)
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})