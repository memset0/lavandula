class Panel {
	toggle() {
		this.$.toggleClass('lavandula-hide')
	}
	create() {
		this.$ = lavandula.create.element('div', {
			id: 'lavandula-panel',
			class: 'lavandula-body lavandula-hide'
		})
		this.$info = $(`
			<div id="lavandula-panel-info" class="lavandula-panel-card">
				<div class="lavandula-card-primary">
					<div class="lavandula-card-primary-title">${$('title').first().html()}</div>
				</div>
			</div>
		`).appendTo(this.$)
		this.$buttons = lavandula.create.element('div', { id: 'lavandula-panel-buttons', class: "lavandula-panel-card" })
			.appendTo(this.$)
		this.$tools = lavandula.create.element('div', { id: 'lavandula-panel-tools' })
			.appendTo(this.$)
			.each(function () {
				lavandula.tools.render($(this))
			})
		this.$reader = lavandula.create.element('div', { id: 'lavandula-panel-reader' })
			.appendTo(this.$)
			.each(function () {
				if (lavandula.reader.reader) {
					lavandula.reader.reader.renderPanel($(this))
				}
			})
		return this.$
	}
	remove() {
		$('lavandula-panel').remove()
	}
	constructor() {
	}
}

module.exports = Panel