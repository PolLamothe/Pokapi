import {Model, SchemaTypes as S} from "./Model.js";

export class Weakness extends Model {

    static schema = {
        type: S.String,
        value: S.String
    }

    constructor(data) {
        super(data)
    }
}