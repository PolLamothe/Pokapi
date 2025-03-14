import {describe, it } from "node:test"
import Card from "../api/model/card.js"
import assert from "node:assert"

describe("test card model",()=>{
    it("empty parameter",()=>{
        assert.throws(()=>{
            new Card.Card({})
        })
    })
})