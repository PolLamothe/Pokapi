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

    it("addCards", () => {
        const user = new User(valid)
        user.addCards([{id: "New"}, {id: "Mew"}, {id: "Dialga"}])
        const expected = [
            {
                id: "Mew",
                quantity : 4
            },
            {
                id: "Dialga",
                quantity: 1
            },
            {
                id: "New",
                quantity: 1
            }
        ]
        assert.deepEqual(user.cards, expected)
    })

    it("addSearchedCard", () => {
        const user = new User(valid)
        assert.throws(() => user.addSearchedCard("Palkia"))
        const expected = [
            {id:"Palkia", quantity: null},
            {id : "Arceus", quantity: null},
            {id: "New", quantity: null}
        ]
        user.addSearchedCard("New")
        assert.deepEqual(user.searched, expected)
    })
})