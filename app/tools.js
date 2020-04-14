const { createElement } = require('./utils.js')

class Tools {
	render($e) {
		Object.values(this.toolLib).forEach(Tool => {
			if (Tool.isAvailable()) {
				$e.append((new Tool()).create())
			}
		})
	}
	constructor() {
		this.toolLib = {
			stringify_latex: require('./methods/tools/stringify_latex.js'),
			codeforces_links: require('./methods/tools/codeforces_links.js'),
		}
	}
}

module.exports = Tools