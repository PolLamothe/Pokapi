import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import testCards from '../ressources/cards.json' with {type: 'json'}
import {Card} from "../../api/model/Card.js";
import setController from '../../api/controller/setController.js';
import setDAO from '../../api/dao/setDAO.js';

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

    it("findSet",async ()=>{
        const testSet = (new Card(testCards["data"][0])).set
        const result = await setController.find(testSet.id)
        assert(((Date.now()/1000) - result.storageDate) < 1)//vérification que les carte on étées mise en cache très récemment
        assert(testSet.compare(result))
        await new Promise(resolve => setTimeout(resolve, 1000))
        const cachedResult = await setController.find(testSet.id)
        assert.equal(cachedResult.storageDate,result.storageDate)
        assert(testSet.compare(cachedResult))
    })
})