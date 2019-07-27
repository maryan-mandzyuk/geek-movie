class Article {
	constructor(title, url, img, name, description) {
		this.title = title;
		this.url = url;
		this.img = img;
		this.siteName = name;
		this.description = description;
		this.tags = [];
		this.type = '';
	}
}

module.exports = Article;
