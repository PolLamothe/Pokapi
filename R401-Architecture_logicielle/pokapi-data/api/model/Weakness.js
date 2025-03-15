import {Model} from "./Model.js";

export class Weakness extends Model {

    static schema = {
        type: {type: "string", objectName: ""},
        value: {type: "string", objectName: ""}
    }

    constructor(data) {
        super(data)

        this.type = data.type
        this.value = data.value
    }
}