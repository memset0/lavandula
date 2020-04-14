const { createElement, createChipElement } = require('../../utils.js')

class BaseReader {
	static isAvailable() {
		return false
	}
	render($e) {
		$(`
			<div class="lavandula-container">
				<div class="lavandula-content">
					<div class="lavandula-title">
						${this.data.title}
					</div>
					<div class="lavandula-subtitle"></div>
					<div class="lavandula-typo">
						${this.data.content}
					</div>
				</div>
			</div>
		`).appendTo($e)
		if (this.data.author) {
			if (this.data.author_link) {
				createElement('a', {
					href: this.data.author_link,
					target: '_blank',
				}).appendTo($e.find('.lavandula-subtitle'))
					.html(createChipElement('person', this.data.author))
			} else {
				createChipElement('person', this.data.author)
					.appendTo($e.find('.lavandula-subtitle'))
			}
		}
	}
	renderPenal($e) {
	}
	renderHighlight($e) {
		$e.find("pre.lavandula-hljs code").each(function () {
			hljs.highlightBlock(this)
			let array = new Array
			let counter = 0
			$(this).html().trim().split('\n').forEach((value) => {
				array.push('<span class="lavandula-line">' +
					'<span class="lavandula-line-number">' +
					(++counter) +
					'</span>' +
					value +
					'</span>'
				)
			})
			$(this).html(array.join('\n'));
		});
	}
	constructor() {
	}
}

module.exports = BaseReader