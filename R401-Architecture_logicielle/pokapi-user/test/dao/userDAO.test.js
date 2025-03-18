import mongoose from 'mongoose';
import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import userDAO from "../../api/dao/userDAO.js"

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

    it('addOne', {todo: true}, () => {
        // TODO
    })

    it('addMany', {todo: true}, () => {
        // TODO
    })

    it('update', {todo: true}, () => {
        // TODO
    })

    it('findByPseudo', {todo: true}, () => {
        // TODO
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})