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

        Object.keys(this.constructor.schema).forEach((attr)=>{
            if(data[attr] != undefined){
                if(["","string","number"].includes(this.constructor.schema[attr].objectName)){
                    this[attr] = data[attr]
                }else{
                    if(this.constructor.schema[attr].type == "object"){
                        this[attr] = new this.constructor.schema[attr].objectName(data[attr])
                    }else{
                        this[attr] = data[attr].map(content => new this.constructor.schema[attr].objectName(content))
                    }
                }
            }
        })
    }
}