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

    it("/card/:id wrong",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/card/wrong")
        assert.equal(response.status, 404);
    })

    it("/card/:id valid",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/card/dp3-1")
        assert.equal(response.status, 200);
        assert.equal(response.body.id, "dp3-1")
    })

    it("/set/:setId wrong",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/set/wrong")
        assert.equal(response.status, 404);
    })

    it("/set/:setId valid",async ()=>{
        const response = await request(app).get(CONFIG.API_PATH+"/set/mcd19")
        assert.equal(response.status, 200);
        assert.equal(response.body.id, "mcd19")
    })

})

