const c = lavandula.create
const h = lavandula.hyperscript

class ExtraPanel {
	show() {
		this.opened = true
		this.$.removeClass('lavandula-hide')
	}
	hide() {
		this.opened = false
		this.$.addClass('lavandula-hide')
	}
	toggle() {
		this.opened ? this.hide() : this.show()
	}
	constructor(id) {
		this.opened = false
		this.$ = $(h(`div.lavandula-extra-panel#${id}.lavandula-hide`))
	}
}

module.exports = ExtraPanel