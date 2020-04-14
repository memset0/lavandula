const BaseTool = require('./base.js')
const { createElement } = require('../utils.js')

const availableUrlList = [ // unused
	'uoj.ac',
	'loj.ac',
	'duck.ac',
	'floj.tech',
	'vjudge.net',
	'*.github.io',
	'www.luogu.org',
	'codeforces.com',
	'acm.nflsoj.com',
	'www.cometoj.com',
	'www.cnblogs.com',
	'oi-wiki.org',
	'ioihw.duck-ac.cn',
	'www.luogu.com.cn',
	'oi-archive.memset0.cn',
]

function stringifyLatex($e) {
	console.log('[lavandula] stringify latex', $e)
	// MathJax
	// $e.find("script[type='math/tex; mode=display']").each(function () {
	// 	this.outerHTML =
	// 		' <span style="display:block;margin:auto;width:80%;padding:20px">$$' +
	// 		$.trim(this.innerHTML) +
	// 		'$$</span> '
	// })
	$e.find("script[type='math/tex; mode=display']").each(function () {
		let frame = $(`#${$(this).attr('id')}-Frame`).parent().remove().prop('outerHTML')
		let data = btoa(encodeURIComponent(frame + this.outerHTML))
		let text = $.trim(this.innerHTML)
		this.outerHTML = createElement('span', {
			class: "lavandula-mathjax-display",
			"lavandula-latex-data": data
		},{
			text: '$$' + text + '$$'
		}).prop("outerHTML")
	})
	$e.find("script[type='math/tex']").each(function () {
		let frame = $(`#${$(this).attr('id')}-Frame`).remove().prop('outerHTML')
		let data = btoa(encodeURIComponent(frame + this.outerHTML))
		let text = $.trim(this.innerHTML)
		this.outerHTML = createElement('span', {
			class: "lavandula-mathjax",
			"lavandula-latex-data": data
		},{
			text: '$' + text + '$'
		}).prop("outerHTML")
	})
	// KaTeX
	$e.find("span.katex-display").each(function () {
		let data = btoa(encodeURIComponent(this.outerHTML))
		let text = $(this).find('.katex-mathml annotation').text().trim()
		this.outerHTML = createElement('span', {
			class: "lavandula-katex-display",
			"lavandula-latex-data": data
		},{
			text: '$$' + text + '$$'
		}).prop("outerHTML")
	})
	$e.find("span.katex").each(function () {
		let data = btoa(encodeURIComponent(this.outerHTML))
		let text = $(this).find('.katex-mathml annotation').text().trim()
		this.outerHTML = createElement('span', {
			class: "lavandula-katex",
			"lavandula-latex-data": data
		},{
			text: '$' + text + '$'
		}).prop("outerHTML")
	})
}

function parseLatex($e) {
	const selectors = [
		'.lavandula-mathjax',
		'.lavandula-mathjax-display',
		'.lavandula-katex',
		'.lavandula-katex-display',
	]
	console.log('[lavandula] parse latex', $e)
	$e.find(selectors.join(', ')).each(function () {
		let data = decodeURIComponent(atob($(this).attr('lavandula-latex-data')))
		this.outerHTML = data
	})
}

class StringifyLatex extends BaseTool {
	// static isAvailable() {
	// 	let flag = false
	// 	availableUrlList.forEach(function (url) {
	// 		flag |= location.href.startsWith('http://' + url)
	// 		flag |= location.href.startsWith('https://' + url)
	// 	})
	// 	return flag
	// }
	click() {
		if (this.enable) {
			this.enable = false
			parseLatex($('body'))
		} else {
			this.enable = true
			stringifyLatex($('body'))
		}
	}
	create() {
		this.button = createElement('button', {
			class: 'lavandula-btn lavandula-btn-block'
		}, {
			text: '文本化 LaTeX 公式'
		})
		this.ele = createElement('div', {
			id: 'lavandula-tools-stringify-latex',
			class: 'lavandula-panel-card'
		}).append(this.button)
		this.button.click(this.click)
		return this.ele
	}
	constructor() {
		super()
		this.enable = false
	}
}

module.exports = StringifyLatex