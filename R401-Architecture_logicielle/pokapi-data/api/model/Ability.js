import {Model} from "./Model.js"

export class Ability extends Model {

    static schema = {
        name: {type: "string", objectName: ""},
        text: {type: "string", objectName: ""},
        type: {type: "string", objectName: ""}
    }

    constructor(data) {
        super(data);

        this.name = data.name
        this.text = data.text
        this.type = data.type
    }
}