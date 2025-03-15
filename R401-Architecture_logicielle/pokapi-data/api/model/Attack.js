import {Model} from "./Model.js";

export class Attack extends Model {

    static schema = {
        name: {type: "string", objectName: ""},
        cost: {type: "array", objectName: "string"},
        convertedEnergyCost: {type: "number", objectName: ""},
        damage: {type: "string", objectName: ""},
        text: {type: "string", objectName: ""}
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