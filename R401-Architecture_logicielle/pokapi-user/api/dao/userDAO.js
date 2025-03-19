import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {User} from "../model/User.js";

const userModel = mongoose.model("User", buildMongooseSchema(User))

const userDAO = {
    findByLogin: async (login) => {
        return new User(await userModel.findOne({login : login}))
    },
    findByPseudo: async (pseudo) => {
        const result = (await userModel.find({pseudo : new RegExp(`^${pseudo}$`,"i") }))
        return result.map(user => new User(user))
    },
    addOne: async (user) => {
        await userModel.insertOne(user)
    },
    addMany: async (users) => {
        await userModel.insertMany(users)
    },
    deleteAll: async () => {
        await userModel.deleteMany()
    },
    update: async (login, user) => {
        // TODO: met à jour le user (ID) avec le nouveau user donné
    }
}

export default userDAO