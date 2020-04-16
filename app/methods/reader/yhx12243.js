const BaseReader = require('./base.js')

const links = [
	{ text: '做题记录', href: 'https://yhx-12243.github.io/OI-transit/index.html' },
	{ text: '小工具', href: 'https://yhx-12243.github.io/OI-transit/tools.html' },
	{ text: '模板', href: 'https://yhx-12243.github.io/OI-transit/templates.html' },
	{ text: '便笺', href: 'https://yhx-12243.github.io/OI-transit/memos.html' },
]

const OJLinks = [
	{ text: 'Lydsy', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=Lydsy' },
	{ text: '洛谷', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=Luogu' },
	{ text: 'Vijos', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=Vijos' },
	{ text: 'HDU', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=HDU' },
	{ text: 'POJ', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=POJ' },
	{ text: 'UOJ', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=UOJ' },
	{ text: 'LibreOJ', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=LibreOJ' },
	{ text: 'SimpleOJ/StupidOJ', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=SOJ' },
	{ text: 'Codeforces', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=Codeforces' },
	{ text: 'Codechef', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=Codechef' },
	{ text: 'AtCoder', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=AtCoder' },
	{ text: 'SPOJ', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=SPOJ' },
	{ text: '本地', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=Local' },
	{ text: '其它 OJ', href: 'https://yhx-12243.github.io/OI-transit/index.html?curLoc=Unknown' },
]

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
		super.renderHighlight($e)
		$(lavandula.reader.selector.typo).ready(function () {
			MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('lavandula-typo')[0]]);
		})
	}
	panelLinks() {
		return lavandula.create.panel_links('链接', links)
	}
	panelOJ() {
		return lavandula.create.panel_links('OJ', OJLinks)
	}
	renderPanel($e) {
		super.renderPanel($e)
		$e.append(this.panelLinks())
		$e.append(this.panelOJ())
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