class Panel {
	toggle() {
		this.ele.toggleClass('lavandula-hide')
	}
	create() {
		this.ele = lavandula.create.element('div', {
			id: 'lavandula-panel',
			class: 'lavandula-body lavandula-hide'
		})
		this.eleInfo = $(`
			<div id="lavandula-panel-info" class="lavandula-panel-card">
				<div class="lavandula-card-primary">
					<div class="lavandula-card-primary-title">${$('title').first().html()}</div>
				</div>
			</div>
		`).appendTo(this.ele)
		lavandula.create.element('div', { id: 'lavandula-panel-tools' })
			.appendTo(this.ele)
			.each(function () {
				lavandula.tools.render($(this))
			})
		lavandula.create.element('div', { id: 'lavandula-panel-reader' })
			.appendTo(this.ele)
			.each(function () {
				if (lavandula.reader.reader) {
					lavandula.reader.reader.renderPanel($(this))
				}
			})
		return this.ele
	}
	remove() {
		$('lavandula-panel').remove()
	}
	constructor() {
	}
}

module.exports = Panel