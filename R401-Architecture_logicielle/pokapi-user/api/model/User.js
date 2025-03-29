import {Model, SchemaTypes as S} from "./Model.js";
import {Card} from "./Card.js"

export class User extends Model{
    static schema = {
        pseudo: S.String,
        login: S.String,
        password: S.String,
        cards : {type: "array", objectName: Card, required: true},
        searched : {type: "array", objectName: Card, required: true}
    }

    constructor(data){
        super(data)
    }
}