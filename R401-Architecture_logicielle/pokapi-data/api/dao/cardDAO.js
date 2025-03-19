import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {Card} from "../model/Card.js";

const cardModel = mongoose.model("Card", buildMongooseSchema(Card))

const cardDAO = {
    findCardByID: async (id) => {
        // TODO: Récupérer une carte a partir de son ID
        console.log(id)
        const data = await cardModel.findOne({id: id})
        if(data!=null){
            return new Card(data.toJSON())
        }
        return null

    },
    findCardEvolution: async (id) => {
        // TODO: voir le champ 'evolvesTo'
        const card = await cardDAO.findCardByID(id)
        return (await cardModel.find({evolvesTo: card.name, "$set.id" : card.set.id})).map(obj => new Card(obj))

    },
    findAllSets: async () => {
        // TODO: Obtenir tous les SET avec 3 cartes qui les représentent
    },
    findCardsBySet: async (id) => {
        // TODO: récupérer toutes les cartes d'un set
    },
    addOneCard: async (card) => {
        // TODO: Ajoute une carte à la BD
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
        // TODO: Ajoute un array de cartes à la BD
        for (const card of cards) {
            if (card instanceof Card ) {
                if (cardModel.findOne({id: card.id}) == null) {
                    await cardModel.insertOne(card)
                }
            }
        }
    },
    deleteAllCards: async () => {
        // TODO: Vide la BD
        await cardModel.deleteMany({})
    },
    updateCard: async (id, card) => {
        // TODO: met à jour la carte (ID) avec le carte donnée
    }
}


export default cardDAO