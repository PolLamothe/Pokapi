import {after, before, beforeEach, describe, it} from "node:test"
import assert from "node:assert"
import userController from "../../api/controller/userController.js";
import mongoose from "mongoose";
import userDAO from "../../api/dao/userDAO.js";
import {User} from "../../api/model/User.js";

let mongod= null
let connexion = null

const user1 = {
    pseudo : "testPseudo1",
    login : "testLogin1",
    password : "testPassword1",
    cards : [{id: "11", quantity: 13}, {id: "12"}, {id: "13"}],
    searched : [{id: "14"}, {id: "15"}, {id: "16"}]
}

const user2 = {
    pseudo : "testPseudo2",
    login : "testLogin2",
    password : "testPassword2",
    cards : [{id: "21"}, {id: "22", quantity: 22}, {id: "23"}],
    searched : [{id: "24"}, {id: "25"}, {id: "26"}]
}

describe("Controller - UserController",()=>{
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await userDAO.deleteAll()
    })

    it("findUserByPseudo empty",async ()=>{
        assert.deepEqual(await userController.findUserByPseudo("test"), [])
    })

    it("findUserByPseudo one",async ()=>{
        await userDAO.addOne(new User(user2))
        assert.deepEqual(await userController.findUserByPseudo("testPseudo2"), [new User(user2)])
    })

    it("findUserByPseudo two",async ()=>{
        await userDAO.addOne(new User(user2))
        await userDAO.addOne(new User(user1))
        assert.deepEqual(await userController.findUserByPseudo("testPseudo"), [
            new User(user2),
            new User(user1)
        ])
    })

    it("addSearched valid and already added", async () => {
        const u1 = await userDAO.addOne(new User(user1))
        const expected = new User(user1)
        expected.searched.push({id: "42", quantity: null})
        const u1Updated = await userController.addSearched(u1, "42")
        assert.deepEqual(u1Updated, expected)
        await assert.rejects(userController.addSearched(u1, "42"))
        await assert.rejects(userController.addSearched(u1Updated, "42"))
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})