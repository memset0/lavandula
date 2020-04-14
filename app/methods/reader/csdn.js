const BaseReader = require('./base.js')
const { createLinksPanelElement } = require('../../utils.js')

class CsdnReader extends BaseReader {
	static isAvailable() {
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
			.attr('class', 'lavandula-hljs')
		super.renderHighlight($e)
	}
	panelCategory() {
		let links = new Array()
		$('div#asideCategory div.aside-content ul li a').each(function () {
			links.push({
				href: $(this).attr('href'),
				text: $(this).find('.title.oneline').text().trim(),
			})
		})
		return createLinksPanelElement('分类', links)
	}
	panelArchive() {
		let links = new Array()
		$('div#asideArchive ul.archive-list li a').each(function () {
			let $e = $(this).clone()
			$e.find('span').remove()
			links.push({
				href: $e.attr('href'),
				text: $e.text().trim(),
			})
		})
		return createLinksPanelElement('归档', links)
	}
	renderPanel($e) {
		super.renderPanel($e)
		$e.append(this.panelCategory())
		$e.append(this.panelArchive())
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