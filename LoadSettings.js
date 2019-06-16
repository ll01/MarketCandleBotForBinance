"use strict"
const toml = require('toml');
var fs = require('fs');

function LoadSettings(settinsFileLocation) {
    this.settingsPath = settinsFileLocation
    this.textToml = undefined
}
LoadSettings.prototype.ReadFile = function () {
    this.textToml = fs.readFileSync(this.settingsPath)
}

LoadSettings.prototype.GetSettings = function () {
    this.ReadFile()
    const data = toml.parse(this.textToml)
    if (data.limit === undefined) {
        data.limit = 1000
    }
    return data

}

module.exports = LoadSettings

