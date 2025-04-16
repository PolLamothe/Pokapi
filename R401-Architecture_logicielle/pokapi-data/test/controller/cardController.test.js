import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import cardController from '../../api/controller/cardController.js';
import testCards from '../ressources/cards.json' with {type: 'json'}
import setCards from "../ressources/setCards.json" with {type : "json"}
import evolve from "../ressources/evolve.json" with {type : "json"}
import cardDAO from '../../api/dao/cardDAO.js';
import {Card} from "../../api/model/Card.js";
import cardFetchDAO from "../../api/dao/cardFetchDAO.js";
import CONFIG from "../../const.js";

let mongod=null
let connexion = null

describe('Controller - CardController', () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
        CONFIG.LOGS = false
    })

    beforeEach(async ()=>{
        await cardDAO.deleteAllCards()
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })

    it("findCard",async ()=>{
        const testCard = new Card(testCards["data"][0])
        let result = await cardController.findCard(testCard.id)
        assert(((Date.now()/1000) - result.storageDate) < 3)
        assert(testCard.compare(result))
        await new Promise(resolve => setTimeout(resolve, 1000))
        const cachedResult = await cardController.findCard(testCard.id);
        assert.equal(cachedResult.storageDate,result.storageDate)
        assert(testCard.compare(cachedResult))
        // Cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        result = await cardController.findCard(testCard.id)
        assert(((Date.now()/1000) - result.storageDate) < 3)
        assert(testCard.compare(result))
        CONFIG.CACHE_EXPIRATION = oldConfig
    })

    it("findCard wrong", async () => {
        await assert.rejects(cardController.findCard("wrong"))
    })

    it("findCards",async ()=>{
        const cards = testCards["data"]
        cards.splice(5,cards.length-5)
        const ids = cards.map((card)=>card["id"])
        let result = await cardController.findCards(ids)
        assert.equal(ids.length, result.length)
        result.forEach((card,index)=>{
            assert(((Date.now()/1000) - card.storageDate) < 3)
            assert(new Card(cards[index]).compare(card))
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
        const cachedResult = await cardController.findCards(ids);
        for (const card of cachedResult) {
            const index = cachedResult.indexOf(card);
            assert.equal(card.storageDate, result[index].storageDate)
            assert(new Card(cards[index]).compare(card))
        }
        // Cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        result = await cardController.findCards(ids)
        result.forEach((card,index)=>{
            assert(((Date.now()/1000) - card.storageDate) < 3)
            assert(new Card(cards[index]).compare(card))
        })
        CONFIG.CACHE_EXPIRATION = oldConfig
    })

    it("findSetCard",async()=>{
        const firstCard = new Card(setCards.data[0])
        const result = await cardController.findCard(firstCard.id)
        assert(((Date.now()/1000) - result.storageDate) < 3)
        assert(new Card(firstCard).compare(result))
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        let setCardsRetrieved = await cardController.findSetCards(firstCard.set.id)
        assert.equal(setCardsRetrieved.length,firstCard.set.total)
        setCardsRetrieved.forEach((card,index)=>{
            assert(((Date.now()/1000) - card.storageDate) < 1)
            assert(card.compare(new Card(setCards.data[index])))
        })

        await new Promise(resolve => setTimeout(resolve, 1000))
        const secondCard = new Card(setCards.data[1])
        const result2 = await cardController.findCard(secondCard.id)
        assert.equal(result2.storageDate,setCardsRetrieved[1].storageDate)
        // Cache utilisé
        setCardsRetrieved = await cardController.findSetCards(firstCard.set.id)
        assert.equal(setCardsRetrieved.length,firstCard.set.total)
        assert.equal(result2.storageDate,setCardsRetrieved[1].storageDate)
        // Cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        const setCardsFetched = await cardController.findSetCards(firstCard.set.id)
        assert.equal(setCardsFetched.length,firstCard.set.total)
        CONFIG.CACHE_EXPIRATION = oldConfig
    })

    it("findSetCard wrong", async () => {
        await assert.rejects(cardController.findSetCards("wrong"))
    })

    it("setPresentation",async()=>{
        const set = (new Card(setCards.data[0])).set
        const result = await cardController.setPresentation(set.id)

        assert(result.set.compare(set))
        assert.equal(result.images.length,4)
        result.images.forEach(image=>{
            assert(image.small.includes(set.id))
            assert(image.large.includes(set.id))
        })
    })

    it("Find card by name",async()=>{
        const base = new Card(setCards.data[0])
        const result = await cardController.findByName(base.set.id,base.name)
        assert(base.compare(result))
        assert(((Date.now()/1000)-result.storageDate) < 1)
        await new Promise(resolve => setTimeout(resolve, 1000))
        const result2 = await cardController.findByName(base.set.id,base.name)
        assert(((Date.now()/1000)-result2.storageDate) > 1)
        // Cache expiré
        const oldConfig = CONFIG.CACHE_EXPIRATION
        CONFIG.CACHE_EXPIRATION = 1
        const result3 = await cardController.findByName(base.set.id,base.name)
        assert(base.compare(result3))
        CONFIG.CACHE_EXPIRATION = oldConfig
    })

    it("Find evolution existing",async ()=>{
        const base = new Card(evolve.data[0])
        const result = await cardController.findEvolution(base.id)
        assert.equal(result.length, 1)
        const resultByName = await cardController.findByName(base.set.id,base.evolvesTo[0])
        assert(result[0].compare(resultByName))
        assert(((Date.now()/1000)-result[0].storageDate) < 1)
        await new Promise(resolve => setTimeout(resolve, 1000))
        const result2 = await cardController.findEvolution(base.id)
        assert.equal(result2.length, 1)
        assert(((Date.now()/1000)-result2[0].storageDate) > 1)
    })

    it("Find evolution several", async () => {
        const result = await cardController.findEvolution("pop3-13")
        assert.equal(result.length, 3)
        result.forEach(r => {
            assert(r.set.id, "pop3")
            assert.equal(r.evolvesFrom, "Eevee")
        })
    })

    it("Find evolution not existing",async ()=>{
        const base = new Card(setCards.data[1])
        const result = await cardController.findEvolution(base.id)
        assert(result == null)
    })

    it("Find evolution not in set",async ()=>{
        const base = new Card(setCards.data[0])
        const result = await cardController.findEvolution(base.id)
        assert(result == null)
    })

    it("Open booster",async()=>{
        const result = await cardController.openBooster("mcd19")
        assert.equal(result.length,5)
        result.forEach(card=>{
            assert.equal(card.set.id,"mcd19")
        })
    })

    it("Deck Price valid", async () =>{
        let testCard = []
        let cards = []

        for (const c of testCards["data"]) {
            testCard.push(await cardFetchDAO.findCardById(c.id))
            cards.push(c.id)
        }

        let totalPrice = 0
        testCard.forEach((card)=>{
            totalPrice += card.cardmarket.prices.trendPrice
        })

        const result = await cardController.deckPrice(cards)
        assert.equal(result, totalPrice)
    })

    it("Deck Price wrong", async () => {
        await assert.rejects(cardController.deckPrice("xy1-1", "xy1-2", "wrong"))
    })
})