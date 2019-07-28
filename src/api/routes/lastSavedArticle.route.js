const controller = require('../controllers/lastSavedArticle.controller');

module.exports = {
	router: (app) => {
		app.route('/lastSavedArticles')
			.get((req, res) => {
				controller.getLastSavedArticles(req, res);
			})
			.post((req, res) => {
				controller.postLastSavedArticle(req, res);
			})
			.delete((req, res) => {
				controller.deleteAllLastSavedArticles(req, res);
			});

		app.route('/lastSavedArticles/:id')
			.get((req, res) => {
				controller.getLastSavedArticle(req, res);
			})
			.delete((req, res) => {
				controller.deleteLastSavedArticle(req, res);
			})
			.put((req, res) => {
				controller.putLastSavedArticle(req, res);
			})
			.patch((req, res) => {
				controller.patchLastSavedArticle(req, res);
			});
	}
};
