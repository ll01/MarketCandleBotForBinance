"use strict"
const mongoose = require('mongoose');
var request = require('request');

const candleSchema = mongoose.Schema({
    openTime: {type:Number,index:true},
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


const klineurl = 'https://api.binance.com/api/v1/klines?limit=1000&interval=1m&symbol=';
const connectionStringBase = "mongodb://localhost/";
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

var GetInfo = function GetInfo(symbol) {
    this.symbol = symbol;
    this.connectionString = connectionStringBase + symbol;
}

GetInfo.prototype.storeData = function (data) {
   var conntection = mongoose.connect(this.connectionString);
   
    var CandleModel = mongoose.model('candle', candleSchema, 'Candles');
    data.forEach(rawData => {
        let candle = ConvertDataPointToCandleOject(rawData);
        const newCandle = new CandleModel((candle));
    CandleModel.findOneAndUpdate({openTime: candle.openTime},candle, err => {
        if (err) {console.log(err);}
        
    })
    });
};
GetInfo.prototype.Run = function () {

    request.get({
        url: klineurl + this.symbol,
        json: true,
    }, (err, response, data) => {
        console.log(response);
        if (err) { console.log(err); }
        else {
            this.storeData(data);
        }


    });


}

module.exports = GetInfo;
