import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import testCards from '../ressources/cards.json' with {type: 'json'}
import {Card} from "../../api/model/Card.js";
import setController from '../../api/controller/setController.js';
import setDAO from '../../api/dao/setDAO.js';
import CONFIG from "../../const.js";

let mongod=null
let connexion = null

describe('Controller - SetController', () => {
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

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })

    it("find",async ()=>{
        const testSet = (new Card(testCards["data"][0])).set
        const result = await setController.find(testSet.id)
        assert(((Date.now()/1000) - result.storageDate) < 5) //vérification que les carte on étés mise en cache très récemment
        assert(testSet.compare(result))
        await new Promise(resolve => setTimeout(resolve, 1000))
        let cachedResult = await setController.find(testSet.id)
        assert.equal(cachedResult.storageDate,result.storageDate)
        assert(testSet.compare(cachedResult))
        // Test cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        await new Promise(resolve => setTimeout(resolve, 1000))
        cachedResult = await setController.find(testSet.id)
        assert.notEqual(cachedResult.storageDate,result.storageDate)
        assert(testSet.compare(cachedResult))
        CONFIG.CACHE_EXPIRATION = oldConfig
    })

    it("findAll", async () => {
        let result = await setController.findAll()
        assert.ok(result.length > 0)
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Test mise en cache
        result = await setController.findAll()
        assert.ok(result.length > 0)
        // Test cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        result = await setController.findAll()
        assert.ok(result.length > 0)
        CONFIG.CACHE_EXPIRATION = oldConfig
    })
})