import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import userDAO from "../../api/dao/userDAO.js"
import { User } from '../../api/model/User.js';

let mongod=null
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

describe('DAO - UserDAO', () => {
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

    it('addOne', async () => {
        const u1 = new User(user1)
        const u2 = new User(user1)
        assert.deepEqual(await userDAO.addOne(u1), u2)
        assert.deepEqual(await userDAO.findByLogin(u1.login),u2)
    })

    it('addOne wrong', async () => {
        assert.deepEqual(await userDAO.addOne("wrong"), null)
    })

    it('addOne twice', async () => {
        const u1 = new User(user1)
        const u2 = new User(user1)
        assert.deepEqual(await userDAO.addOne(u1), u2)
        assert.deepEqual(await userDAO.addOne(u1), null)
        assert.deepEqual(await userDAO.findByLogin(u1.login),u2)
    })

    it('update', async() => {
        const u1 = new User(user1)
        const u2 = new User(user1)
        u2.pseudo = "Updated"
        await userDAO.addOne(u1)
        u1.pseudo = "Updated"
        assert.deepEqual(await userDAO.update(u1.login, u1), u2)
        assert.deepEqual(await userDAO.findByLogin(u1.login),u2)
    })

    it('update wrong', async () => {
        assert.deepEqual(await userDAO.update("wrong", "wrong"), null)
    })

    it("update don't exists", async () => {
        const u1 = new User(user1)
        await assert.rejects(userDAO.update(u1.login, u1))
    })

    it('findByPseudo',async () => {
        const newUser = new User({
            pseudo : "testFindByPseudo",
            login : "testFindByPseudo",
            password : "testFindByPseudo",
            cards : [],
            searched : []
        })

        const newUser2 = new User({
            pseudo : "testfindbypseudo",
            login : "testfindbypseudo",
            password : "testFindByPseudo",
            cards : [],
            searched : []
        })

        const newUser3 = new User({
            pseudo : "notInTestFindByPseudo",
            login : "notInTestFindByPseudo",
            password : "notInTestFindByPseudo",
            cards : [],
            searched : []
        })
        
        await userDAO.addOne(newUser)
        await userDAO.addOne(newUser2)
        await userDAO.addOne(newUser3)

        const users = await userDAO.findByPseudo(newUser.pseudo)

        assert.ok(users.some(user => user.pseudo === newUser.pseudo), "newUser should be in the array")
        assert.ok(users.some(user => user.pseudo === newUser2.pseudo), "newUser2 should be in the array")
        assert.ok(!users.some(user => user.pseudo === newUser3.pseudo), "newUser3 should not be in the array")
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})