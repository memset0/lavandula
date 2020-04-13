const BaseReader = require('./base.js')

class Yhx12243Reader extends BaseReader {
	static checkAvailableUrl() {
		return /^https:\/\/yhx-12243\.github\.io\/OI\-transit\/records\//.exec(location.href)
	}
	render($e) {
		super.render($e)
		$e.find('.prettyprint .pre-numbering').remove()
		$e.find('.prettyprint .hljs-button.signin').remove()
		$e.find('pre').attr('class', '').attr('style', '')
		$e.find('code').attr('class', '').attr('style', '').attr('onclick', '')
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