"use strict"
const mongoose = require('mongoose');
var request = require('request');

const candleSchema = mongoose.Schema({
    openTime: { type: Number, index: true },
    open: String,
    high: String,
    low: String,
    close: String,
    volume: String,
    closeTime: Number,
    quoteAssetVolume: String,
    numberOfTrades: Number,
    takerBaseAssetVolume: String,
    takerQuoteAssetVolume: String,
    Ignore: String,

});

const klineBase = "https://api.binance.com/api/v1/klines"
function ConvertDataPointToCandleOject(data) {
    return {
        openTime: data[0],
        open: data[1],
        high: data[2],
        low: data[3],
        close: data[4],
        volume: data[5],
        closeTime: data[6],
        quoteAssetVolume: data[7],
        numberOfTrades: data[8],
        takerBaseAssetVolume: data[9],
        takerQuoteAssetVolume: data[10],
        Ignore: data[11],
    }

}

var GetInfo = function GetInfo(settings) {
    this.klineurl = `${klineBase}?limit=${settings.limit}&interval=${settings.interval}&symbol`;
    this.connectionString = settings.connectionstring;
}

GetInfo.prototype.storeData = function (symbol, data) {
    var conntection = mongoose.connect(this.connectionString);

    var CandleModel = mongoose.model('candle', candleSchema, `${symbol}-Candles`);
    data.forEach(rawData => {
        let candle = ConvertDataPointToCandleOject(rawData);
        const newCandle = new CandleModel((candle));
        const options = { upsert: true, setDefaultsOnInsert: true };
        CandleModel.findOneAndUpdate({ openTime: candle.openTime }, candle, options, err => {
            if (err) { console.log(err); }
        })
    });
};
GetInfo.prototype.Run = function () {

    this.symbols.forEach(i => {
        request.get({
            url: this.klineurl + i,
            json: true,
        }, (err, response, data) => {
            if (err) { console.log(err); }
            else {
                this.storeData(i, data);
            }


        });
    });

}

module.exports = GetInfo;
