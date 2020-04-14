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
			stringify_latex: require('./tools/stringify_latex.js')
		}
	}
}

module.exports = Tools