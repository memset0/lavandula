const BaseTool = require('./base.js')

const h = lavandula.hyperscript
const c = lavandula.create

function stringifyLatex($e) {
	console.log('[lavandula] stringify latex', $e)
	// MathJax
	$e.find("script[type='math/tex; mode=display']").each(function () {
		let frame = $(`#${$(this).attr('id')}-Frame`).parent().remove().prop('outerHTML')
		let data = btoa(encodeURIComponent(frame + this.outerHTML))
		let text = $.trim(this.innerHTML)
		this.outerHTML = $(
			h('span.lavandula-mathjax-display', '$$' + text + '$$')
		).attr("lavandula-latex-data", data).prop('outerHTML')
	})
	$e.find("script[type='math/tex']").each(function () {
		let frame = $(`#${$(this).attr('id')}-Frame`).remove().prop('outerHTML')
		let data = btoa(encodeURIComponent(frame + this.outerHTML))
		let text = $.trim(this.innerHTML)
		this.outerHTML = $(
			h('span.lavandula-mathjax', '$' + text + '$')
		).attr("lavandula-latex-data", data).prop('outerHTML')
	})
	// KaTeX
	$e.find("span.katex-display").each(function () {
		let data = btoa(encodeURIComponent(this.outerHTML))
		let text = $(this).find('.katex-mathml annotation').text().trim()
		this.outerHTML = $(
			h('span.lavandula-mathjax-display', '$$' + text + '$$')
		).attr("lavandula-latex-data", data).prop('outerHTML')
	})
	$e.find("span.katex").each(function () {
		let data = btoa(encodeURIComponent(this.outerHTML))
		let text = $(this).find('.katex-mathml annotation').text().trim()
		this.outerHTML = $(
			h('span.lavandula-mathjax', '$' + text + '$')
		).attr("lavandula-latex-data", data).prop('outerHTML')
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
	static isAvailable() { return true }
	click() {
		if (this.enable) {
			this.enable = false
			parseLatex($('body'))
		} else {
			this.enable = true
			stringifyLatex($('body'))
		}
	}
	create($e) {
		this.$button = $(c.block_button('文本化 LaTeX 公式'))
			.appendTo(lavandula.panel.$buttons)
			.click(() => { this.click() })
	}
	constructor() {
		super()
		this.enable = false
	}
}

module.exports = StringifyLatex