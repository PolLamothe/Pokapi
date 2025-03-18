import {describe, it } from "node:test"
import {Card} from "../../api/model/Card.js"
import assert from "node:assert"

describe("Model - Card",()=>{
    const valid = {
        id : "Arceus",
        quantity: 3
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new Card({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            if (key === "quantity") return
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new Card(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new Card(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
            test = Object.assign({}, valid)
            assert.doesNotThrow(()=> new Card(test))
            assert.deepEqual(test, valid)
    })
})