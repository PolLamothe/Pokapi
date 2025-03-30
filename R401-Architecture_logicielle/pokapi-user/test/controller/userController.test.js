import {after, before, beforeEach, describe, it} from "node:test"
import assert from "node:assert"
import userController from "../../api/controller/userController.js";
import mongoose from "mongoose";
import userDAO from "../../api/dao/userDAO.js";
import {User} from "../../api/model/User.js";
import jwt from 'jsonwebtoken';
import CONFIG from "../../const.js";

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

    it("addSearched invalid user", async () => {
        await assert.rejects(userController.addSearched(new User(user1), "42"))
    })

    it("updateUser valid", async () => {
        const u1 = await userDAO.addOne(new User(user1))
        const expected = new User(user1)
        expected.pseudo = "modified1"
        expected.password = "modified2"
        const u1Updated = await userController.updateUser(u1, "modified1", "modified2")
        assert.deepEqual(u1Updated, expected)
    })

    it("updateUser no change", async () => {
        const u1 = await userDAO.addOne(new User(user1))
        const expected = new User(user1)
        const u1Updated = await userController.updateUser(u1)
        assert.deepEqual(u1Updated, expected)
    })

    it("updateUser wrong", async () => {
        assert.deepEqual(await userController.updateUser({}, "modified"), null)
        const u1 = await userDAO.addOne(new User(user1))
        await assert.rejects(userController.updateUser(u1, "     "))
        await assert.rejects(userController.updateUser(u1, " test ", "      "))
    })

    it("updateUser don't exists", async () => {
        const u1 = new User(user1)
        await assert.rejects(userController.updateUser(u1, "modified"))
        assert.equal(u1.pseudo, user1.pseudo)
    })

    it("register empty fields", async () => {
        await assert.rejects(userController.register("  ", "test", "test"))
        await assert.rejects(userController.register("test ", "  ", "test"))
        await assert.rejects(userController.register("test", " test", "   "))
    })

    it("register already exist", async () => {
        const u1 = await userDAO.addOne(new User(user1))
        await assert.rejects(userController.register(user1.login, "test", "test"))
    })

    it("register valid", async () => {
        const u1 = await userDAO.addOne(new User(user1))
        const token = await userController.register(user2.login, user2.pseudo, user2.password)
        jwt.verify(token, CONFIG.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new Error("Invalid JWT")
            } else {
                assert.equal(decoded.login, user2.login)
                assert.equal(decoded.pseudo, user2.pseudo)
            }
        })
        const userAdded = await userDAO.findByLogin(user2.login)
        assert.notEqual(userAdded, null)
        assert.notEqual(userAdded.password, user2.password)
    })

    it("loginWithToken invalid", async () => {
        assert.equal(await userController.loginWithToken("test"), null)
    })

    it("loginWithToken valid no new", async () => {
        const token = await userController.register(user2.login, user2.pseudo, user2.password)
        assert.ok(await userController.loginWithToken(token))
    })

    it("loginWithToken valid with new", async () => {
        const token = await userController.register(user2.login, user2.pseudo, user2.password)
        const newToken = await userController.loginWithToken(token, true)
        jwt.verify(newToken, CONFIG.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new Error("Invalid JWT")
            } else {
                assert.equal(decoded.login, user2.login)
                assert.equal(decoded.pseudo, user2.pseudo)
            }
        })
    })

    it("loginWithToken deleted user", async () => {
        const token = await userController.register(user2.login, user2.pseudo, user2.password)
        await userDAO.deleteAll()
        assert.equal(await userController.loginWithToken(token), null)
    })

    it("login user don't exist", async () => {
        assert.equal(await userController.login(user1.login, user1.password), null)
    })

    it("login wrong password", async () => {
        const u1 = await userDAO.addOne(new User(user1))
        assert.equal(await userController.login(user1.login, "wrong"), null)
    })

    it("login valid", async () => {
        await userController.register(user1.login, user1.pseudo, user1.password)
        const token = await userController.login(user1.login, user1.password)
        jwt.verify(token, CONFIG.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new Error("Invalid JWT")
            } else {
                assert.equal(decoded.login, user1.login)
                assert.equal(decoded.pseudo, user1.pseudo)
            }
        })
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})