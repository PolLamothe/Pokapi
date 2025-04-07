'use strict'
import assert from "node:assert"
import {after, before, beforeEach, describe, it} from "node:test"
import {pokapiDataDAO} from "../../api/dao/pokapiDataDAO.js";

describe('DAO - PokapiDataDAO', () => {
    it("openBooster", async (t) => {
        let result
        try {
            result = await pokapiDataDAO.openBooster("test")
        } catch (e) {
            t.skip("Make sure to use the Pokapi-stub API to run this test")
            return
        }
        assert.equal(result.length, 5)
    })

    it("fetchCards", async (t) => {
        let result
        try {
            result = await pokapiDataDAO.fetchCards(["id1", "id2", "id3"])
        } catch (e) {
            t.skip("Make sure to use the Pokapi-stub API to run this test")
            return
        }
        assert.equal(result.length, 10)
    })
})