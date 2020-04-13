const { createElement } = require('./untils.js')

class Panel {
	toggle() {
		this.ele.toggleClass('lavandula-hide')
	}
	create() {
		this.ele = createElement(
			'div',
			{
				id: 'lavandula-panel',
				class: 'lavandula-hide'
			}
		)
		this.infoEle = $(`
			<div id="lavandula-panel-info" class="lavandula-card">
				<div class="lavandula-card-primary">
					<div class="lavandula-card-primary-title">${$('title').get(0).innerHTML}</div>
				</div>
			</div>
		`)
		this.ele.append(this.infoEle)
		return this.ele
	}
	remove() {
		$('lavandula-panel').remove()
	}
	constructor() {
		
	}
}

module.exports = Panel