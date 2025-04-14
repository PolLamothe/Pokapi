import assert, { deepEqual } from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import setDAO from "../../api/dao/setDAO.js"
import {SetInfo} from "../../api/model/SetInfo.js";
import mongoose from "mongoose";

let mongod=null
let connexion = null

const set1 = {
        "id": "mcd19",
        "name": "McDonald's Collection 2019",
        "series": "Other",
        "printedTotal": 12,
        "total": 12,
        "legalities": {
            "unlimited": "Legal",
            "expanded": "Legal"
        },
        "releaseDate": "2019/10/15",
        "updatedAt": "2022/10/10 15:12:00",
        "images": {
            "symbol": "https://images.pokemontcg.io/mcd19/symbol.png",
            "logo": "https://images.pokemontcg.io/mcd19/logo.png"
        }
}

const set2 = {
    "id": "dp3",
    "name": "Secret Wonders",
    "series": "Diamond & Pearl",
    "printedTotal": 132,
    "total": 132,
    "legalities": {
        "unlimited": "Legal"
    },
    "ptcgoCode": "SW",
    "releaseDate": "2007/11/01",
    "updatedAt": "2018/03/04 10:35:00",
    "images": {
        "symbol": "https://images.pokemontcg.io/dp3/symbol.png",
        "logo": "https://images.pokemontcg.io/dp3/logo.png"
    }
}

describe("DAO - SetDAO", () => {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        connexion = await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await setDAO.deleteAll()
    })

    it("Add many sets find and delete", async () => {
        const base11 = new SetInfo(set1)
        const base12 = new SetInfo(set1)
        const base21 = new SetInfo(set2)
        const base22 = new SetInfo(set2)
        assert((await setDAO.findAll()).length === 0)
        await setDAO.addMany([base11, base21])
        const all = await setDAO.findAll()
        assert(all.length === 2)
        assert(all[0].compare(base12))
        assert(all[1].compare(base22))
        await setDAO.deleteAll()
        assert((await setDAO.findAll()).length === 0)
    })

    it("add-find",async()=>{
        const base11 = new SetInfo(set1)
        assert((await setDAO.add(base11)).compare(base11))
        assert((parseInt(Date.now()/1000) - (await setDAO.find(base11.id)).storageDate) < 1)
        assert((await setDAO.findAll()).length === 1)
        assert((await setDAO.findAll())[0].compare(base11))
        assert((await setDAO.find(base11.id)).compare(base11))
    })

    it("add already here", async () => {
        const base11 = new SetInfo(set1)
        assert((await setDAO.add(base11)).compare(base11))
        assert.ok(!(await setDAO.add(base11)))
    })

    it("update wrong", async () => {
        assert.equal(await setDAO.update("xy", "wrong"), null)
    })

    it("update valid", async () => {
        const base11 = new SetInfo(set1)
        const base12 = new SetInfo(set1)
        const addedSet = await setDAO.add(base11)
        await new Promise(resolve => setTimeout(resolve, 1000))
        const updatedSet = await setDAO.update(base12.id, addedSet)
        assert.ok((parseInt(Date.now()/1000) - updatedSet.storageDate < 1))
        assert.ok(updatedSet.compare(base12))
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})