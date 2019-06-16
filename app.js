const info = require('./GetInfo');
const loadSettings =  require('./LoadSettings')
const interval = require('./Interval')

var settingsObject  = new loadSettings('./settings.toml')
var settings =  settingsObject.GetSettings()
var int = new interval(settings.interval)
console.log(int.value)
var a =  new info(settings.coincode, settings.interval);
setInterval(x => {
    x.Run();
    console.log(1);
},int.value*1000, a);

