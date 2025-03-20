import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {Card} from "../model/Card.js";

const cardModel = mongoose.model("Card", buildMongooseSchema(Card))

const cardDAO = {
    findCardByID: async (id) => {
        console.log(id)
        const data = await cardModel.findOne({id: id})
        if(data!=null){
            return new Card(data.toJSON())
        }
        return null
    },
    findCards: async (ids) => {
        // TODO: récupérer toutes les cartes à partir d'un tableau d'IDs
    },
    findCardsBySet: async (id) => {
        // TODO: récupérer toutes les cartes d'un set
    },
    addOneCard: async (card) => {
        if (card instanceof Card) {
            const temp = await cardDAO.findCardByID(card.id)
            console.log("temp", temp)
            if ( temp== null) {
                await cardModel.insertOne(card)
                return new Card(await cardDAO.findCardByID(card.id))
            } else {
                console.log("estprésente")
                return null
            }
        } else {
            return null
        }

    },
    addManyCards: async (cards) => {
        for (const card of cards) {
            if (card instanceof Card ) {
                if (cardModel.findOne({id: card.id}) == null) {
                    await cardModel.insertOne(card)
                }
            }
        }
    },
    deleteAllCards: async () => {
        await cardModel.deleteMany({})
    },
    updateCard: async (id, card) => {
        // TODO: met à jour la carte (ID) avec le carte donnée
    }
}


export default cardDAO