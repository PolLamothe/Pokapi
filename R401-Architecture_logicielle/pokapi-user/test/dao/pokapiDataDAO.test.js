'use strict'
import assert from "node:assert"
import {after, before, beforeEach, describe, it} from "node:test"
import {pokapiDataDAO} from "../../api/dao/pokapiDataDAO.js";

describe('DAO - PokapiDataDAO', () => {
    it("openBooster valid", async (t) => {
        let result
        try {
            result = await pokapiDataDAO.openBooster("test")
        } catch (e) {
            return t.skip("Make sure to use the Pokapi-stub API to run this test")
        }
        assert.equal(result.length, 5)
    })

    it("openBooster wrong", async (t) => {
        await assert.rejects(pokapiDataDAO.openBooster("wrong"), {
            message: "This set does not exist"
        })
    })

    it("fetchCards", async (t) => {
        let result
        try {
            result = await pokapiDataDAO.fetchCards(["id1", "id2", "id3"])
        } catch (e) {
            return t.skip("Make sure to use the Pokapi-stub API to run this test")
        }
        assert.equal(result.length, 10)
    })

    it("fetchCard", async (t) => {
        let result
        try {
            result = await pokapiDataDAO.fetchCard("dp3-1")
        } catch (e) {
            return t.skip("Make sure to use the Pokapi-stub API to run this test")
        }
        assert.equal(result.id, "dp3-1")
    })
})