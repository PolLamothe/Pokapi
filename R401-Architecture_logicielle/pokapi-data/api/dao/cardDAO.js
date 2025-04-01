import {mongoose, set} from 'mongoose';
import {buildMongooseSchema} from "./utility.js";
import {Card} from "../model/Card.js";

const cardModel = mongoose.model("Card", buildMongooseSchema(Card))

const cardDAO = {
    findCardByID: async (id) => {
        const data = await cardModel.findOne({id: id})
        if(data != null) {
            return new Card(data.toJSON())
        }
        return null
    },
    findCards: async (ids) => {
        const data = await cardModel.find({id: { $in: ids }})
        return data.map(card => new Card(card))
    },
    findCardByName : async(setId,name)=>{
        const data = await cardModel.findOne({"set.id" : setId,name : name})
        if(data != null) {
            return new Card(data.toJSON())
        }
        return null
    },
    findCardsBySet: async (id) => {
        const data = await cardModel.find({"set.id": id})
        return data.map(c => new Card(c))
    },
    addOneCard: async (card) => {
        if (card instanceof Card) {
            const c = await cardDAO.findCardByID(card.id)
            if ( c == null) {
                card.storageDate = parseInt(Date.now()/1000)
                await cardModel.insertOne(card)
                return await cardDAO.findCardByID(card.id)
            } else {
                return null
            }
        } else {
            return null
        }
    },
    addManyCards: async (cards) => {
        let result = []
        for (const card of cards) {
            if (card instanceof Card ) {
                if (await cardModel.findOne({id: card.id}) == null) {
                    card.storageDate = parseInt(Date.now()/1000)
                    result.push(new Card(await cardModel.insertOne(card)))
                }
            }
        }
        return result
    },
    deleteAllCards: async () => {
        await cardModel.deleteMany({})
    },
    updateCard: async (id, card) => {
        if (card instanceof Card) {
            card.storageDate = parseInt(Date.now()/1000)
            await cardModel.updateOne({id: id}, {$set: card})
            return await cardDAO.findCardByID(id)
        }
        return null
    },
    updateCards : async(cards) => {
        cards.forEach(card => {
            if(!(card instanceof Card)){
                throw Error("You must provide Card object")
            }
        });
        cards = cards.map(card=>{
            card.storageDate = parseInt(Date.now()/1000)
            return card
        })
        const bulkOps = cards.map(card => ({
            updateOne: {
                filter: { id: card.id },
                update: { $set: card },
                upsert: true // Insère si la carte n'existe pas encore
            }
        }))
        await cardModel.bulkWrite(bulkOps)
        return await cardDAO.findCards(cards.map(card=>card.id))
    }
}


export default cardDAO