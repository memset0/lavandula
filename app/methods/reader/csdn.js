const BaseReader = require('./base.js')

class CsdnReader extends BaseReader {
	static checkAvailableUrl() {
		return /^https:\/\/blog\.csdn\.net\/[a-zA-Z0-9_]+\/article\/details/.exec(location.href)
	}
	render($e) {
		super.render($e)
		$e.find('.prettyprint .pre-numbering').remove()
		$e.find('.prettyprint .hljs-button.signin').remove()
		$e.find('pre code')
			.attr('style', '')
			.attr('class', '')
			.attr('onclick', '')
			.each(function () {
				$(this).html($('<div/>').text($(this).text()).html())
			})
		$e.find('pre')
			.attr('style', '')
			.attr('class', 'hljs lavandula-hljs')
		super.render_highlight($e)
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