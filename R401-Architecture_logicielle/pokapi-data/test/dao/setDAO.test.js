import assert from "node:assert"
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
        assert.deepEqual(await setDAO.findAll(), [])
        await setDAO.addMany([base11, base21])
        assert.deepEqual(await setDAO.findAll(), [base12, base22])
        await setDAO.deleteAll()
        assert.deepEqual(await setDAO.findAll(), [])
    })

    after(async ()=>{
        await mongod.stop()
        connexion.disconnect()
    })
})