const { createElement } = require('./untils.js')

class Reader {
	toggle() {
		if (this.loaded) {
			this.ele.toggleClass('lavandula-hide')
		}
	}
	load() {
		this.loaded = false
		Object.values(this.readerLib).forEach(Reader => {
			if (Reader.checkAvailableUrl()) {
				this.reader = new Reader()
				this.loaded = true
			}
		})
		return this.loaded
	}
	create() {
		this.ele = createElement('div', {
			id: 'lavandula-reader',
			class: 'lavandula-hide',
		})
		this.reader.render(this.ele)
		return this.ele
	}
	constructor() {
		this.loaded = false
		this.readerLib = {
			csdn: require('./methods/reader/csdn.js'),
			yhx12243: require('./methods/reader/yhx12243.js'),
		}
	}
}

module.exports = Reader