import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import cardDAO from "../../api/dao/cardDAO.js"

let mongod=null
let connexion = null

describe('Dao - CardDAO', () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await cardDAO.deleteAllCards()
    })

    it('addOneCard', {todo: true}, () => {
        // TODO
    })

    it('addManyCards', {todo: true}, () => {
        // TODO
    })

    it('findCardEvolution', {todo: true}, () => {
        // TODO
    })

    it('findAllSets', {todo: true}, () => {
        // TODO
    })

    it('findCardsBySet', {todo: true}, () => {
        // TODO
    })

    it('updateCard', {todo: true}, () => {
        // TODO
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})