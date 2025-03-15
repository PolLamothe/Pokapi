import {describe, it } from "node:test"
import {Ability} from "../../api/model/Ability.js"
import assert from "node:assert"

describe("Model - Ability",()=>{
    const valid = {
        name: "Battle Sense",
        text: "Once during your turn, you may look at the top 3 cards of your deck and put 1 of them into your hand. Discard the other cards.",
        type: "Ability"
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new Ability({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new Ability(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new Ability(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
            test = Object.assign({}, valid)
            assert.doesNotThrow(()=> new Ability(test))
            assert.deepEqual(test, valid)
    })
})