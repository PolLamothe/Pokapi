'use strict';

import assert from "node:assert"
import {before, describe, it} from "node:test"
import raritiesFetchDAO from "../../api/dao/raritiesFetchDAO.js";
import CONFIG from "../../const.js";

describe("DAO - raritiesFetchDAO", () => {
    before(() => {
        CONFIG.LOGS = false
    })

    it("Find all rarities", async () => {
        const res = await raritiesFetchDAO.findAll()
        assert.ok(Array.isArray(res))
        assert.ok(res.length > 0)
        res.forEach(s => {
            assert.ok(typeof s === "string")
        })
    })
})