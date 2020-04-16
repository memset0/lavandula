lavandula.utils = {}

let utils = lavandula.utils

utils.md5 = require('./lib/md5.js')
utils.swap = (a, b) => { [b, a] = [a, b] }
utils.random = (l) => Math.floor(Math.random() * l)
utils.random_range = (l, r) => (l + random(r - l))
utils.random_hash = () => utils.md5(Date() + Math.random() + 114514 + 'Menci TQL!')

utils.stringify_mathjax = function (html, inline_symbol = ['$', '$'], display_symbol = ['$$', '$$']) {
	this.$ = $('<qyzcute>' + html + '</qyzcute>')
	this.$.find(".MathJax, .MathJax_Preview, .MathJax_Display, .MathJax_CHTML, .MathJax_SVG")
		.remove()
	this.$.find("script[type='math/tex; mode=display']").each(function () {
		this.outerHTML = ' ' + display_symbol[0] + $.trim(this.innerHTML) + display_symbol[1] + ' '
	})
	this.$.find("script[type='math/tex']").each(function () {
		this.outerHTML = ' ' + inline_symbol[0] + $.trim(this.innerHTML) + inline_symbol[1] + ' '
	})
	return this.$.html()
}