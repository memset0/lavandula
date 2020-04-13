class BaseReader {
	static checkAvailableUrl() {
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
	constructor() {
	}
}

module.exports = BaseReader