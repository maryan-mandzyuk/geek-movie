const sraping = require('./lib/scraping')
const Site = require('./lib/classes/Site')
const dbConnection = require('../src/db/connection')
const articelFunction = require('../src/db/collections/aricle/functions')
const lastSavedArticleFunction = require('../src/db/collections/lastSavedArticle/functions')
const siteFunction = require('../src/db/collections/site/functions')


dbConnection.connectionDb();

//const site = new Site('testName','https://TEST/lifestyle/kino_tag3748/','https://test.ua/','.test_title','.test_box','div.test_photo > img');

//siteFunction.createSite(site);


setInterval(async () => {

    let sitesToScrap = await siteFunction.getAllSites();
    sitesToScrap = sitesToScrap.slice(0,3);
    sitesToScrap.forEach(async function (site) {
        let lastSavedArticle = await lastSavedArticleFunction.getLastSaved(site.name);

        if (!lastSavedArticle) {
            await lastSavedArticleFunction.createLastSaved(site.name);
        }

        if (site.url) {
            var articels = await sraping.scrapingPage(site.url, site.selector, site.name);
        }

        let i = 0;
        if (lastSavedArticle.article.url) {
            for (let article of articels) {
                if (article.url === lastSavedArticle.article.url) {
                    break;
                }
                i++;
            }
            articels = articels.slice(0, i);
        }

        if (articels && articels.length) {
            articelFunction.saveAllArticle(articels).then(
                console.log('Saved ' + articels.length + ' new articles | Site: ' + site.name + ' | ' + new Date())
            );
            lastSavedArticleFunction.updateLastSaved(site.name, articels[0]);
        } else {
            console.log('Do not Save new articles | Site: ' + site.name + ' | ' + new Date())
        }
    })


}, 20000); //1800000 ms = 30 min