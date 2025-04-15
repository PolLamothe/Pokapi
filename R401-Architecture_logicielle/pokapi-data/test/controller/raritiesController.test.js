import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import CONFIG from "../../const.js";
import raritiesDAO from "../../api/dao/raritiesDAO.js";
import raritiesController from "../../api/controller/raritiesController.js";

let mongod=null
let connexion = null

describe('Controller - RaritiesController', () => {
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

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })

    it("findAll", async () => {
        let result = await raritiesController.findAll()
        assert.ok(result.length > 0)
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Test mise en cache
        result = await raritiesController.findAll()
        assert.ok(result.length > 0)
        // Test cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        result = await raritiesController.findAll()
        assert.ok(result.length > 0)
        CONFIG.CACHE_EXPIRATION = oldConfig
    })
})