const c = lavandula.create
const h = lavandula.hyperscript

class BaseReader {
	static isAvailable() { return false }

	render($e) {
		$e.append(
			h('div.lavandula-container',
				h('div.lavandula-content', [
					h('div.lavandula-title'),
					h('div.lavandula-subtitle'),
					h('div.lavandula-typo'),
				])))


		let $title = $e.find('div.lavandula-title')
		if (this.data.title) {
			$title.text(this.data.title)
		}

		let $subtitle = $e.find('div.lavandula-subtitle')
		if (this.data.author) {
			$subtitle.append(this.data.author_link ?
				h('a', { href: this.data.author_link, target: '_blank' },
					c.chip(this.data.author, 'person')) :
				c.chip(this.data.author, 'person'))
		}
		if (this.data.time) {
			$subtitle.append(c.chip(this.data.time, 'date_range'))
		}
		if (this.data.tag) {
			$subtitle.append(this.data.tag.map(tag => c.chip(tag)))
		}
		if (this.data.icon_tag) {
			$subtitle.append(this.data.icon_tag.map(tag => c.chip(tag.text, tag.icon)))
		}

		let $typo = $e.find('div.lavandula-typo')
		if (this.data.content) {
			$typo.html(this.data.content)
		}
	}

	renderPanel($e) {
	}

	renderHighlight($e) {
		$e.find("pre.lavandula-hljs code").each(function () {
			hljs.highlightBlock(this)
			let code = $(this).text()
			let blob = lavandula.utils.blob(code)

			let counter = 0
			this.innerHTML = this.innerHTML.trim().split('\n').map(value => {
				let e = h('span.lavandula-line')
				e.innerHTML = h('span.lavandula-line-number', ++counter).outerHTML + value
				return e.outerHTML
			}).join('\n')

			let $buttons = {
				down: $(c.icon_button('file_download'))
					.click(() => {
						lavandula.utils.downloadUrl(blob)
					}),
				copy: $(c.icon_button('content_copy'))
					.click(() => {
						lavandula.utils.copyText(code)
					}),
				open: $(c.linkNewTab(blob, c.icon_button('open_in_new'))),
			}
			this.appendChild(h('div.lavandula-code-buttons', Object.values($buttons).map(o => o[0])))
		})
	}

	constructor() {
	}
}

module.exports = BaseReader