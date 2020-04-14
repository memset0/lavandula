class BaseReader {
	static isAvailable() {
		return false
	}
	render($e) {
		console.log(this.data, $e)
		$e.append(`
			<div class="lavandula-container">
				<div class="lavandula-title">
					${this.data.title}
				</div>
				<div class="lavandula-subtitle">
				</div>
				<div class="lavandula-typo">
					${this.data.content}
				</div>
			</div>
		`)
	}
	render_highlight($e) {
		$e.find("pre.lavandula-hljs code").each(function(){
			$(this).html("<ul><li>" + $(this).html().replace(/\n/g,"\n</li><li>") +"\n</li></ul>");
		});
		hljs.initHighlightingOnLoad();
	}
	constructor() {
	}
}

module.exports = BaseReader