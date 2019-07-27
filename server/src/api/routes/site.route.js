const controller = require('../controllers/site.controller');

module.exports = {
	router: (app) => {
		app.route('/sites')
			.get((req, res) => {
				controller.getSites(req, res);
			})
			.post((req, res) => {
				controller.postSite(req, res);
			})
			.delete((req, res) => {
				controller.deleteAllSites(req, res);
			});

		app.route('/sites/:id')
			.get((req, res) => {
				controller.getSite(req, res);
			})
			.delete((req, res) => {
				controller.deleteSite(req, res);
			})
			.put((req, res) => {
				controller.putSite(req, res);
			})
			.patch((req, res) => {
				controller.patchSite(req, res);
			});
	}
};
