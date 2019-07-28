const model = require('../../db/models/article.model');

module.exports = {
	// -------------GET-------------
	getArticles: (req, res) => {
		model.readArticles(req, req.query.limit, articles => res.json(articles));
	},

	getArticleById: (req, res) => {
		model.readArticleById(req.params.id, article => res.json(article));
	},

	// -------------POST-------------
	postArticle: (req, res) => {
		model.createArticle(req.body, response => res.json(response).status(201));
	},

	// -------------PUT-------------
	putArticle: (req, res) => {
		model.updateArticle(req.params.id, req.body, response => res.json(response));
	},

	patchArticle: (req, res) => {
		model.patchArticle(req.params.id, req.body, response => res.json(response));
	},

	// -------------DELETE-------------
	deleteAllArticles: (req, res) => {
		model.deleteAllArticles(req, response => res.json(response));
	},

	deleteArticle: (req, res) => {
		model.deleteArticle(req.params.id, response => res.json(response));
	},
};
