import {Model, SchemaTypes as S} from "./Model.js"
import {CardMarket} from "./CardMarket.js";
import {SetInfo} from "./SetInfo.js";
import {Resistance} from "./Resistance.js";
import {Weakness} from "./Weakness.js";
import {Attack} from "./Attack.js";
import {Ability} from "./Ability.js";

export class CardImage extends Model {
    static schema = {
        small: S.String,
        large: S.String
    }

    constructor(data) {
        super(data);

        this.small = data.small
        this.large = data.large
    }
}

export class Card extends Model {

    static schema = {
        id: S.String,
        name: S.String,
        supertype: S.String,
        subtypes: S.StringArray,
        level: S.StringOptional,
        hp: S.String,
        types: S.StringArray,
        evolvesFrom: S.StringOptional,
        abilities: {type: "array", objectName: Ability, required: false},
        attacks: {type: "array", objectName: Attack, required: false},
        weaknesses: {type: "array", objectName: Weakness, required: false},
        resistances: {type: "array", objectName: Resistance, required: false},
        retreatCost: S.StringArrayOptional,
        convertedRetreatCost: S.NumberOptional,
        set: {type: "object", objectName: SetInfo, required: true},
        number: S.String,
        artist: S.String,
        rarity: S.StringOptional,
        flavorText: S.StringOptional,
        nationalPokedexNumbers: S.NumberArray,
        images: {type: "object", objectName: CardImage, required: true},
        cardmarket: {type: "object", objectName: CardMarket, required: false}
    }

    constructor(data) {
        super(data);

        this.id = data.id
        this.name = data.name
        this.supertype = data.supertype
        this.subtypes = data.subtypes
        this.level = data.level || null
        this.hp = data.hp
        this.types = data.types
        this.evolvesFrom = data.evolvesFrom || null
        this.abilities = (data.abilities || []).map(ability => new Ability(ability))
        this.attacks = (data.attacks || []).map(attack => new Attack(attack))
        this.weaknesses = (data.weaknesses || []).map(weakness => new Weakness(weakness))
        this.resistances = (data.resistances || []).map(resistance => new Resistance(resistance))
        this.retreatCost = data.retreatCost || null
        this.convertedRetreatCost = data.convertedRetreatCost || null
        this.set = new SetInfo(data.set)
        this.number = data.number
        this.artist = data.artist
        this.rarity = data.rarity || null
        this.flavorText = data.flavorText || null
        this.nationalPokedexNumbers = data.nationalPokedexNumbers
        this.images = data.images
        this.cardmarket = data.cardmarket ? new CardMarket(data.cardmarket) : null
    }
}