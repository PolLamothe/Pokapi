import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import setFetchDAO from "../../api/dao/setFetchDAO.js";
import {SetInfo} from "../../api/model/SetInfo.js";

describe("DAO - SetFetchDAO", () => {
    it("Find all sets", async () => {
        const res = await setFetchDAO.findAll()
        assert.ok(Array.isArray(res))
        assert.ok(res.length > 0)
        res.forEach(s => {
            assert.ok(s instanceof SetInfo)
        })
    })
})