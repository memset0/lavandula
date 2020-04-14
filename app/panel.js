const { createElement } = require('./utils.js')

class Panel {
	toggle() {
		this.ele.toggleClass('lavandula-hide')
	}
	create() {
		this.ele = createElement('div', {
			id: 'lavandula-panel',
			class: 'lavandula-hide'
		})
		this.eleInfo = $(`
			<div id="lavandula-panel-info" class="lavandula-card">
				<div class="lavandula-card-primary">
					<div class="lavandula-card-primary-title">${$('title').first().html()}</div>
				</div>
			</div>
		`).appendTo(this.ele)
		createElement('div', { id: 'lavandula-panel-tools' })
			.appendTo(this.ele)
			.each(function () {
				lavandula.tools.render($(this))
			})
		createElement('div', { id: 'lavandula-panel-reader' })
			.appendTo(this.ele)
		return this.ele
	}
	remove() {
		$('lavandula-panel').remove()
	}
	constructor() {
	}
}

module.exports = Panel