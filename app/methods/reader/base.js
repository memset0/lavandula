class BaseReader {
	static isAvailable() {
		return false
	}
	render($e) {
		console.log(this.data, $e)
		$e.append(`
			<div class="lavandula-container">
				<div class="lavandula-content">
					<div class="lavandula-title">
						${this.data.title}
					</div>
					<div class="lavandula-subtitle">
						<a class="lavandula-chip" href="${this.data.author_link || '#'}">
							<span class="lavandula-chip-icon"><i class="lavandula-icon material-icons">person</i></span>
							<span class="lavandula-chip-title">${this.data.author}</span>
						</a>
					</div>
					<div class="lavandula-typo">
						${this.data.content}
					</div>
				</div>
			</div>
		`)
	}
	render_highlight($e) {
		$e.find("pre.lavandula-hljs code").each(function () {
			hljs.highlightBlock(this)
			let array = new Array
			let counter = 0
			$(this).html().trim().split('\n').forEach((value) => {
				array.push('<span class="lavandula-line">' +
					'<span class="lavandula-line-number">' +
					(++counter) +
					'</span>' +
					value +
					'</span>'
				)
			})
			$(this).html(array.join('\n'));
		});
	}
	constructor() {
	}
}

module.exports = BaseReader