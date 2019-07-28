const mongoose = require('mongoose');

const createSchema = () => {
	const { Schema } = mongoose;

	const ArticleSchema = new Schema({
		title: String,
		url: String,
		img: String,
		createDate: {
			type: Date,
			default: new Date()
		},
		timeStamp: {
			type: Number,
			default: Date.now()
		},
		siteName: String,
		description: String,
		tags: Array,
		type: String
	});
	return ArticleSchema;
};

const createModel = () => {
	const Article = mongoose.model('articles', createSchema());
	return Article;
};

const ArticleModel = createModel();

module.exports = {
	// -------------CREATE-------------
	createAllArticle: async (array) => {
		for (let i = 0; i < array.length; i++) {
			const article = new ArticleModel({
				title: array[i].title,
				url: array[i].url,
				img: array[i].img,
				siteName: array[i].siteName,
				description: array[i].description,
				tags: [],
				type: ''
			});
			article.save();
		}
	},

	createArticle: (article, callback) => {
		const newArticle = new ArticleModel(article);
		newArticle.save((err, res) => {
			if (!err) {
				callback(res);
			} else {
				callback(err);
			}
		});
	},

	// -------------READ-------------
	readArticles: (req, limit, callback) => {
		let {
			query
		} = req;
		if (query.startDate) {
			if (query.endDate) {
				query = {
					createDate: {
						$gte: new Date(query.startDate),
						$lt: new Date(query.endDate)
					}
				};
			} else {
				query = {
					createDate: {
						$gte: new Date(query.startDate),
					}
				};
			}
		}
		ArticleModel.find(query).sort({
			createDate: -1
		}).limit(parseInt(limit, 10)).exec((err, data) => {
			if (!err) {
				callback(data);
			} else {
				console.log(err);
			}
		});
	},

	readArticleById: (id, callback) => {
		ArticleModel.findOne({
			_id: id
		}).exec((err, res) => {
			if (!err) {
				callback(res);
			} else {
				console.log(err);
				callback('Ops something wrong!');
			}
		});
	},


	// -------------UPDATE-------------
	updateArticle: (id, newArticle, callback) => {
		ArticleModel.updateOne({
			_id: id
		}, newArticle,
		(err) => {
			if (!err) {
				callback(`Article ${newArticle.title} successfully updated`);
			}
		});
	},

	patchArticle: (id, newArticle, callback) => {
		ArticleModel.updateOne({
			_id: id
		}, {
			$set: {
				createDate: {
					date: newArticle.date,
					milliseconds: newArticle.milliseconds
				},
				title: newArticle.title,
				url: newArticle.url,
				img: newArticle.img,
				source: {
					name: newArticle.sourceName,
					url: newArticle.sourceUrl,
				},
				description: newArticle.desctiption,
				tags: newArticle.tags,
				type: newArticle.type
			}
		},
		(err) => {
			if (!err) {
				callback(`Article ${newArticle.title} successfully updated`);
			}
		});
	},

	// -------------DELETE-------------
	deleteAllArticles: (req, callback) => {
		const {
			query
		} = req;
		ArticleModel.deleteMany(query, (err) => {
			if (!err) {
				callback('Successfully deleted articles.');
			}
		});
	},

	deleteArticle: (id, callback) => {
		ArticleModel.deleteOne({
			_id: id
		}).exec((err, res) => {
			if (!err) {
				callback(`Successfully deleted article ${res}`);
			} else {
				console.log(err);
			}
		});
	},
};
