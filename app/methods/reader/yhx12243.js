const BaseReader = require('./base.js')

class Yhx12243Reader extends BaseReader {
	static isAvailable() {
		return /^https:\/\/yhx-12243\.github\.io\/OI\-transit\/records\//.exec(location.href)
	}
	render($e) {
		super.render($e)
		$e.find('pre')
			.attr('class', 'lavandula-hljs')
		$e.find('pre code')
			.attr('class', '')
			.each(function () {
				$(this).html($('<div/>').text($(this).text()).html())
			})
		super.render_highlight($e)
	}
	constructor() {
		super()
		this.data = {
			title: $('title').text(),
			author: 'yhx-12243',
			author_link: 'https://yhx-12243.github.io/OI-transit',
			content: $('body').html(),
		}
	}
}

module.exports = Yhx12243Reader