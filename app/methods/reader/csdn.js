const BaseReader = require('./base.js')

class CsdnReader extends BaseReader {
	static checkAvailableUrl() {
		return /^https:\/\/blog\.csdn\.net\/[a-zA-Z0-9_]+\/article\/details/.exec(location.href)
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
			title: $('h1.title-article').text(),
			author: $('a.follow-nickName').text(),
			author_link: $('a.follow-nickName').attr('href'),
			content: $('div#content_views').html(),
			time: $('div.up-time').text().replace('发布于', ''),
		}
	}
}

module.exports = CsdnReader