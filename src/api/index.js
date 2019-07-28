const article = require('./routes/article.route');
const site = require('./routes/site.route');
const lastSavedArticle = require('./routes/lastSavedArticle.route');

module.exports = {
	start: (app) => {
		article.router(app);
		site.router(app);
		lastSavedArticle.router(app);
	},
};
