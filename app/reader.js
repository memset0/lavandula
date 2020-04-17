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
			csdn: require('./methods/reader/csdn'),
			cnblogs: require('./methods/reader/cnblogs'),
			zybuluo: require('./methods/reader/zybuluo'),
			yhx12243: require('./methods/reader/yhx12243'),
			codeforces: require('./methods/reader/codeforces'),
		}
		this.selector = {
			title: '#lavandula-reader .lavandula-title',
			subtitle: '#lavandula-reader .lavandula-subtitle',
			typo: '#lavandula-reader .lavandula-typo',
		}

		this.$ = $(
			h('div#lavandula-reader.lavandula-hide'))
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