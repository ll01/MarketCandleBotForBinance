const info = require('./GetInfo');
const loadSettings =  require('./LoadSettings')
const interval = require('./Interval')

var settingsObject  = new loadSettings('./settings.toml')
var settings =  settingsObject.GetSettings()
var int = new interval(settings.interval)
var a =  new info(settings.coincode, settings.interval, settings.connectionstring);
a.Run()
setInterval(x => {
    var now = new Date();
    console.log("feching data at " + now );
    x.Run();
   
},int.waitSeconds *1000, a);

