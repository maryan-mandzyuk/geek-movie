const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('./classes/Article');

async function getBody(url) {
    let output;
    await axios.get(url).then((response) => {
            output = response.data;
        })
        .catch((err) => {
            console.log(err);

        })
    return output;
}


function getImg(selector, $, additionalUrl) {
    let imgs = [];
    $(selector).each(function () {
        let url = $(this);
        let img = additionalUrl + url.attr("src");
        imgs.push(img); //--
    })
    return imgs;
}


function getTitle(selector, $) {
    let texts = [];
    $(selector).each(function () {
        let url = $(this);
        let clone = url.clone();
        clone.find("span").remove();
        let title = clone.text();
        texts.push(title);
    });
    return texts;
}

function getUrl(selector, $, additionalUrl) {
    let urls = [];
    $(selector).each(function () {
        let url = $(this);
        let path = additionalUrl + (url).attr('href');
        urls.push(path);
    });
    return urls;
}

async function toArticle(titles, urls, imgs, sourceName, sourceUrl) {
    let articles = [];

    for (let i = 0; i < titles.length; i++) {
        articles.push(new Article(titles[i], urls[i], imgs[i], sourceName, sourceUrl))
    }
    return articles;
}

exports.scrapingPage = async (url, selector, sourceName) => {
    let body = await getBody(url.basic);
    let $ = cheerio.load(body);
    let titles = getTitle(selector.title, $);
    let urls = getUrl(selector.url, $, url.additional);
    let imgs = getImg(selector.image, $, url.additional);
    let articles = toArticle(titles, urls, imgs, sourceName, url.basic);
    return articles;
}