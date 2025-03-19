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
        evolvesTo: S.StringArrayOptional,
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
    }
}