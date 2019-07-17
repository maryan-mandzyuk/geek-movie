class Article {
    constructor(title, url, img,description ,name,sourceUrl) {
        this.title = title;
        this.url = url;
        this.img = img;
        this.source = {
            name : name,
            url : sourceUrl,
        };
        this.description = description;
        this.tags = [];
        this.type = "";
    }
}

module.exports = Article;