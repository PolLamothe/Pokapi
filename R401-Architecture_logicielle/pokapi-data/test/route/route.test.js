'use strict'

import request from "supertest"
import {after, before, beforeEach, describe, it} from "node:test"
import assert from "node:assert"
import mongoose from "mongoose";
import CONFIG from "../../const.js";
import app from "../../app.js";
import setDAO from "../../api/dao/setDAO.js";
import cardDAO from "../../api/dao/cardDAO.js";

let mongod=null
let connexion = null

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
        await setDAO.deleteAll()
        await cardDAO.deleteAllCards()
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })

    it("GET /card/:id wrong",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/card/wrong")
        assert.equal(response.status, 404);
    })

    it("GET /card/:id valid",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/card/dp3-1")
        assert.equal(response.status, 200);
        assert.equal(response.body.id, "dp3-1")
    })

    it("GET /set/:setId wrong",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/set/wrong")
        assert.equal(response.status, 404);
    })

    it("GET /set/:setId valid",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/set/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.id, "mcd19")
    })

    it("GET /set/cards/:setId wrong", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/set/cards/wrong")
        assert.equal(response.status, 404);
    })

    it("GET /set/cards/:setId valid", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/set/cards/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.length, response.body[0].set.total)
    })

    it("GET /open-booster/:setId wrong", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/open-booster/wrong")
        assert.equal(response.status, 404);
    })

    it("GET /open-booster/:setId valid", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/open-booster/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 5)
        assert.equal(response.body[3].set.id, "mcd19")
    })

    it("GET /sets valid", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/sets")
        assert.equal(response.status, 200);
        assert.ok(response.body.length > 0);
    })

    it("GET /set/presentation/:setId wrong", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/set/presentation/wrong")
        assert.equal(response.status, 404);
    })

    it("GET /set/presentation/:setId valid", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/set/presentation/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.images.length, 4);
        assert.equal(response.body.set.id, "mcd19");
    })

    it("POST /cards valid", async () => {
        const response = await request(app).post(CONFIG.API_PATH+"/cards")
            .send({cards: ["dp3-1", "xy1-1", "xy1-2"]})
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 3);
    })

    it("GET /card/evolution/:id wrong card", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/card/evolution/wrong")
        assert.equal(response.status, 404);
    })

    it("GET /card/evolution/:id no evolution", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/card/evolution/xy1-2")
        assert.equal(response.status, 400);
    })

    it("GET /card/evolution/:id several evolutions", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/card/evolution/pop3-13")
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 3);
        assert.equal(response.body[1].set.id, "pop3");
    })

    it("POST /deck-price one wrong card", async () => {
        const response = await request(app).post(CONFIG.API_PATH+"/deck-price")
            .send({deck: ["xy1-1", "xy1-2", "wrong"]})
        assert.equal(response.status, 404);
    })

    it("POST /deck-price valid", async () => {
        const response = await request(app).post(CONFIG.API_PATH+"/deck-price")
            .send({deck: ["xy1-1", "xy1-2"]})
        assert.equal(response.status, 200);
        assert.ok(response.body > 0);
    })

    it("GET /types", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/types")
        assert.equal(response.status, 200);
        assert.ok(response.body.length > 0);
    })

    it("GET /rarities", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/rarities")
        assert.equal(response.status, 200);
        assert.ok(response.body.length > 0);
    })
})

