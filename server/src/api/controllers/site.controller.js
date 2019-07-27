const model = require('../../db/models/site.model');

module.exports = {

	// -------------POST-------------
	postSite: (req, res) => {
		model.createSite(req.body, (data) => {
			res.json(data);
		});
	},

	// -------------GET-------------
	getSites: (req, res) => {
		model.readSites(req, (data) => {
			res.json(data);
		});
	},

	getSite: (req, res) => {
		model.readSiteById(req.params.id, (data) => {
			res.json(data);
		});
	},

	// -------------PUT-------------
	putSite: (req, res) => {
		model.updateSite(req.params.id, req.body, (data) => {
			res.json(data);
		});
	},

	patchSite: (req, res) => {
		model.patchSite(req.params.id, req.body, (data) => {
			res.json(data);
		});
	},

	// -------------DELETE-------------
	deleteAllSites: (req, res) => {
		model.deleteAllSites((response) => {
			res.json(response);
		});
	},

	deleteSite: (req, res) => {
		model.deleteSite(req.params.id, (data) => {
			res.json(data);
		});
	}
};
