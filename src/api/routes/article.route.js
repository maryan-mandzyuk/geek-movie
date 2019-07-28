const controller = require('../controllers/article.controller');

module.exports = {
	router: (app) => {
		app.route('/articles')
			.get((req, res) => {
				controller.getArticles(req, res);
			})
			.post((req, res) => {
				controller.postArticle(req, res);
			})
			.delete((req, res) => {
				controller.deleteAllArticles(req, res);
			});

		app.route('/articles/:id')
			.get((req, res) => {
				controller.getArticleById(req, res);
			})
			.delete((req, res) => {
				controller.deleteArticle(req, res);
			})
			.put((req, res) => {
				controller.putArticle(req, res);
			})
			.patch((req, res) => {
				controller.patchArticle(req, res);
			});
	}
};
