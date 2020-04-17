const BaseReader = require('./base.js')

class ZyblogReader extends BaseReader {
	static isAvailable() {
		return /^https:\/\/www\.zybuluo\.com\/[a-zA-Z0-9_]+\/note/.exec(location.href)
	}
	render($e) {
		super.render($e)
		$e.find('pre')
			.attr('class', 'lavandula-hljs')
			.each(function () {
				let code = ''
				$(this).find('code').each(function () {
					code += $(this).text() + '\n'
				})
				code = $('<div/>').text(code).html()
				$(this).html(`<code>${code}</code>`)
			})
		super.renderHighlight($e)
	}
	constructor() {
		super()
		let $content = $('div#wmd-preview').clone()
		let $title = $content.children('h1').first().remove()
		let $tag = $content.children('p').first().remove()
		this.data = {
			title: $title.text(),
			author: $('div#reader-full-topInfo code:first-child').text().replace('@', ''),
			content: $content.html(),
			time: $('div#reader-full-topInfo code:nth-child(2)').text(),
			tag: Array.from($tag.children('code').map(function () { return $(this).text() })),
		}
	}
}

module.exports = ZyblogReader