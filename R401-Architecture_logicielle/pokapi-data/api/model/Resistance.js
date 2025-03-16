import {Model, SchemaTypes as S} from "./Model.js";

export class Resistance extends Model {

    static schema = {
        type: S.String,
        value: S.String
    }

    constructor(data) {
        super(data);

        this.type = data.type
        this.value = data.value
    }
}