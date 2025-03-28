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
        assert.deepEqual(await cardDAO.addOneCard(base1), base2)
        assert.deepEqual(await cardDAO.findCardByID(base2.id), base2)
    })

    it('addOneCard twice', async () => {
        const base1 = new Card(testCards.data[0])
        const base2 = new Card(testCards.data[0])
        assert.deepEqual(await cardDAO.addOneCard(base1), base2)
        assert.deepEqual(await cardDAO.addOneCard(base1), null)
        assert.deepEqual(await cardDAO.findCardByID(base2.id), base2)
    })

    it('addManyCards',  async () => {
        const base11 = new Card(testCards.data[0])
        const base12 = new Card(testCards.data[0])
        const base21 = new Card(testCards.data[1])
        const base22 = new Card(testCards.data[1])
        await cardDAO.addManyCards([base11, base21])
        assert.deepEqual(await cardDAO.findCardByID(base12.id), base12)
        assert.deepEqual(await cardDAO.findCardByID(base22.id), base22)
    })

    it('findCards',  async () => {
        const base11 = new Card(testCards.data[0])
        const base12 = new Card(testCards.data[0])
        const base21 = new Card(testCards.data[1])
        const base22 = new Card(testCards.data[1])
        await cardDAO.addManyCards([base11, base21])
        assert.deepEqual(await cardDAO.findCards([base12.id, base22.id]), [base12, base22])
    })

    it('findCardsBySet', async () => {
        const base11 = new Card(testCards.data[2])
        const base12 = new Card(testCards.data[2])
        const base21 = new Card(testCards.data[8])
        const base22 = new Card(testCards.data[8])
        await cardDAO.addManyCards([base11, base21])
        assert.deepEqual(await cardDAO.findCardsBySet("mcd19"), [base12, base22])
    })

    it('updateCard', async () => {
        const base11 = new Card(testCards.data[0])
        const base12 = new Card(testCards.data[0])
        assert.deepEqual(await cardDAO.addOneCard(base11), base12)
        base12.name = "Test"
        assert.deepEqual(await cardDAO.updateCard(base12.id, base12), base12)
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})