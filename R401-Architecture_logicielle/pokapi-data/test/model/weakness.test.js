import {describe, it } from "node:test"
import {Weakness} from "../../api/model/Weakness.js"
import assert from "node:assert"

describe("Model - Weakness",()=>{
    const valid = {
        type: "Water",
        value: "×2"
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new Weakness({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new Weakness(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new Weakness(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new Weakness(test))
        assert.deepEqual(test, valid)
    })
})