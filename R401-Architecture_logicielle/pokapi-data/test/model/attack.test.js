import {describe, it } from "node:test"
import {Attack} from "../../api/model/Attack.js"
import assert from "node:assert"

describe("Model - Attack",()=>{
    const valid = {
        name: "Royal Blaze",
        cost: [
            "Fire",
            "Fire"
        ],
        convertedEnergyCost: 2,
        damage: "100+",
        text: "This attack does 50 more damage for each Leon card in your discard pile."
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new Attack({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new Attack(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new Attack(test),{
                name: 'TypeError'
            })
        })
        // Test table type
        test = Object.assign({}, valid)
        test["cost"] = [BigInt(0), BigInt(0)]
        assert.throws(()=>new Attack(test),{
            name: 'TypeError'
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new Attack(test))
        assert.deepEqual(test, valid)
    })
})