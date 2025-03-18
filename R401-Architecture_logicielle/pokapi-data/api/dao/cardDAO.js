import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {Card} from "../model/Card.js";

const cardModel = mongoose.model("Card", buildMongooseSchema(Card))

const cardDAO = {
    findCardByID: async (id) => {
        // TODO: Récupérer une carte a partir de son ID
    },
    findCardEvolution: async (id) => {
        // TODO: voir le champ 'evolvesFrom'
    },
    findAllSets: async () => {
        // TODO: Obtenir tous les SET avec 3 cartes qui les représentent
    },
    findCardsBySet: async (id) => {
        // TODO: récupérer toutes les cartes d'un set
    },
    addOneCard: async (card) => {
        // TODO: Ajoute une carte à la BD
    },
    addManyCards: async (cards) => {
        // TODO: Ajoute un array de cartes à la BD
    },
    deleteAllCards: async () => {
        // TODO: Vide la BD
    },
    updateCard: async (id, card) => {
        // TODO: met à jour la carte (ID) avec le carte donnée
    }
}

export default cardDAO