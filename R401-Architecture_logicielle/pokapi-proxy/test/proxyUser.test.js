'use strict'

import request from "supertest"
import {before, describe, it} from "node:test"
import assert from "node:assert"
import CONFIG from "../const.js";
import app from "../app.js";

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

describe("Proxy - Pokapi-user",()=> {
    before(async () => {
        CONFIG.LOGS = false
    })

    // ---
    // Tests unauthorized
    // ---

    it("GET /user/my-cards unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/user/my-cards')
        assert.equal(response.status, 401)
    })

    it("GET /user/info unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/user/info')
        assert.equal(response.status, 401)
    })

    it("GET /user/open-booster/:setID unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/user/open-booster/xy')
        assert.equal(response.status, 401)
    })

    it("PUT /user/update unauthorized",async () => {
        const response = await request(app).put(CONFIG.API_PATH+'/user/update')
        assert.equal(response.status, 401)
    })

    it("GET /user/searched unauthorized",async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/user/searched')
        assert.equal(response.status, 401)
    })

    it("POST /user/searched/add unauthorized",async () => {
        const response = await request(app).post(CONFIG.API_PATH+'/user/searched/add')
        assert.equal(response.status, 401)
    })

    it("DELETE /user/delete unauthorized", async () => {
        const response = await request(app).delete(CONFIG.API_PATH+'/user/delete')
        assert.equal(response.status, 401)
    })

    it("GET /user/my-cards/:cardId unauthorized", async () => {
        const response = await request(app).get(CONFIG.API_PATH+'/user/my-cards/wrong')
        assert.equal(response.status, 401)
    })

    // ---
    // Scénario
    // ---

    it("Scenario", async () => {
        // Register
        let responseRegister = await request(app).post(CONFIG.API_PATH+'/user/register')
            .send({login: user1.login, pseudo: user1.pseudo, password: user1.password})
        assert.equal(responseRegister.status, 200)
        responseRegister = await request(app).post(CONFIG.API_PATH+'/user/register')
            .send({login: user2.login, pseudo: user2.pseudo, password: user2.password})
        assert.equal(responseRegister.status, 200)
        // Login
        const resLogin = await request(app).post(CONFIG.API_PATH+'/user/login')
            .send({login: user1.login, password: user1.password})
        assert.equal(resLogin.status, 200)
        const token = resLogin.body.token
        // Recherche pseudo
        const resPseudo = await request(app).get(CONFIG.API_PATH+'/user/pseudo/testPseudo')
        assert.equal(resPseudo.status, 200)
        assert.equal(resPseudo.body.data.length, 2)
        // Open-booster
        const resBooster = await request(app).get(CONFIG.API_PATH+'/user/open-booster/mcd19')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resBooster.status, 200)
        assert.equal(resBooster.body.length, 5)
        // All my-cards
        const resAMC = await request(app).get(CONFIG.API_PATH+'/user/my-cards')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resAMC.status, 200)
        assert.equal(resAMC.body.length, 5)
        // One my-cards
        const resOMC = await request(app).get(CONFIG.API_PATH+'/user/my-cards/'+resAMC.body[0].card.id)
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resOMC.status, 200)
        // Info
        const resInfo = await request(app).get(CONFIG.API_PATH+'/user/info/')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resInfo.status, 200)
        assert.equal(resInfo.body.login, user1.login)
        assert.equal(resInfo.body.pseudo, user1.pseudo)
        // Searched add
        const resSAdd = await request(app).post(CONFIG.API_PATH+'/user/searched/add')
            .send({id: "test"})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resSAdd.status, 200)
        // Searched
        const resSearched = await request(app).get(CONFIG.API_PATH+'/user/searched')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resSearched.status, 200)
        assert.equal(resSearched.body.length, 1);
        // Update
        const resUpdate = await request(app).put(CONFIG.API_PATH+'/user/update')
            .send({pseudo: "modified"})
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resUpdate.status, 200)
        // Delete
        const resDelete = await request(app).delete(CONFIG.API_PATH+'/user/delete')
            .set("Authorization", `Bearer ${token}`)
        assert.equal(resDelete.status, 200)
    })

})

