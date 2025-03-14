function validateTypes(data, schema) {
    for (const key in schema) {
        if (data[key] == undefined || typeof data[key] != schema[key]) {
            throw new TypeError(`Invalid type for ${key}: expected ${schema[key]}, got ${typeof data[key]}`)
        }
    }
}

class Ability {
    constructor(data) {
        const schema = { name: "string", text: "string", type: "string" }
        validateTypes(data, schema)

        this.name = data.name
        this.text = data.text
        this.type = data.type
    }
}

class Attack {
    constructor(data) {
        const schema = { name: "string", cost: "object", convertedEnergyCost: "number", damage: "string", text: "string" }
        validateTypes(data, schema)

        this.name = data.name
        this.cost = data.cost || []
        this.convertedEnergyCost = data.convertedEnergyCost
        this.damage = data.damage
        this.text = data.text
    }
}

class Weakness {
    constructor(data) {
        const schema = { type: "string", value: "string" }
        validateTypes(data, schema)

        this.type = data.type
        this.value = data.value
    }
}

class Resistance {
    constructor(data) {
        const schema = { type: "string", value: "string" }
        validateTypes(data, schema)

        this.type = data.type
        this.value = data.value
    }
}

class SetInfo {
    constructor(data) {
        const schema = {
            id: "string", name: "string", series: "string", printedTotal: "number", total: "number",
            ptcgoCode: "string", releaseDate: "string", updatedAt: "string", images: "object"
        }
        validateTypes(data, schema)

        this.id = data.id
        this.name = data.name
        this.series = data.series
        this.printedTotal = data.printedTotal
        this.total = data.total
        this.legalities = data.legalities || {}
        this.ptcgoCode = data.ptcgoCode
        this.releaseDate = data.releaseDate
        this.updatedAt = data.updatedAt
        this.images = data.images || {}
    }
}

class PriceInfo {
    constructor(data) {
        const schema = { low: "number", mid: "number", high: "number", market: "number", directLow: "number" }
        validateTypes(data, schema)

        this.low = data.low
        this.mid = data.mid
        this.high = data.high
        this.market = data.market
        this.directLow = data.directLow
    }
}

class TCGPlayer {
    constructor(data) {
        const schema = { url: "string", updatedAt: "string" }
        validateTypes(data, schema)

        this.url = data.url
        this.updatedAt = data.updatedAt
        this.prices = {
            holofoil: data.prices?.holofoil ? new PriceInfo(data.prices.holofoil) : null,
            reverseHolofoil: data.prices?.reverseHolofoil ? new PriceInfo(data.prices.reverseHolofoil) : null
        }
    }
}

class CardMarket {
    constructor(data) {
        const schema = { url: "string", updatedAt: "string", prices: "object" }
        validateTypes(data, schema)

        this.url = data.url
        this.updatedAt = data.updatedAt
        this.prices = data.prices || {}
    }
}

class Card {
    constructor(data) {
        const schema = {
            id: "string", name: "string", supertype: "string", subtypes: "object", level: "string",
            hp: "string", types: "object", evolvesFrom: "string", retreatCost: "object",
            convertedRetreatCost: "number", number: "string", artist: "string", rarity: "string",
            flavorText: "string", nationalPokedexNumbers: "object", legalities: "object",
            images: "object"
        }
        validateTypes(data, schema)

        this.id = data.id
        this.name = data.name
        this.supertype = data.supertype
        this.subtypes = data.subtypes || []
        this.level = data.level
        this.hp = data.hp
        this.types = data.types || []
        this.evolvesFrom = data.evolvesFrom
        this.abilities = (data.abilities || []).map(ability => new Ability(ability))
        this.attacks = (data.attacks || []).map(attack => new Attack(attack))
        this.weaknesses = (data.weaknesses || []).map(weakness => new Weakness(weakness))
        this.resistances = (data.resistances || []).map(resistance => new Resistance(resistance))
        this.retreatCost = data.retreatCost || []
        this.convertedRetreatCost = data.convertedRetreatCost
        this.set = data.set ? new SetInfo(data.set) : null
        this.number = data.number
        this.artist = data.artist
        this.rarity = data.rarity
        this.flavorText = data.flavorText
        this.nationalPokedexNumbers = data.nationalPokedexNumbers || []
        this.legalities = data.legalities || {}
        this.images = data.images || {}
        this.tcgplayer = data.tcgplayer ? new TCGPlayer(data.tcgplayer) : null
        this.cardmarket = data.cardmarket ? new CardMarket(data.cardmarket) : null
    }
}

export default { Card, Ability, Attack, Weakness, Resistance, SetInfo, TCGPlayer, CardMarket }