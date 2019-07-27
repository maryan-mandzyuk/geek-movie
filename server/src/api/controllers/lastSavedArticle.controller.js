const model = require('../../db/models/lastSavedArticle.model');

module.exports = {
	// -------------POST-------------
	postLastSavedArticle: (req, res) => {
		model.createLastSavedArticle(req.body, (response) => {
			res.json(response);
		});
	},

	// -------------GET-------------
	getLastSavedArticles: (req, res) => {
		model.readLastSavedArticles(req, (data) => {
			res.json(data);
		});
	},

	getLastSavedArticle: (req, res) => {
		model.readLastSavedArticleById(req.params.id, (data) => {
			res.json(data);
		});
	},

	// -------------PUT-------------

	putLastSavedArticle: (req, res) => {
		model.updateLastSavedArticle(req.params, req.body, (data) => {
			res.json(data);
		});
	},

	patchLastSavedArticle: (req, res) => {
		model.patchLastSavedArticle(req.params, req.body, (data) => {
			res.json(data);
		});
	},

	// -------------DELETE-------------
	deleteAllLastSavedArticles: (req, res) => {
		model.deleteLastSavedArticle((response) => {
			res.json(response);
		});
	},

	deleteLastSavedArticle: (req, res) => {
		model.deleteLastSavedArticle(req.params.id, (data) => {
			res.json(data);
		});
	}
};
