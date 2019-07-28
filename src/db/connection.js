const mongoose = require('mongoose');

module.exports = {
	connectionDb: () => {
		mongoose.set('useCreateIndex', true);

		mongoose.connect('mongodb+srv://admin-maryan:Rp079vlmarian@film-bot-jzuzp.gcp.mongodb.net/film-bot', { useNewUrlParser: true });
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Connection error: '));
		db.once('open', () => {
			console.log('Successfully connected to MongoDB.');
		});
	},
};
