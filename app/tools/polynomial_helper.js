const BaseTool = require('./base.js')

const h = lavandula.hyperscript
const c = lavandula.create

class PolynomialHelper extends BaseTool {
	static isAvailable() { return true }

	update() {
		let arr1 = this.poly.from($('#' + this.prefix + 'array1').val().split(' '))
		let arr2 = this.poly.from($('#' + this.prefix + 'array2').val().split(' '))
		console.log('update', arr1, arr2, this.poly)
		Object.keys(this.data).forEach(key => {
			$(`#${this.prefix}result-${key}`).text(this.data[key].func(arr1, arr2))
		})
	}

	dialog() {
		lavandula.mdui.dialog({
			title: '多项式小助手',
			content: this.$html.html()
		})
		$(`#${this.prefix}array1, #${this.prefix}array2`)
			.bind('input propertychange', () => { this.update() })
	}

	constructor($e) {
		super()
		this.prefix = 'lavandula-polynomial-'
		this.poly = lavandula.algorithm.poly

		this.empty = 'null'
		this.data = {
			dft: {
				text: '快速数论变换',
				func: (a, b) => (a.length ? this.poly.dft(a).join(' ') : this.empty)
			},
			idft: {
				text: '快速数论逆变换',
				func: (a, b) => (a.length ? this.poly.idft(a).join(' ') : this.empty)
			},
			mul: {
				text: '多项式乘法',
				func: (a, b) => (a.length && b.length ? this.poly.mul(a, b).join(' ') : this.empty)
			},
			inv: {
				text: '多项式求逆',
				func: (a, b) => (a.length ? this.poly.inv(a).join(' ') : this.empty)
			},
			ln: {
				text: '多项式 Ln',
				func: (a, b) => (a.length && a[0] == 1 ? this.poly.ln(a).join(' ') : this.empty)
			},
			exp: {
				text: '多项式 Exp',
				func: (a, b) => (a.length && a[0] == 0 ? this.poly.exp(a).join(' ') : this.empty)
			},
			// sqrt: {
			// 	text: '多项式开根',
			// 	func: (a, b) => (a.length ? this.poly.sqrt(a).join(' ') : this.empty)
			// },
			der: {
				text: '多项式求导',
				func: (a, b) => (a.length ? this.poly.der(a).join(' ') : this.empty)
			},
			int: {
				text: '多项式积分',
				func: (a, b) => (a.length ? this.poly.int(a).join(' ') : this.empty)
			},
			pow: {
				text: '多项式快速幂',
				func: (a, b) => (a.length && b.length == 1 ? this.poly.pow(a, b[0]).join(' ') : this.empty)
			},
			// challenge: {
			// 	text: '多项式之 LOJ150',
			// 	func: (a, b) => (a.length && b.length == 1 ? this.poly.challenge(a, b[0]).join(' ') : this.empty)
			// },
		}

		this.$button = $(c.block_button('多项式小助手'))
			.appendTo(lavandula.panel.$buttons)
			.click(() => { this.dialog() })
		this.$html = $(
			h(`div#${this.prefix}body`, [
				c.textarea('Array 1', null, null, this.prefix + 'array1', () => { console.log('1') }),
				c.textarea('Array 2', null, null, this.prefix + 'array2', () => { console.log('1') }),
				h('br'),
				Object.keys(this.data).map(key =>
					h(`div#${this.prefix}display-${key}`, [
						h('p', this.data[key].text),
						h('pre',
							h('code', this.empty, { id: `${this.prefix}result-${key}` })),
					])
				)]))
	}
}

module.exports = PolynomialHelper