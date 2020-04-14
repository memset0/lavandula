const { createElement } = require('./utils.js')

class Button {
	create() {
		this.ele = createElement('div', {
			id: 'lavandula-toggle-button',
			onclick: 'lavandula.panel.toggle(); lavandula.reader.toggle()',
		})
		this.ele.append(this.ele)
		return this.ele
	}
	remove() {
		$('lavandula-toggle-button').remove()
	}
	constructor() {
		
	}
}

module.exports = Button