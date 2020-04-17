const h = lavandula.hyperscript

class Reader {
	toggle() {
		if (this.lib) {
			this.$.toggleClass('lavandula-hide')
		}
	}

	render() {
		this.rendered = true
		this.lib.render(this.$)
		this.lib.renderPanel(this.$panel)
		lavandula.mdui.mutation()
	}

	constructor() {
		this.readerLib = {
			csdn: require('./methods/reader/csdn.js'),
			cnblogs: require('./methods/reader/cnblogs.js'),
			zybuluo: require('./methods/reader/zybuluo.js'),
			yhx12243: require('./methods/reader/yhx12243.js'),
			codeforces: require('./methods/reader/codeforces.js'),
		}
		this.selector = {
			title: '#lavandula-reader .lavandula-title',
			subtitle: '#lavandula-reader .lavandula-subtitle',
			typo: '#lavandula-reader .lavandula-typo',
		}

		this.$ = $(
			h('div#lavandula-reader.lavandula-body.lavandula-hide'))
		this.$panel = lavandula.panel.$reader

		Object.keys(this.readerLib).forEach(key => {
			const Reader = this.readerLib[key]
			if (Reader.isAvailable()) {
				this.lib = new Reader()
			}
		})
	}
}

module.exports = new Reader()