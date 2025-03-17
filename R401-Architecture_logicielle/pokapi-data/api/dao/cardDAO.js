import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {Card} from "../model/Card.js";

const cardModel = mongoose.model("Card", buildMongooseSchema(Card))

const cardDAO = {
    // TODO : Faire le DAO qui récupère les données depuis la BD de cache
}

export default cardDAO