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
        super(data);

        this.averageSellPrice = data.averageSellPrice
        this.lowPrice = data.lowPrice
        this.trendPrice = data.trendPrice
        this.germanProLow = data.germanProLow
        this.suggestedPrice = data.suggestedPrice
        this.reverseHoloSell = data.reverseHoloSell
        this.reverseHoloLow = data.reverseHoloLow
        this.reverseHoloTrend = data.reverseHoloTrend
        this.lowPriceExPlus = data.lowPriceExPlus
        this.avg1 = data.avg1
        this.avg7 = data.avg7
        this.avg30 = data.avg30
        this.reverseHoloAvg1 = data.reverseHoloAvg1;
        this.reverseHoloAvg7 = data.reverseHoloAvg7;
        this.reverseHoloAvg30 = data.reverseHoloAvg30;
    }
}

export class CardMarket extends Model {

    static schema = {
        url: S.String,
        updatedAt: S.String,
        prices: {type: "object", objectName: CardMarketPrices, required: true},
    }

    constructor(data) {
        super(data);

        this.url = data.url
        this.updatedAt = data.updatedAt
        this.prices = data.prices
    }
}