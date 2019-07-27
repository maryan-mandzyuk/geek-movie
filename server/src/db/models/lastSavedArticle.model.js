const mongoose = require('mongoose');

const createSchema = () => {
	const { Schema } = mongoose;

	const LastSavedAricleSchema = new Schema({
		article: Object
	});
	return LastSavedAricleSchema;
};

const createModel = () => {
	const LastSavedAricle = mongoose.model('last-saved-aricle', createSchema());
	return LastSavedAricle;
};

const LastSavedArticleModel = createModel();

module.exports = {
	// -------------CREATE-------------
	createLastSavedArticle: (newArticle, callback) => {
		const toSave = new LastSavedArticleModel({
			article: newArticle
		});
		toSave.save((err) => {
			if (!err) {
				callback('Successfully added a new Last saved article.');
			} else {
				callback(err);
			}
		});
	},

	createLastSaved: (article) => {
		const toSave = new LastSavedArticleModel({
			article
		});
		toSave.save();
	},

	// -------------READ-------------
	readLastSavedArticles: (req, callback) => {
		const { query } = req;
		LastSavedArticleModel.find(query).exec((err, res) => {
			if (!err) {
				callback(res);
			} else {
				console.log(err);
			}
		});
	},

	readLastSavedArticleById: async (id, callback) => {
		LastSavedArticleModel.findOne({
			_id: id
		}).exec((err, res) => {
			if (!err) {
				callback(res);
			} else {
				console.log(err);
			}
		});
	},

	readLastSavedArticleBySite: async (siteName) => {
		const result = await LastSavedArticleModel.findOne({ 'article.siteName': siteName });
		return result;
	},

	// -------------UPDATE-------------
	updateLastSavedArticle: (condition, newArticle, callback) => {
		if (callback) {
			LastSavedArticleModel.updateOne({
				_id: condition.id
			}, {
				article: newArticle
			}, (err) => {
				if (!err) {
					callback(`Last saved article ${newArticle.title}  successfully updated`);
				}
			});
		} else {
			LastSavedArticleModel.findOneAndUpdate({
				'article.siteName': condition
			}, {
				$set: {
					article: newArticle
				}
			}, {
				new: true
			}, (err) => {
				console.log(err);
			});
		}
	},

	patchLastSavedArticle: (articleToUpdate, newArticle, callback) => {
		LastSavedArticleModel.findOneAndUpdate({
			_id: articleToUpdate.id
		}, {
			$set: {
				article: {
					title: newArticle.title,
					url: newArticle.url,
					img: newArticle.img,
					siteName: newArticle.siteName,
					description: newArticle.description,
					type: newArticle.type,
					tags: newArticle.tags,
				},
			}
		},
		(err) => {
			if (!err) {
				callback(`Article " ${newArticle.title} successfully updated`);
			}
		});
	},


	// -------------DELETE-------------
	deleteAllLastSavedArticles: (callback) => {
		LastSavedArticleModel.deleteMany((err) => {
			if (!err) {
				callback('Successfully deleted all Last saved articles.');
			}
		});
	},

	deleteLastSavedArticle: (id, callback) => {
		LastSavedArticleModel.deleteOne({
			_id: id
		}).exec((err, res) => {
			if (!err) {
				callback(`Successfully deleted Last saved article ${res}`);
			} else {
				console.log(err);
			}
		});
	},
};
