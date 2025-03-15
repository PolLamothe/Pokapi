import {describe, it } from "node:test"
import {SetInfo, SetImage} from "../../api/model/SetInfo.js"
import assert from "node:assert"

describe("Model - SetInfo",()=>{
    const valid = {
        id: "base1",
        name: "Base",
        series: "Base",
        printedTotal: 102,
        total: 102,
        legalities: {
            unlimited: "Legal"
        },
        ptcgoCode: "BS",
        releaseDate: "1999/01/09",
        updatedAt: "2022/10/10 15:12:00",
        images: {
            symbol: "https://images.pokemontcg.io/base1/symbol.png",
            logo: "https://images.pokemontcg.io/base1/logo.png"
        }
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new SetInfo({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            if (key === "legalities") return
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new SetInfo(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            if (key === "legalities") return
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new SetInfo(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new SetInfo(test))
        assert.deepEqual(test, valid)
    })
})

describe("Model - SetImage",()=>{
    const valid = {
        symbol: "https://images.pokemontcg.io/base1/symbol.png",
        logo: "https://images.pokemontcg.io/base1/logo.png"
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new SetImage({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new SetImage(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new SetImage(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new SetImage(test))
        assert.deepEqual(test, valid)
    })
})