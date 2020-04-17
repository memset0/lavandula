class Tools {
	constructor() {
		this.lib = {}
		this.toolLib = {
			favorites: require('./tools/favorites'),
			polynomial_helper: require('./tools/polynomial_helper'),
			stringify_latex: require('./tools/stringify_latex'),
			codeforces_links: require('./tools/codeforces_links'),
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