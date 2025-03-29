import {mongoose} from 'mongoose';
import {buildMongooseSchema, projection} from "./utility.js";
import {User} from "../model/User.js";

const userModel = mongoose.model("User", buildMongooseSchema(User))

const userDAO = {
    findByLogin: async (login) => {
        let data = await userModel.findOne({login : login})
        if(data!=null){
            return new User(data.toJSON())
        }
        return null
    },
    findByPseudo: async (pseudo) => {
        const result = (await userModel.find({pseudo : new RegExp(`^${pseudo}.*$`,"i") }))
        return result.map(user => new User(user))
    },
    addOne: async (user) => {
        if (user instanceof User) {
            if (await userDAO.findByLogin(user.login) == null) {
                return new User(await userModel.insertOne(user))
            }
            return null
        }
        return null
    },
    deleteAll: async () => {
        await userModel.deleteMany()
    },
    update: async (login, user) => {
        if (user instanceof User) {
            if (await userDAO.findByLogin(user.login) == null) {
                throw new Error(`${user.login} does not exist`)
            } else {
                await userModel.updateOne({login: login}, {$set: user})
                return await userDAO.findByLogin(login)
            }
        }
        return null
    }
}

export default userDAO