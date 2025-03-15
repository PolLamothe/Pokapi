import {Model} from "./Model.js";

export class CardMarketPrices extends Model {
    static schema = {
        averageSellPrice: {type: "number", objectName: ""},
        lowPrice: {type: "number", objectName: ""},
        trendPrice: {type: "number", objectName: ""},
        germanProLow: {type: "number", objectName: ""},
        suggestedPrice: {type: "number", objectName: ""},
        reverseHoloSell: {type: "number", objectName: ""},
        reverseHoloLow: {type: "number", objectName: ""},
        reverseHoloTrend: {type: "number", objectName: ""},
        lowPriceExPlus: {type: "number", objectName: ""},
        avg1: {type: "number", objectName: ""},
        avg7: {type: "number", objectName: ""},
        avg30: {type: "number", objectName: ""},
        reverseHoloAvg1: {type: "number", objectName: ""},
        reverseHoloAvg7: {type: "number", objectName: ""},
        reverseHoloAvg30: {type: "number", objectName: ""}
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
        url: {type: "string", objectName: ""},
        updatedAt: {type: "string", objectName: ""},
        prices: {type: "object", objectName: CardMarketPrices}
    }

    constructor(data) {
        super(data);

        this.url = data.url
        this.updatedAt = data.updatedAt
        this.prices = data.prices
    }
}