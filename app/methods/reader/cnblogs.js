const BaseReader = require('./base.js')

class CnblogsReader extends BaseReader {
	static isAvailable() {
		return /^https:\/\/www\.cnblogs\.com\/[a-zA-Z0-9_]+\/p/.exec(location.href)
	}
	render($e) {
		super.render($e)
		$e.find('div.cnblogs_Highlighter')
			.attr('class', '')
		$e.find('pre code')
			.attr('style', '')
			.attr('class', '')
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
			title: $('a#cb_post_title_url').text(),
			author: $('div#author_profile_detail a:first-child').text(),
			author_link: $('div#author_profile_detail a:first-child').attr('href'),
			content: $('div#cnblogs_post_body').html(),
			time: $('span#post-date:first-child').text(),
		}
	}
}

module.exports = CnblogsReader