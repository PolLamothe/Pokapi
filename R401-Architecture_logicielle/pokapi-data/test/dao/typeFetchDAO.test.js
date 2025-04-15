'use strict';

import assert from "node:assert"
import { describe, it} from "node:test"
import typeFetchDAO from "../../api/dao/typeFetchDAO.js";

describe("DAO - typeFetchDAO", () => {
    it("Find all types", async () => {
        const res = await typeFetchDAO.findAll()
        assert.ok(Array.isArray(res))
        assert.ok(res.length > 0)
        res.forEach(s => {
            assert.ok(typeof s === "string")
        })
    })
})