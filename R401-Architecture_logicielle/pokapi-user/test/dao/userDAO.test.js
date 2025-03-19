import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import userDAO from "../../api/dao/userDAO.js"
import { User } from '../../api/model/User.js';

let mongod=null
let connexion = null

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

    it('addOne',async () => {
        const newUser = new User({
            pseudo : "testAddOne",
            login : "testAddOne",
            password : "testAddOne",
            collection : [],
            searched : []
        })
        
        await userDAO.addOne(newUser)

        assert.deepStrictEqual(await userDAO.findByLogin(newUser.login),newUser)
    })

    it('addMany', {todo: true}, async () => {
        const newUser = new User({
            pseudo : "user1",
            login : "user1",
            password : "user1",
            collection : [],
            searched : []
        })

        const newUser2 = new User({
            pseudo : "user2",
            login : "user2",
            password : "user2",
            collection : [],
            searched : []
        })

        const users = [newUser,newUser2]

        await userDAO.addMany(users)

        assert.deepStrictEqual(await userDAO.findByLogin("user1"),newUser)
        assert.deepStrictEqual(await userDAO.findByLogin("user2"),newUser2)
    })

    it('update', {todo: true}, () => {
        // TODO
    })

    it('findByPseudo',async () => {
        const newUser = new User({
            pseudo : "testFindByPseudo",
            login : "testFindByPseudo",
            password : "testFindByPseudo",
            collection : [],
            searched : []
        })

        const newUser2 = new User({
            pseudo : "testfindbypseudo",
            login : "testfindbypseudo",
            password : "testFindByPseudo",
            collection : [],
            searched : []
        })

        const newUser3 = new User({
            pseudo : "notInTestFindByPseudo",
            login : "notInTestFindByPseudo",
            password : "notInTestFindByPseudo",
            collection : [],
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