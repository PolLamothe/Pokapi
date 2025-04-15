import {Model, SchemaTypes as S} from "./Model.js";

export class CardMarketPrices extends Model {
    static schema = {
        averageSellPrice: S.Number,
        lowPrice: S.Number,
        trendPrice: S.Number,
        germanProLow: S.Number,
        suggestedPrice: S.Number,
        reverseHoloSell: S.Number,
        reverseHoloLow: S.Number,
        reverseHoloTrend: S.Number,
        lowPriceExPlus: S.Number,
        avg1: S.Number,
        avg7: S.Number,
        avg30: S.Number,
        reverseHoloAvg1: S.Number,
        reverseHoloAvg7: S.Number,
        reverseHoloAvg30: S.Number
    }

    constructor(data) {
        super(data)
    }
}

export class CardMarket extends Model {

    static schema = {
        url: S.String,
        updatedAt: S.String,
        prices: {type: "object", objectName: CardMarketPrices, required: false},
    }

    constructor(data) {
        super(data);
    }
}