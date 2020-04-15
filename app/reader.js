const { createElement } = require('./utils.js')

class Reader {
	toggle() {
		if (this.loaded) {
			this.ele.toggleClass('lavandula-hide')
		}
	}
	load() {
		this.loaded = false
		Object.values(this.readerLib).forEach(Reader => {
			if (Reader.isAvailable()) {
				this.reader = new Reader()
				this.loaded = true
			}
		})
	}
	create() {
		this.ele = createElement('div', {
			id: 'lavandula-reader',
			class: 'lavandula-body lavandula-hide',
		})
		this.reader.render(this.ele)
		return this.ele
	}
	constructor() {
		this.readerLib = {
			csdn: require('./methods/reader/csdn.js'),
			cnblogs: require('./methods/reader/cnblogs.js'),
			zybuluo: require('./methods/reader/zybuluo.js'),
			yhx12243: require('./methods/reader/yhx12243.js'),
			codeforces: require('./methods/reader/codeforces.js'),
		}
		this.load()
	}
}

module.exports = Reader