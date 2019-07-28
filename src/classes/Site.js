class Site {
    constructor(name, urlBasic, urlAdditional,selectorTitle,selectorUrl,selectorImage) {
        this.name = name,
        this.url = {
            basic: urlBasic,
            additional: urlAdditional
        }
        this.selector = {
            title: selectorTitle,
            url: selectorUrl,
            image: selectorImage
        }
    }
}

module.exports = Site;