const mongoose = require('mongoose');
const config = require('../../../config');

module.exports = {
	connectionDb: () => {
		mongoose.set('useCreateIndex', true);

		mongoose.connect(config.dbConnect, {
			useNewUrlParser: true,
			useFindAndModify: false
		});
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Connection error: '));
		db.once('open', () => {
			console.log('Successfully connected to MongoDB.');
		});
	},
};
