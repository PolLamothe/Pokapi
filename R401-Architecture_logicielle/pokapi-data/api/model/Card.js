import {Model, SchemaTypes as S} from "./Model.js"
import {CardMarket} from "./CardMarket.js";
import {SetInfo} from "./SetInfo.js";
import {Resistance} from "./Resistance.js";
import {Weakness} from "./Weakness.js";
import {Attack} from "./Attack.js";
import {Ability} from "./Ability.js";
import { deepEqual } from "node:assert"

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
        subtypes: S.StringArrayOptional,
        level: S.StringOptional,
        hp: S.StringOptional,
        types: S.StringArrayOptional,
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
        artist: S.StringOptional,
        rarity: S.StringOptional,
        flavorText: S.StringOptional,
        nationalPokedexNumbers: S.NumberArrayOptional,
        images: {type: "object", objectName: CardImage, required: true},
        cardmarket: {type: "object", objectName: CardMarket, required: false},
        storageDate : S.NumberOptional
    }

    //fonction pour comparer deux instances sans prendre en compte les attributs cardmarket et storageDate
    compare(otherCard){
        Object.keys(this.constructor.schema).forEach(attribute=>{
            if(!["cardmarket","storageDate","set"].includes(attribute)){
                try{
                    deepEqual(this[attribute],otherCard[attribute])
                }catch(e){
                    return false

                }
            }
        })
        return true
    }

    constructor(data) {
        super(data);
    }
}