import {describe, it } from "node:test"
import {Card, CardImage} from "../../api/model/Card.js"
import assert from "node:assert"
import testCards from '../ressources/cards.json' with {type: 'json'}

describe("Model - Card",()=>{
    const valid = {
        "id": "base1-4",
        "name": "Charizard",
        "supertype": "Pokémon",
        "subtypes": [
            "Stage 2"
        ],
        "level": "76",
        "hp": "120",
        "types": [
            "Fire"
        ],
        "evolvesFrom": "Charmeleon",
        "evolvesTo": ["Charmeleon", "Charmeleon"],
        "abilities": [
            {
                "name": "Energy Burn",
                "text": "As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.",
                "type": "Pokémon Power"
            }
        ],
        "attacks": [
            {
                "name": "Fire Spin",
                "cost": [
                    "Fire",
                    "Fire",
                    "Fire",
                    "Fire"
                ],
                "convertedEnergyCost": 4,
                "damage": "100",
                "text": "Discard 2 Energy cards attached to Charizard in order to use this attack."
            }
        ],
        "weaknesses": [
            {
                "type": "Water",
                "value": "×2"
            }
        ],
        "resistances": [
            {
                "type": "Fighting",
                "value": "-30"
            }
        ],
        "retreatCost": [
            "Colorless",
            "Colorless",
            "Colorless"
        ],
        "convertedRetreatCost": 3,
        "set": {
            "id": "base1",
            "name": "Base",
            "series": "Base",
            "printedTotal": 102,
            "total": 102,
            "legalities": {
                "unlimited": "Legal"
            },
            "ptcgoCode": "BS",
            "releaseDate": "1999/01/09",
            "updatedAt": "2022/10/10 15:12:00",
            "images": {
                "symbol": "https://images.pokemontcg.io/base1/symbol.png",
                "logo": "https://images.pokemontcg.io/base1/logo.png"
            }
        },
        "number": "4",
        "artist": "Mitsuhiro Arita",
        "rarity": "Rare Holo",
        "flavorText": "Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires.",
        "nationalPokedexNumbers": [
            6
        ],
        "legalities": {
            "unlimited": "Legal"
        },
        "images": {
            "small": "https://images.pokemontcg.io/base1/4.png",
            "large": "https://images.pokemontcg.io/base1/4_hires.png"
        },
        "tcgplayer": {
            "url": "https://prices.pokemontcg.io/tcgplayer/base1-4",
            "updatedAt": "2025/03/15",
            "prices": {
                "holofoil": {
                    "low": 288,
                    "mid": 552.96,
                    "high": 1249.99,
                    "market": 453.59,
                    "directLow": null
                }
            }
        },
        "cardmarket": {
            "url": "https://prices.pokemontcg.io/cardmarket/base1-4",
            "updatedAt": "2025/03/15",
            "prices": {
                "averageSellPrice": 600,
                "lowPrice": 599,
                "trendPrice": 1294.82,
                "germanProLow": 0,
                "suggestedPrice": 0,
                "reverseHoloSell": 0,
                "reverseHoloLow": 0,
                "reverseHoloTrend": 0,
                "lowPriceExPlus": 1000,
                "avg1": 499.99,
                "avg7": 1600.57,
                "avg30": 1711.29,
                "reverseHoloAvg1": 0,
                "reverseHoloAvg7": 0,
                "reverseHoloAvg30": 0
            }
        }
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new Card({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            // Don't test optional attributes
            if (["legalities", "tcgplayer", "level", "evolvesFrom", "retreatCost",
                "convertedRetreatCost", "rarity", "flavorText", "abilities", "resistances",
                "weaknesses", "attacks", "cardmarket", "evolvesTo", "hp", "types", 
                "nationalPokedexNumbers", "artist", "subtypes"].includes(key)) return
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new Card(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            if (["legalities", "tcgplayer"].includes(key)) return
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new Card(test),{
                name: 'TypeError'
            })
        })
        // Test table type
        const arrayTested = ["subtypes", "types", "retreatCost", "nationalPokedexNumbers"]
        arrayTested.forEach(a => {
            test = Object.assign({}, valid)
            test[a] = [BigInt(0), BigInt(0)]
            assert.throws(()=>new Card(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        const testArray = testCards.data
        testArray.forEach((c, i) => {
            test = Object.assign({}, c)
            assert.doesNotThrow(()=> new Card(test), TypeError, `Index ${i} ; Card ${c.id}`)
            assert.deepEqual(test, c)
        })
    })
})

describe("Model - CardImage",()=>{
    const valid = {
        small: "https://images.pokemontcg.io/base1/4.png",
        large: "https://images.pokemontcg.io/base1/4_hires.png"
    }
    let test = null

    it("Empty parameter",()=>{
        assert.throws(()=> new CardImage({}), {
            name: "TypeError"
        })
    })
    it("Missing attribute",()=>{
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            delete test[key]
            assert.throws(()=> new CardImage(test),{
                name: 'TypeError'
            })
        })
    })
    it("Wrong type attribut", ()=> {
        Object.keys(valid).forEach((key)=> {
            test = Object.assign({}, valid)
            test[key]=BigInt(0)
            assert.throws(()=>new CardImage(test),{
                name: 'TypeError'
            })
        })
    })
    it("OK", ()=> {
        test = Object.assign({}, valid)
        assert.doesNotThrow(()=> new CardImage(test))
        assert.deepEqual(test, valid)
    })
})