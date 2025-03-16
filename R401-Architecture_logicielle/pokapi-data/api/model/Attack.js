import {Model, SchemaTypes as S} from "./Model.js";

export class Attack extends Model {

    static schema = {
        name: S.String,
        cost: S.StringArray,
        convertedEnergyCost: S.Number,
        damage: S.String,
        text: S.String
    }

    constructor(data) {
        super(data)

        this.name = data.name
        this.cost = data.cost
        this.convertedEnergyCost = data.convertedEnergyCost
        this.damage = data.damage
        this.text = data.text
    }
}