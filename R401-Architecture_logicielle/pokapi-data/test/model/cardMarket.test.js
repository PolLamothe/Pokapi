import {describe, it } from "node:test"
import {CardMarket, CardMarketPrices} from "../../api/model/CardMarket.js"
import assert from "node:assert"

describe("Model - CardMarket",()=>{
    const valid = {
        url: "https://prices.pokemontcg.io/cardmarket/base1-4",
        updatedAt: "2025/03/15",
        prices: {
            averageSellPrice: 600,
            lowPrice: 599,
            trendPrice: 1294.82,
            germanProLow: 0,
            suggestedPrice: 0,
            reverseHoloSell: 0,
            reverseHoloLow: 0,
            reverseHoloTrend: 0,
            lowPriceExPlus: 1000,
            avg1: 499.99,
            avg7: 1600.57,
            avg30: 1711.29,
            reverseHoloAvg1: 0,
            reverseHoloAvg7: 0,
            reverseHoloAvg30: 0
        }
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new CardMarket({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new CardMarket(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new CardMarket(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new CardMarket(test))
        assert.deepEqual(test, valid)
    })
})

describe("Model - CardMarketPrices",()=>{
    const valid = {
        averageSellPrice: 600,
        lowPrice: 599,
        trendPrice: 1294.82,
        germanProLow: 0,
        suggestedPrice: 0,
        reverseHoloSell: 0,
        reverseHoloLow: 0,
        reverseHoloTrend: 0,
        lowPriceExPlus: 1000,
        avg1: 499.99,
        avg7: 1600.57,
        avg30: 1711.29,
        reverseHoloAvg1: 0,
        reverseHoloAvg7: 0,
        reverseHoloAvg30: 0
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new CardMarketPrices({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new CardMarketPrices(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new CardMarketPrices(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new CardMarketPrices(test))
        assert.deepEqual(test, valid)
    })
})