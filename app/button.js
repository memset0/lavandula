const h = lavandula.hyperscript

class Button {
	constructor() {
		this.status = 0

		this.$ = $(
			h('div#lavandula-toggle-button'))
			.click(() => {
				if (lavandula.button.status ^= 1) {
					lavandula.panel.show()
					if (lavandula.reader.lib) {
						lavandula.reader.show()
						if (!lavandula.reader.rendered) {
							lavandula.reader.render()
						}
					}
				} else {
					lavandula.panel.hide()
					if (lavandula.reader.lib) {
						lavandula.reader.hide()
					}
					lavandula.extra_panel.forEach(panel => panel.hide())
				}
			})
	}
}

module.exports = Button