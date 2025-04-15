'use strict'
import request from "supertest"
import {after, before, beforeEach, describe, it} from "node:test"
import assert from "node:assert"
import mongoose from "mongoose";
import userController from "../../api/controller/userController.js";
import CONFIG from "../../const.js";
import userDAO from "../../api/dao/userDAO.js";
import app from "../../app.js";
import jwt from "jsonwebtoken";
import {User} from "../../api/model/User.js";

let mongod=null
let connexion = null

const assertJWT = (token, expectedLogin, expectedPseudo) => {
    jwt.verify(token, CONFIG.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("Test fail : Invalid JWT")
        } else {
            assert.equal(decoded.login, expectedLogin)
            assert.equal(decoded.pseudo, expectedPseudo)
        }
    })
}

const user1 = {
    pseudo : "testPseudo1",
    login : "testLogin1",
    password : "testPassword1",
    cards : [{id: "dp3-1", quantity: 1},
        {id: "ex12-1", quantity: 3},
        {id: "mcd19-1", quantity: 2},
        {id: "ex7-1", quantity: 2},
        {id: "sm9-1", quantity: 10},
        {id: "pl1-2", quantity: 1},
        {id: "ex3-2", quantity: 4},
        {id: "sm9-2", quantity: 7},
        {id: "mcd19-2", quantity: 2},
        {id: "xy5-2", quantity: 100}],
    searched : [{id: "14"}, {id: "15"}, {id: "16"}]
}

const user2 = {
    pseudo : "testPseudo2",
    login : "testLogin2",
    password : "testPassword2",
    cards : [{id: "21"}, {id: "22", quantity: 22}, {id: "23"}],
    searched : [{id: "24"}, {id: "25"}, {id: "26"}]
}

describe("Route - route",()=> {
    before(async () => {
        await mongoose.connection.close()
        const {MongoMemoryServer} = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
        CONFIG.LOGS = false
    })

    beforeEach(async () => {
        await userDAO.deleteAll()
    })

    it("GET /my-cards unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/my-cards')
        assert.equal(response.status, 401)
    })

    it("GET /my-cards valid", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const user = await userDAO.findByLogin(user1.login)
        user.cards = user1.cards
        await userDAO.update(user1.login, user)
        const response = await request(app).get(CONFIG.API_PATH+'/my-cards')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        assert.equal(response.body.length, 10)
    })

    it("POST /register invalid fields", async () => {
        let response = await request(app).post(CONFIG.API_PATH+'/register')
        assert.equal(response.status, 400)
        assert.equal(response.body.message, "Fields must not be empty")
        response = await request(app).post(CONFIG.API_PATH+'/register')
            .send({login: 'john'})
        assert.equal(response.status, 400)
        assert.equal(response.body.message, "Fields must not be empty")
        response = await request(app).post(CONFIG.API_PATH+'/register')
            .send({login: '  ', pseudo: 'john', password: '123'})
        assert.equal(response.status, 400)
        assert.equal(response.body.message, "Fields must not be empty")
    })

    it("POST /register valid", async () => {
        const response = await request(app).post(CONFIG.API_PATH+'/register')
            .send({login: 'testL', pseudo: 'testP', password: '123'})
        assert.equal(response.status, 200)
        assertJWT(response.body.token, 'testL', 'testP')
    })

    it("GET /pseudo/:pseudo empty", async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/pseudo/test')
        assert.equal(response.status, 200)
        assert.equal(response.body.count, 0)
        assert.equal(response.body.data.length, 0)
    })

    it("GET /pseudo/:pseudo 2 users", async () => {
        await userDAO.addOne(new User(user1))
        await userDAO.addOne(new User(user2))
        const response = await request(app).get(CONFIG.API_PATH+'/pseudo/testPseudo')
        assert.equal(response.status, 200)
        assert.equal(response.body.count, 2)
        assert.equal(response.body.data.length, 2)
    })

    it("GET /info unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/info')
        assert.equal(response.status, 401)
    })

    it("GET /open-booster/:setID unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/open-booster/xy')
        assert.equal(response.status, 401)
    })

    it("PUT /update unauthorized",async () => {
        const response = await request(app).put(CONFIG.API_PATH+'/update')
        assert.equal(response.status, 401)
    })

    it("GET /searched unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/searched')
        assert.equal(response.status, 401)
    })

    it("POST /searched/add unauthorized",async () => {
        const response = await request(app).post(CONFIG.API_PATH+'/searched/add')
        assert.equal(response.status, 401)
    })

    it("GET /info valid",async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).get(CONFIG.API_PATH+'/info')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
    })

    it("GET /searched valid",async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const user = await userDAO.findByLogin(user1.login)
        user.searched = user1.searched
        await userDAO.update(user1.login, user)
        const response = await request(app).get(CONFIG.API_PATH+'/searched')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        assert.equal(response.body.length, 3)
    })

    it("POST /searched/add missing",async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).post(CONFIG.API_PATH+'/searched/add')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 400)
    })

    it("POST /searched/add already here",async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        let response = await request(app).post(CONFIG.API_PATH+'/searched/add')
            .send({id: 'dp3-1'})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        response = await request(app).post(CONFIG.API_PATH+'/searched/add')
            .send({id: 'dp3-1'})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 400)
    })

    it("POST /searched/add valid",async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).post(CONFIG.API_PATH+'/searched/add')
            .send({id: 'dp3-1'})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
    })

    it("POST /login empty", async () => {
        await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).post(CONFIG.API_PATH+'/login')
        assert.equal(response.status, 401)
    })

    it("POST /login wrong credentials", async () => {
        await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).post(CONFIG.API_PATH+'/login')
            .send({login: user1.login, password: "Wrong"})
        assert.equal(response.status, 401)
    })

    it("POST /login wrong token", async () => {
        await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).post(CONFIG.API_PATH+'/login')
            .set("Authorization", `Bearer WRONG`)
        assert.equal(response.status, 401)
    })

    it("POST /login valid credentials", async () => {
        await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).post(CONFIG.API_PATH+'/login')
            .send({login: user1.login, password: user1.password})
        assert.equal(response.status, 200)
        assertJWT(response.body.token, user1.login, user1.pseudo)
    })

    it("POST /login valid token", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).post(CONFIG.API_PATH+'/login')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        assertJWT(response.body.token, user1.login, user1.pseudo)
    })

    it("DELETE /delete unauthorized", async () => {
        const response = await request(app).delete(CONFIG.API_PATH+'/delete')
        assert.equal(response.status, 401)
    })

    it("DELETE /delete valid", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).delete(CONFIG.API_PATH+'/delete')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
    })

    it("GET /my-cards/:cardId unauthorized", async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/my-cards/wrong')
        assert.equal(response.status, 401)
    })

    it("PUT /update empty", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).put(CONFIG.API_PATH+'/update')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        assertJWT(response.body.token, user1.login, user1.pseudo)
    })

    it("PUT /update pseudo", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).put(CONFIG.API_PATH+'/update')
            .send({pseudo: "modified"})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        assertJWT(response.body.token, user1.login, "modified")
    })

    it("PUT /update password", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).put(CONFIG.API_PATH+'/update')
            .send({password: "modified"})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        assertJWT(response.body.token, user1.login, user1.pseudo)
    })

    it("PUT /update pseudo and password wrong", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).put(CONFIG.API_PATH+'/update')
            .send({pseudo: "modified", password: "       "})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 400)
    })

    it("GET /my-cards/:cardId wrong", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).get(CONFIG.API_PATH+'/my-cards/test')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 400)
    })

    it("GET /my-cards/:cardId valid", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const user = await userDAO.findByLogin(user1.login)
        user.cards = [
            {id: "dp3-1", quantity: 42},
            {id: "ex12-1", quantity: 3},
        ]
        await userDAO.update(user1.login, user)
        const response = await request(app).get(CONFIG.API_PATH+'/my-cards/dp3-1')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
    })

    it("GET /open-booster/:setId wrong", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        const response = await request(app).get(CONFIG.API_PATH+'/open-booster/wrong')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 404)
    })

    it("GET /open-booster/:setId valid", async () => {
        const token = await userController.register(user1.login, user1.pseudo, user1.password)
        let response = await request(app).get(CONFIG.API_PATH+'/open-booster/base1')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(response.status, 200)
        assert.equal(response.body.length, 5)
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})
