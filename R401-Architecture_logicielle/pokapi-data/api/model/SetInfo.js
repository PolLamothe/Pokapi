import {Model} from "./Model.js";

export class SetImage extends Model {

    static schema = {
        symbol: {type: "string", objectName: ""},
        logo: {type: "string", objectName: ""},
    }

    constructor(data) {
        super(data);

        this.symbol = data.symbol;
        this.logo = data.logo;
    }
}

export class SetInfo extends Model {

    static schema = {
        id: {type: "string", objectName: ""},
        name: {type: "string", objectName: ""},
        series: {type: "string", objectName: ""},
        printedTotal: {type: "number", objectName: ""},
        total: {type: "number", objectName: ""},
        ptcgoCode: {type: "string", objectName: ""},
        releaseDate: {type: "string", objectName: ""},
        updatedAt: {type: "string", objectName: ""},
        images: {type: "object", objectName: SetImage}
    }

    constructor(data) {
        super(data);

        this.id = data.id
        this.name = data.name
        this.series = data.series
        this.printedTotal = data.printedTotal
        this.total = data.total
        this.ptcgoCode = data.ptcgoCode
        this.releaseDate = data.releaseDate
        this.updatedAt = data.updatedAt
        this.images = new SetImage(data.images)
    }
}