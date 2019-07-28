/* eslint-disable func-names */
const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('./classes/Article');
const articelModel = require('../src/db/models/article.model');
const lastSavedArticleModel = require('../src/db/models/lastSavedArticle.model');
const siteModel = require('../src/db/models/site.model');

const getBody = async (url) => {
	let output;
	await axios.get(url).then((response) => {
		output = response.data;
	})
		.catch((err) => {
			console.log(err);
		});
	return output;
};


const getImg = (selector, $, additionalUrl) => {
	const imgs = [];
	$(selector).each(function () {
		const html = $(this).html();
		const url = cheerio.load(html);
		let img = url('img').attr('src');
		if (!img) {
			img = '';
		}
		if (img.charAt(0) === '/') {
			img = additionalUrl + img;
		}
		imgs.push(img);
	});
	return imgs;
};

const getTitle = (selector, $) => {
	const titles = [];
	$(selector).each(function () {
		const url = $(this);
		const clone = url.clone();
		clone.find('span').remove();
		const title = clone.text();
		titles.push(title);
	});
	return titles;
};

const getDescription = (selector, $) => {
	const texts = [];
	$(selector).each(function () {
		const url = $(this);
		const clone = url.clone();
		clone.find('span').remove();
		const text = clone.text();
		texts.push(text);
	});
	return texts;
};

const getUrl = (selector, $, additionalUrl) => {
	const urls = [];
	$(selector).each(function () {
		const url = $(this);
		const path = additionalUrl + (url).attr('href');
		urls.push(path);
	});
	return urls;
};

const toArticle = async (titles, urls, imgs, siteName, descriptions) => {
	const articles = [];
	if (descriptions) {
		for (let i = 0; i < titles.length; i++) {
			articles.push(new Article(titles[i], urls[i], imgs[i], siteName, descriptions[i]));
		}
	} else {
		for (let i = 0; i < titles.length; i++) {
			articles.push(new Article(titles[i], urls[i], imgs[i], siteName));
		}
	}
	return articles;
};

const getArticles = async (url, selector, siteName) => {
	const body = await getBody(url.basic);
	const $ = cheerio.load(body);
	const titles = getTitle(selector.title, $);
	const urls = getUrl(selector.url, $, url.additional);
	const imgs = getImg(selector.image, $, url.additional);
	let descriptions = [];
	if (selector.description) {
		descriptions = getDescription(selector.description, $);
	}
	const articles = toArticle(titles, urls, imgs, siteName, descriptions);
	return articles;
};

module.exports = {
	scrapingPage: async (sitesToScrap) => {
		sitesToScrap.forEach(async (site) => {
			const lastSavedArticle = await lastSavedArticleModel.readLastSavedArticleBySite(site.name);
			let articels;
			if (site.url) {
				articels = await getArticles(site.url, site.selector, site.name);
			}
			let i = 0;
			// eslint-disable-next-line no-restricted-syntax
			for (const article of articels) {
				if (article.url === lastSavedArticle.article.url) {
					break;
				}
				i += 1;
			}
			articels = articels.slice(0, i);


			if (articels && articels.length) {
				articelModel.createAllArticle(articels).then(
					console.log(`Saved ${articels.length} new articles | Site: ${site.name} | ${new Date()}`)
				);
				lastSavedArticleModel.updateLastSavedArticle(site.name, articels[0]);
			} else {
				console.log(`Do not Save new articles | Site: ${site.name} | ${new Date()}`);
			}
		});
	},

	getSites: async () => {
		const sitesToScrap = await siteModel.readSites();
		return sitesToScrap;
	}
};
