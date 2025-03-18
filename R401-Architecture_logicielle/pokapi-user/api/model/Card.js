import {Model, SchemaTypes as S} from "./Model.js";

export class Card extends Model{
    static schema = {
        id : S.String,
        quantity : S.NumberOptional
    }

    constructor(data){
        super(data)
    }
}