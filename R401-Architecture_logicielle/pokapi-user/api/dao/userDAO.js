import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {User} from "../model/User.js";

const userModel = mongoose.model("User", buildMongooseSchema(User))

const userDAO = {
    findByLogin: async (login) => {
        // TODO: Récupérer un user a partir de son login
    },
    findByPseudo: async (pseudo) => {
        // TODO: Récupérer les users qui ont un pseudo qui ressemble
    },
    addOne: async (user) => {
        // TODO: Ajoute un user à la BD
    },
    addMany: async (users) => {
        // TODO: Ajoute un array de users à la BD
    },
    deleteAll: async () => {
        // TODO: Vide la BD
    },
    update: async (login, user) => {
        // TODO: met à jour le user (ID) avec le nouveau user donné
    }
}

export default userDAO