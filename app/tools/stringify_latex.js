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
	// MathJax
	$e.find(".MathJax").remove()
	$e.find(".MathJax_SVG").remove()
	$e.find(".MathJax_CHTML").remove()
	$e.find(".MathJax_Display").remove()
	$e.find(".MathJax_Preview").remove()
	$e.find("script[type='math/tex']").each(function () {
		this.outerHTML =
			' <span>$' +
			$.trim(this.innerHTML) +
			'$</span> '
	})
	$e.find("script[type='math/tex; mode=display']").each(function () {
		this.outerHTML =
			' <span style="display:block;margin:auto;width:80%;padding:20px">$$' +
			$.trim(this.innerHTML) +
			'$$</span> '
	})
	// KaTeX
	$e.find("span.katex").each(function () {
		this.outerHTML =
			' <span>$' +
			$(this).find('.katex-mathml annotation').text().trim() +
			'</span>$ '
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
		stringifyLatex($('body'))
	}
	create() {
		this.button = createElement('button', {
			class: 'lavandula-btn lavandula-btn-block'
		},{
			text: '文本化 LaTeX 公式'
		})
		this.ele = createElement('div', {
			id: 'lavandula-tools-stringify-latex',
			class: 'lavandula-card lavandula-card-with-button'
		}).append(this.button)
		this.button.click(this.click)
		return this.ele
	}
	constructor() {
		super()
	}
}

module.exports = StringifyLatex