"use strict"

const fetch = require('node-fetch');
const fs = require('fs');
const data = require('./data.json');

(async () => {
    var pdDataProm = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
    var pdData = await pdDataProm.json();
    var i = 0;

    data.entries = data.entries.map(r => 
        r.map(e => {
            if (e == null)
                return e;
            var oe = pdData.elements[i++]
            e.abbreviation = oe.symbol
            e.title = oe.name
            return e;
        })
    );
    fs.writeFile('data.json', JSON.stringify(data, null, 2));
})();




