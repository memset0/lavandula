class Button {
	create() {
		this.ele = lavandula.create.element('div', {
			id: 'lavandula-toggle-button',
			class: 'lavandula-body',
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