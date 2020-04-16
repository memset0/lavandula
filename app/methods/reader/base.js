class BaseReader {
	static isAvailable() {
		return false
	}
	render($e) {
		let $container = lavandula.create.element('div', { class: 'lavandula-container' })
			.appendTo($e)
		let $content = lavandula.create.element('div', { class: 'lavandula-content' })
			.appendTo($container)
		let $title = lavandula.create.element('div', { class: 'lavandula-title' })
			.appendTo($content)
		if (this.data.title) {
			$title.text(this.data.title)
		}
		let $subtitle = lavandula.create.element('div', { class: 'lavandula-subtitle' })
			.appendTo($content)
		if (this.data.author) {
			if (this.data.author_link) {
				lavandula.create.element('a', {
					href: this.data.author_link,
					target: '_blank',
				}).appendTo($subtitle)
					.html(lavandula.create.chip(this.data.author, 'person'))
			} else {
				lavandula.create.chip(this.data.author, 'person')
					.appendTo($subtitle)
			}
		}
		if (this.data.time) {
			lavandula.create.chip(this.data.time, 'date_range')
				.appendTo($subtitle)
		}
		if (this.data.tag) {
			this.data.tag.forEach(tag => {
				lavandula.create.chip(tag)
					.appendTo($subtitle)
			})
		}
		if (this.data.icon_tag) {
			this.data.icon_tag.forEach(tag => {
				lavandula.create.chip(tag.text, tag.icon)
					.appendTo($subtitle)
			})
		}
		let $typo = lavandula.create.element('div', { class: 'lavandula-typo' })
			.appendTo($content)
		if (this.data.content) {
			$typo.html(this.data.content)
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