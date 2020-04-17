const h = lavandula.hyperscript

class Button {
	constructor() {
		this.$ = $(
			h('div#lavandula-toggle-button'))
			.click(() => {
				lavandula.panel.toggle()
				lavandula.reader.toggle()
				if (!lavandula.reader.rendered && lavandula.reader.lib) {
					lavandula.reader.render()
				}
			})
	}
}

module.exports = new Button()