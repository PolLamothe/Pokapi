import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import cardDAO from "../../api/dao/cardDAO.js"
import testCards from '../ressources/cards.json' with {type: 'json'}
import {Card} from "../../api/model/Card.js";

let mongod=null
let connexion = null

describe('DAO - CardDAO', () => {
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

    it('addOneCard', async () => {
        const base1 = new Card(testCards.data[0])
        const base2 = new Card(testCards.data[0])
        assert((await cardDAO.addOneCard(base1)).compare(base2))
        assert((await cardDAO.findCardByID(base2.id)).compare(base2))
    })

    it('addOneCard wrong', async () => {
        assert.deepEqual(await cardDAO.addOneCard("card"), null)
    })

    it('addOneCard twice', async () => {
        const base1 = new Card(testCards.data[0])
        const base2 = new Card(testCards.data[0])
        assert((await cardDAO.addOneCard(base1)).compare(base2))
        assert.deepEqual(await cardDAO.addOneCard(base1), null)
        assert((await cardDAO.findCardByID(base2.id)).compare(base2))
    })

    it('addManyCards',  async () => {
        const base11 = new Card(testCards.data[0])
        const base12 = new Card(testCards.data[0])
        const base21 = new Card(testCards.data[1])
        const base22 = new Card(testCards.data[1])
        await cardDAO.addManyCards([base11, base21])
        assert((await cardDAO.findCardByID(base12.id)).compare(base12))
        assert((await cardDAO.findCardByID(base22.id)).compare(base22))
    })

    it('findCards',  async () => {
        const base11 = new Card(testCards.data[0])
        const base12 = new Card(testCards.data[0])
        const base21 = new Card(testCards.data[1])
        const base22 = new Card(testCards.data[1])
        await cardDAO.addManyCards([base11, base21])
        const result = await cardDAO.findCards([base12.id, base22.id])
        assert(result[0].compare(base12))
        assert(result[1].compare(base22))
    })

    it('findCardsBySet', async () => {
        const base01 = new Card(testCards.data[0])
        const base11 = new Card(testCards.data[2])
        const base12 = new Card(testCards.data[2])
        const base21 = new Card(testCards.data[8])
        const base22 = new Card(testCards.data[8])
        await cardDAO.addManyCards([base01, base11, base21])
        const result = await cardDAO.findCardsBySet("mcd19")
        assert(result[0].compare(base12))
        assert(result[1].compare(base22))
    })

    it('updateCard', async () => {
        const base11 = new Card(testCards.data[0])
        const base12 = new Card(testCards.data[0])
        const base13 = new Card(testCards.data[0])
        base13.name = "Test"
        assert((await cardDAO.addOneCard(base11)).compare(base12))
        base12.name = "Test"
        const res = await cardDAO.updateCard(base12.id, base12)
        assert(res.compare(base13))
    })

    it('updateCard wrong', async () => {
        assert.deepEqual(await cardDAO.updateCard("x", "card"), null)
    })

    it("update Cards",async ()=>{
        const base01 = new Card(testCards.data[0])
        const base11 = new Card(testCards.data[2])
        const base21 = new Card(testCards.data[8])
        let result = await cardDAO.updateCards([base01, base11, base21])
        assert(result[0].compare(base01))
        assert(result[1].compare(base11))
        assert(result[2].compare(base21))
        result.forEach(card=>{
            assert((parseInt(Date.now()/1000) - card.storageDate) < 1)
        })
        new Promise(resolve => setTimeout(resolve, 1000)).then(async()=>{
            let result = await cardDAO.updateCards([base01, base11, base21])
            result.forEach(card=>{
                assert((parseInt(Date.now()/1000) - card.storageDate) < 1)
            })
        })
    })

    it("find card by name",async ()=>{
        const base = new Card(testCards.data[0])
        let result = await cardDAO.addOneCard(base)
        assert(result.compare(base))
        let result2 = await cardDAO.findCardByName(base.set.id,base.name)
        assert(result2.compare(base))
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})