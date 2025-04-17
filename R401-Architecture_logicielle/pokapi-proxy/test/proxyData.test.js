'use strict'

import request from "supertest"
import {before, describe, it} from "node:test"
import assert from "node:assert"
import CONFIG from "../const.js";
import app from "../app.js";

describe("Proxy - Pokapi-data",()=> {
    before(async () => {
        CONFIG.LOGS = false
    })

    it("GET /data/card/:id",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/data/card/dp3-1")
        assert.equal(response.status, 200);
        assert.equal(response.body.id, "dp3-1")
    })

    it("GET /data/set/:setId",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/data/set/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.id, "mcd19")
    })

    it("GET /data/set/cards/:setId", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/data/set/cards/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.length, response.body[0].set.total)
        assert.equal(response.body[0].set.id, "mcd19")
    })

    it("GET /data/open-booster/:setId", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/data/open-booster/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 5)
        assert.equal(response.body[3].set.id, "mcd19")
    })

    it("GET /data/sets", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/data/sets")
        assert.equal(response.status, 200);
        assert.ok(response.body.length > 0);
    })

    it("GET /data/set/presentation/:setId", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/data/set/presentation/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.images.length, 4);
        assert.equal(response.body.set.id, "mcd19");
    })

    it("POST /data/cards", async () => {
        const response = await request(app).post(CONFIG.API_PATH+"/data/cards")
            .send({cards: ["dp3-1", "xy1-1", "xy1-2"]})
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 3);
    })

    it("GET /data/card/evolution/:id", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/data/card/evolution/pop3-13")
        assert.equal(response.status, 200);
        assert.equal(response.body.length, 3);
        assert.equal(response.body[1].set.id, "pop3");
    })

    it("POST /data/deck-price", async () => {
        const response = await request(app).post(CONFIG.API_PATH+"/data/deck-price")
            .send({deck: ["xy1-1", "xy1-2"]})
        assert.equal(response.status, 200);
        assert.ok(response.body > 0);
    })

    it("GET /data/types", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/data/types")
        assert.equal(response.status, 200);
        assert.ok(response.body.length > 0);
    })

    it("GET /data/rarities", async () => {
        const response = await request(app).get(CONFIG.API_PATH+"/data/rarities")
        assert.equal(response.status, 200);
        assert.ok(response.body.length > 0);
    })
})

