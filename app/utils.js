const h = lavandula.hyperscript

lavandula.utils = {}

let utils = lavandula.utils

utils.md5 = require('md5')

utils.swap = (a, b) => { [b, a] = [a, b] }

utils.random = (l) => Math.floor(Math.random() * l)
utils.random_range = (l, r) => (l + random(r - l))
utils.random_hash = () => utils.md5(Date() + Math.random() + 114514 + 'Menci TQL!')

utils.decode = (text) => $('<qyzcute/>').text(text).html()

utils.blob = function (text) {
	return URL.createObjectURL(new Blob([text]))
}

utils.copyText = function(text) {
	let e = h('textarea', {
		value: text,
		// style: { display: 'none' },
	})
	document.body.appendChild(e)
	e.select()
	document.execCommand('copy')
	document.body.removeChild(e)
}

utils.openUrl = function (url) {
	unsafeWindow.open(url, '_blank')
}

utils.openText = function (text) {
	utils.openUrl(utils.blob(text))
}

utils.downloadUrl = function (url, filename = '') {
	let e = h('a', {
		download: filename,
		href: url,
		style: { display: 'none' },
	})
	document.body.appendChild(e)
	e.click()
	document.body.removeChild(e)
}

utils.downloadText = function (text) {
	utils.downloadUrl(utils.blob(text))
}

utils.stringifyMathjax = function (html, inline_symbol = ['$', '$'], display_symbol = ['$$', '$$']) {
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