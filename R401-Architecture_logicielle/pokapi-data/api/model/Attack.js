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
    }
}