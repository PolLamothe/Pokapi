import {Model, SchemaTypes as S} from "./Model.js";

export class SetImage extends Model {

    static schema = {
        symbol: S.String,
        logo: S.String,
    }

    constructor(data) {
        super(data)
    }
}

export class SetInfo extends Model {

    static schema = {
        id: S.String,
        name: S.String,
        series: S.String,
        printedTotal: S.Number,
        total: S.Number,
        ptcgoCode: S.StringOptional,
        releaseDate: S.String,
        updatedAt: S.String,
        images: {type: "object", objectName: SetImage, required: true},
        storageDate : S.NumberOptional
    }

    //fonction pour comparer deux instances sans prendre en compte l'attribut storageDate
    compare(otherSet){
        Object.keys(this.constructor.schema).forEach(attribute=>{
            if(attribute != "storageDate"){
                try{
                    deepEqual(this[attribute],otherSet[attribute])
                }catch(e){
                    return false

                }
            }
        })
        return true
    }

    constructor(data) {
        super(data);
    }
}