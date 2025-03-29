import {describe, it } from "node:test"
import {User} from "../../api/model/User.js"
import assert from "node:assert"

describe("Model - User",()=>{
    const valid = {
        pseudo : "Thomas",
        login : "toto",
        password : "1234567",
        cards : [{
            id:"Mew",
            quantity : 3
        },{
            id : "Dialga",
        }],
        searched : [
            {id:"Palkia",},
            {id : "Arceus",}
        ]
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new User({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new User(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new User(test),{
                name: 'TypeError'
            })
        })
        // Test table type
        const arrayTested = ["cards", "searched"]
        arrayTested.forEach(a => {
            test = Object.assign({}, valid)
            test[a] = [BigInt(0), BigInt(0)]
            assert.throws(()=>new User(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
            test = Object.assign({}, valid)
            assert.doesNotThrow(()=> new User(test))
            assert.deepEqual(test, valid)
    })
})