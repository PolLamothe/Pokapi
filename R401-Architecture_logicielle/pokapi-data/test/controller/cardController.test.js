import mongoose from 'mongoose';
import assert, { deepEqual } from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import cardController from '../../api/controller/cardController.js';
import testCards from '../ressources/cards.json' with {type: 'json'}
import cardDAO from '../../api/dao/cardDAO.js';
import {Card} from "../../api/model/Card.js";

let mongod=null
let connexion = null

describe('Controller - CardController', () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await cardDAO.deleteAllCards()
    })

    it("findCard",async ()=>{
        const testCard = testCards["data"][0]
        const result = await cardController.findCard(testCard.id)
        assert(((Date.now()/1000) - result.storageDate) < 1)//vérification que les carte on étées mise en cache très récemment
        new Promise(resolve => setTimeout(resolve, 1000)).then(async()=>{
            const cachedResult = await cardController.findCard(testCard.id);
            assert(((Date.now()/1000) - cachedResult.storageDate) > 1)//vérification que les cartes n'ont pas étées remisent en cache
        })
    })

    it("findCards",async ()=>{
        const cards = testCards["data"]
        cards.splice(5,cards.length-5)
        const ids = cards.map((card)=>card["id"])
        const result = await cardController.findCards(ids)
        result.forEach((card)=>{
            assert(((Date.now()/1000) - card.storageDate) < 1)
        })
        new Promise(resolve => setTimeout(resolve, 1000)).then(async()=>{
            const cachedResult = await cardController.findCard(ids);
            cachedResult.forEach(async card=>{
                assert(((Date.now()/1000) - card.storageDate) > 1)
            })
        })
    })
})