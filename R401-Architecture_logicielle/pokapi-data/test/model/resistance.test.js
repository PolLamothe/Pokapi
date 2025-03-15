import {describe, it } from "node:test"
import {Resistance} from "../../api/model/Resistance.js"
import assert from "node:assert"

describe("Model - Resistance",()=>{
    const valid = {
        type: "Fighting",
        value: "-30"
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new Resistance({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new Resistance(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new Resistance(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new Resistance(test))
        assert.deepEqual(test, valid)
    })
})