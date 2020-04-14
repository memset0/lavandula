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
		let $subtitle = $e.find('.lavandula-subtitle')
		if (this.data.author) {
			if (this.data.author_link) {
				createElement('a', {
					href: this.data.author_link,
					target: '_blank',
				}).appendTo($subtitle)
					.html(createChipElement(this.data.author, 'person'))
			} else {
				createChipElement(this.data.author, 'person')
					.appendTo($subtitle)
			}
		}
		if (this.data.time) {
			createChipElement(this.data.time, 'date_range')
				.appendTo($subtitle)
		}
		if (this.data.tag) {
			this.data.tag.forEach(tag => {
				createChipElement(tag)
					.appendTo($subtitle)
			})
		}
		if (this.data.icon_tag) {
			this.data.icon_tag.forEach(tag => {
				createChipElement(tag.text, tag.icon)
					.appendTo($subtitle)
			})
		}
	}
	renderPanel($e) {
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