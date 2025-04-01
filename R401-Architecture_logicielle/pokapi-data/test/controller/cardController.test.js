import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import cardController from '../../api/controller/cardController.js';
import testCards from '../ressources/cards.json' with {type: 'json'}
import setCards from "../ressources/setCards.json" with {type : "json"}
import evolve from "../ressources/evolve.json" with {type : "json"}
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
        const testCard = new Card(testCards["data"][0])
        const result = await cardController.findCard(testCard.id)
        assert(((Date.now()/1000) - result.storageDate) < 1)//vérification que les carte on étées mise en cache très récemment
        assert(testCard.compare(result))
        await new Promise(resolve => setTimeout(resolve, 1000))
        const cachedResult = await cardController.findCard(testCard.id);
        assert.equal(cachedResult.storageDate,result.storageDate)
        assert(testCard.compare(cachedResult))
    })

    it("findCards",async ()=>{
        const cards = testCards["data"]
        cards.splice(5,cards.length-5)
        const ids = cards.map((card)=>card["id"])
        const result = await cardController.findCards(ids)
        result.forEach((card,index)=>{
            assert(((Date.now()/1000) - card.storageDate) < 1)
            assert(new Card(cards[index]).compare(card))
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
        const cachedResult = await cardController.findCards(ids);
        cachedResult.forEach(async (card,index)=>{
            assert.equal(card.storageDate,result[index].storageDate)
            assert(new Card(cards[index]).compare(card))
        })
    })

    it("findSetCard",async()=>{
        const firstCard = new Card(setCards.data[0])
        const result = await cardController.findCard(firstCard.id)
        assert(((Date.now()/1000) - result.storageDate) < 1)//vérification que les carte on étées mise en cache très récemment
        assert(new Card(firstCard).compare(result))
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        const setCardsRetrieved = await cardController.findSetCards(firstCard.set.id)
        assert.equal(setCardsRetrieved.length,firstCard.set.total)
        setCardsRetrieved.forEach((card,index)=>{
            assert(((Date.now()/1000) - card.storageDate) < 1)
            assert(card.compare(new Card(setCards.data[index])))
        })

        await new Promise(resolve => setTimeout(resolve, 1000))
        const secondCard = new Card(setCards.data[1])
        const result2 = await cardController.findCard(secondCard.id)
        assert.equal(result2.storageDate,setCardsRetrieved[1].storageDate)
    })

    it("setPresentation",async()=>{
        const set = (new Card(setCards.data[0])).set
        const result = await cardController.setPresentation(set.id)

        assert(result.set.compare(set))
        assert.equal(result.images.length,3)
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
    })

    it("Find evolution existing",async ()=>{
        const base = new Card(evolve.data[0])
        const result = await cardController.findEvolution(base.id)
        const resultByName = await cardController.findByName(base.set.id,base.evolvesTo[0])
        assert(result.compare(resultByName))
        assert(((Date.now()/1000)-result.storageDate) < 1)
        await new Promise(resolve => setTimeout(resolve, 1000))
        const result2 = await cardController.findEvolution(base.id)
        assert(((Date.now()/1000)-result2.storageDate) > 1)
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
})