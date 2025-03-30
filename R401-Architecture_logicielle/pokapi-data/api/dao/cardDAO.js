import {mongoose} from 'mongoose';
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
    findCardsBySet: async (id) => {
        const data = await cardModel.find({"set.id": id})
        return data.map(c => new Card(c))
    },
    addOneCard: async (card) => {
        if (card instanceof Card) {
            const c = await cardDAO.findCardByID(card.id)
            if ( c == null) {
                card.storageDate = Date.now()/1000
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
        for (const card of cards) {
            if (card instanceof Card ) {
                if (await cardModel.findOne({id: card.id}) == null) {
                    card.storageDate = Date.now()/1000
                    await cardModel.insertOne(card)
                }
            }
        }
    },
    deleteAllCards: async () => {
        await cardModel.deleteMany({})
    },
    updateCard: async (id, card) => {
        if (card instanceof Card) {
            card.storageDate = Date.now()/1000
            await cardModel.updateOne({id: id}, {$set: card})
            return await cardDAO.findCardByID(id)
        }
        return null
    }
}


export default cardDAO