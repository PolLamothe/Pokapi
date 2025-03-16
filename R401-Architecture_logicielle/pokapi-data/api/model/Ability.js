import {Model, SchemaTypes as S} from "./Model.js"

export class Ability extends Model {

    static schema = {
        name: S.String,
        text: S.String,
        type: S.String
    }

    constructor(data) {
        super(data);

        this.name = data.name
        this.text = data.text
        this.type = data.type
    }
}