const info = require('./GetInfo');


var a =  new info('NEOBTC');
setInterval(x => {
    x.Run();
    console.log(1);
},1000*600*1000, a);

