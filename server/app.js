const express = require('express');
const bodyParser = require('body-parser');
const scraping = require('./src/scraping');
const dbConnection = require('./src/db/connection');
const api = require('./src/api/index');


const app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

dbConnection.connectionDb();

app.listen(3000, () => console.log('Server started on port 3000'));

api.start(app);

let sites;
const sitesPromise = scraping.getSites();
sitesPromise.then((res) => {
	sites = res;
});

setInterval(() => {
	scraping.scrapingPage(sites);
}, 1800000); // 1800000 ms = 30 min || 300000 ms = 5 min   10000
