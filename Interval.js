"use strict"
function Interval(intervalString) {
    const timeSpaceString = intervalString.slice(-1)
    const multiplyerString = intervalString.slice(0, intervalString.length - 1)
    var timeSpace = 0
    switch (timeSpaceString) {
        case "m":
            timeSpace = 60
            break;
        case "h":
            timeSpace = 60 * 60
            break;
        case "d":
            timeSpace = 60 * 60 * 24
            break;
        case "w":
            timeSpace = 60 * 60 * 24 * 7
            break;
        case "M":
            timeSpace = 60 * 60 * 24 * 7 * 28
            break;

        default:
            throw new Error("invalid interval time span")
            break;
    }
    var multiplyer = parseInt(multiplyerString)
    if (isNaN(multiplyer)) {
        throw new Error("invalid interval time interval")
    }
    this.waitSeconds = timeSpace *  multiplyer;
    
}

module.exports = Interval