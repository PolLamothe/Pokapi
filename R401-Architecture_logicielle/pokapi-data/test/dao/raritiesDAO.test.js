import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import mongoose from "mongoose";
import raritiesDAO from "../../api/dao/raritiesDAO.js";

let mongod=null
let connexion = null

describe("DAO - RarityDAO", () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await raritiesDAO.deleteAll()
    })

    it("Add many rarities findAll and delete", async () => {
        assert((await raritiesDAO.findAll()).length === 0)
        await raritiesDAO.addMany(["rarity1", "rarity2", "rarity3", "rarity4"])
        const all = await raritiesDAO.findAll()
        assert(all.length === 4)
        assert.equal(all[0], "rarity1")
        assert.equal(all[1], "rarity2")
        assert.equal(all[2], "rarity3")
        assert.equal(all[3], "rarity4")
        await raritiesDAO.deleteAll()
        assert((await raritiesDAO.findAll()).length === 0)
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})