import {Model} from "./Model.js"
import {CardMarket} from "./CardMarket.js";
import {SetInfo} from "./SetInfo.js";
import {Resistance} from "./Resistance.js";
import {Weakness} from "./Weakness.js";
import {Attack} from "./Attack.js";
import {Ability} from "./Ability.js";

export class CardImage extends Model {
    static schema = {
        small: {type: "string", objectName: ""},
        large: {type: "string", objectName: ""}
    }

    constructor(data) {
        super(data);

        this.small = data.small
        this.large = data.large
    }
}

export class Card extends Model {

    static schema = {
        id: {type: "string", objectName: ""},
        name: {type: "string", objectName: ""},
        supertype: {type: "string", objectName: ""},
        subtypes: {type: "array", objectName: "string"},
        level: {type: "string", objectName: ""},
        hp: {type: "string", objectName: ""},
        types: {type: "array", objectName: "string"},
        evolvesFrom: {type: "string", objectName: ""},
        abilities: {type: "array", objectName: Ability},
        attacks: {type: "array", objectName: Attack},
        weaknesses: {type: "array", objectName: Weakness},
        resistances: {type: "array", objectName: Resistance},
        retreatCost: {type: "array", objectName: "string"},
        convertedRetreatCost: {type: "number", objectName: ""},
        set: {type: "object", objectName: SetInfo},
        number: {type: "string", objectName: ""},
        artist: {type: "string", objectName: ""},
        rarity: {type: "string", objectName: ""},
        flavorText: {type: "string", objectName: ""},
        nationalPokedexNumbers: {type: "array", objectName: "number"},
        images: {type: "object", objectName: CardImage},
        cardmarket: {type: "object", objectName: CardMarket}
    }

    constructor(data) {
        super(data);

        this.id = data.id
        this.name = data.name
        this.supertype = data.supertype
        this.subtypes = data.subtypes
        this.level = data.level
        this.hp = data.hp
        this.types = data.types
        this.evolvesFrom = data.evolvesFrom
        this.abilities = data.abilities.map(ability => new Ability(ability))
        this.attacks = data.attacks.map(attack => new Attack(attack))
        this.weaknesses = data.weaknesses.map(weakness => new Weakness(weakness))
        this.resistances = data.resistances.map(resistance => new Resistance(resistance))
        this.retreatCost = data.retreatCost
        this.convertedRetreatCost = data.convertedRetreatCost
        this.set = new SetInfo(data.set)
        this.number = data.number
        this.artist = data.artist
        this.rarity = data.rarity
        this.flavorText = data.flavorText
        this.nationalPokedexNumbers = data.nationalPokedexNumbers
        this.images = data.images
        this.cardmarket = new CardMarket(data.cardmarket)
    }
}