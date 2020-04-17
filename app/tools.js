class Tools {
	constructor() {
		this.lib = {}
		this.toolLib = {
			favorites: require('./tools/favorites.js'),
			polynomial_helper: require('./tools/polynomial_helper.js'),
			stringify_latex: require('./tools/stringify_latex.js'),
			codeforces_links: require('./tools/codeforces_links.js'),
		}

		this.$ = lavandula.panel.$tools

		Object.keys(this.toolLib).forEach(key => {
			const Tool = this.toolLib[key]
			if (Tool.isAvailable()) {
				this.lib[key] = new Tool()
				this.lib[key].create(this.$)
			}
		})
	}
}

module.exports = new Tools()