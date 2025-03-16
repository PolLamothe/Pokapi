import {Model, SchemaTypes as S} from "./Model.js";

export class SetImage extends Model {

    static schema = {
        symbol: S.String,
        logo: S.String,
    }

    constructor(data) {
        super(data);

        this.symbol = data.symbol;
        this.logo = data.logo;
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
    }

    constructor(data) {
        super(data);

        this.id = data.id
        this.name = data.name
        this.series = data.series
        this.printedTotal = data.printedTotal
        this.total = data.total
        this.ptcgoCode = data.ptcgoCode || null
        this.releaseDate = data.releaseDate
        this.updatedAt = data.updatedAt
        this.images = new SetImage(data.images)
    }
}