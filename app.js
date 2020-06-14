require('dotenv').config();
const cron = require("node-cron");
const request = require('request');
var db = require('./MySQuirreL.js');

async function SAVE(price){
    const result = await db.query("INSERT INTO "+process.env.SQL_TABLE+" (price) VALUES (?)",[price]);
}

cron.schedule("* * * * * *", function() {
    request('https://api.cryptowat.ch/markets/kraken/btceur/price', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        SAVE(body.result.price);

    });
});

