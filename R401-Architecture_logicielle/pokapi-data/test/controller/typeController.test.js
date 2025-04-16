import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import CONFIG from "../../const.js";
import typeDAO from "../../api/dao/typeDAO.js";
import typeController from "../../api/controller/typeController.js";

let mongod=null
let connexion = null

describe('Controller - TypeController', () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
        CONFIG.LOGS = false
    })

    beforeEach(async ()=>{
        await typeDAO.deleteAll()
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })

    it("findAll", async () => {
        let result = await typeController.findAll()
        assert.ok(result.length > 0)
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Test mise en cache
        result = await typeController.findAll()
        assert.ok(result.length > 0)
        // Test cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        result = await typeController.findAll()
        assert.ok(result.length > 0)
        CONFIG.CACHE_EXPIRATION = oldConfig
    })
})