import assert from "node:assert"
import { describe, it} from "node:test"
import setFetchDAO from "../../api/dao/setFetchDAO.js";
import {SetInfo} from "../../api/model/SetInfo.js";

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

describe("DAO - SetFetchDAO", () => {
    it("Find all sets", async () => {
        const res = await setFetchDAO.findAll()
        assert.ok(Array.isArray(res))
        assert.ok(res.length > 0)
        res.forEach(s => {
            assert.ok(s instanceof SetInfo)
        })
    })

    it("Find one",async()=>{
        const base = new SetInfo(set1)
        const res = await setFetchDAO.find(base.id)
        assert.deepEqual(base,res)
    })

    it("Find one wrong",async()=>{
        const res = await setFetchDAO.find("wrong")
        assert.equal(res, null)
    })
})