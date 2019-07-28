const mongoose = require('mongoose');

const createSchema = () => {
	const {
		Schema
	} = mongoose;

	const SiteSchema = new Schema({
		name: String,
		url: {
			basic: String,
			additional: String
		},
		selector: {
			title: String,
			url: String,
			image: String,
			description: String
		}
	});
	return SiteSchema;
};

const createModel = () => {
	const Site = mongoose.model('site', createSchema());
	return Site;
};


const SiteModel = createModel();

module.exports = {
	// -------------CREATE-------------
	createSite: (site, callback) => {
		const newSite = new SiteModel(site);
		newSite.save((err) => {
			if (!err) {
				callback('Successfully added a new site.');
			} else {
				callback(err);
			}
		});
	},

	// -------------READ-------------
	readSites: async (req, callback) => {
		let sites;
		if (req) {
			const { query } = req;
			SiteModel.find(query).exec((err, res) => {
				if (!err) {
					callback(res);
				} else {
					console.log(err);
				}
			});
		} else {
			sites = await SiteModel.find();
		}
		return sites;
	},

	readSiteById: (id, callback) => {
		SiteModel.findOne({
			_id: id
		}).exec((err, res) => {
			if (!err) {
				callback(res);
			} else {
				console.log(err);
			}
		});
	},

	// -------------UPDATE-------------
	updateSite: (id, newSite, callback) => {
		SiteModel.updateOne({
			_id: id
		}, newSite, (err) => {
			if (!err) {
				callback(`Site " + ${newSite.name} +  successfully updated`);
			}
		});
	},

	patchSite: (id, newSite, callback) => {
		SiteModel.updateOne({
			_id: id
		}, {
			$set: {
				name: newSite.name,
				url: {
					basic: newSite.basicUrl,
					additional: newSite.additionalUrl
				},
				selector: {
					title: newSite.titleSelector,
					url: newSite.urlSelector,
					image: newSite.imageSelector
				}
			}
		},
		(err) => {
			if (!err) {
				callback(`Site ${newSite.name} successfully updated`);
			}
		});
	},

	// -------------DELETE-------------
	deleteAllSites: (callback) => {
		SiteModel.deleteMany((err) => {
			if (!err) {
				callback('Successfully deleted all site.');
			}
		});
	},

	deleteSite: (id, callback) => {
		SiteModel.deleteOne({
			_id: id
		}).exec((err, res) => {
			if (!err) {
				callback(`Successfully deleted site ${res} `);
			} else {
				console.log(err);
			}
		});
	},
};
