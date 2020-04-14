const { createElement } = require('./utils.js')

class Tools {
	load() {
		Object.values(this.toolLib).forEach(Tool => {
			if (Tool.isAvailable()) {
				let struct = new Tool()
				let element = struct.create()
				this.tools.push({
					struct: struct,
					element: element,
				})
			}
		})
	}
	create() {
		this.ele = createElement('div', {
			id: 'lavandula-tools',
		})
		this.tools.forEach(obj => {
			this.ele.append(obj.element)
		});
		return this.ele
	}
	constructor() {
		this.toolLib = {
			stringify_latex: require('./tools/stringify_latex.js')
		}
		this.tools = new Array()
		this.load()
	}
}

module.exports = Tools