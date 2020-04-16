const BaseTool = require('./base.js')

class PolynomialHelper extends BaseTool {
	static isAvailable() { return true }

	update() {
		let arr1 = this.poly.from($('#' + this.prefix + 'array1').val().split(' '))
		let arr2 = this.poly.from($('#' + this.prefix + 'array2').val().split(' '))
		console.log('update', arr1, arr2, this.poly)
		$('#' + this.prefix + 'result-dft').text(arr1.length ? this.poly.dft(arr1).join(' ') : 'null')
		$('#' + this.prefix + 'result-idft').text(arr1.length ? this.poly.idft(arr1).join(' ') : 'null')
		$('#' + this.prefix + 'result-mul').text(arr1.length && arr2.length ? this.poly.mul(arr1, arr2).join(' ') : 'null')
		$('#' + this.prefix + 'result-inv').text(arr1.length ? this.poly.inv(arr1).join(' ') : 'null')
		$('#' + this.prefix + 'result-ln').text(arr1.length && arr1[0] == 1 ? this.poly.ln(arr1).join(' ') : 'null')
		$('#' + this.prefix + 'result-exp').text(arr1.length && arr1[0] == 0 ? this.poly.exp(arr1).join(' ') : 'null')
		// $('#' + this.prefix + 'result-sqrt').text(arr1.length ? this.poly.sqrt(arr1).join(' ') : 'null')
		$('#' + this.prefix + 'result-der').text(arr1.length ? this.poly.der(arr1).join(' ') : 'null')
		$('#' + this.prefix + 'result-int').text(arr1.length ? this.poly.int(arr1).join(' ') : 'null')
		$('#' + this.prefix + 'result-pow').text(arr1.length && arr2.length == 1 ? this.poly.pow(arr1, arr2[0]).join(' ') : 'null')
		// $('#' + this.prefix + 'result-challenge').text(arr1.length && arr2.length == 1 ? this.poly.challenge(arr1, arr2[0]).join(' ') : 'null')
	}

	create() {
		this.$button = lavandula.create.block_button('多项式小助手')
			.appendTo(lavandula.panel.$buttons)
			.click(() => { this.dialog() })
		this.$html = lavandula.create.$('div', { id: this.prefix + 'body' })
			.append(lavandula.create.textarea('Array 1', null, null, this.prefix + 'array1', () => { console.log('1') }))
			.append(lavandula.create.textarea('Array 2', null, null, this.prefix + 'array2', () => { console.log('1') }))
			.append(lavandula.create.$('br'))
			.append(lavandula.create.$('p').text('快速数论变换'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-dft'))
			.append(lavandula.create.$('p').text('快速数论逆变换'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-idft'))
			.append(lavandula.create.$('p').text('多项式乘法'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-mul'))
			.append(lavandula.create.$('p').text('多项式求逆'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-inv'))
			.append(lavandula.create.$('p').text('多项式 Ln'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-ln'))
			.append(lavandula.create.$('p').text('多项式 Exp'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-exp'))
			// .append(lavandula.create.$('p').text('多项式开根'))
			// .append(lavandula.create.code('null\n', this.prefix + 'result-sqrt'))
			.append(lavandula.create.$('p').text('多项式求导'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-der'))
			.append(lavandula.create.$('p').text('多项式积分'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-int'))
			.append(lavandula.create.$('p').text('多项式快速幂'))
			.append(lavandula.create.code('null\n', this.prefix + 'result-pow'))
			// .append(lavandula.create.$('p').text('多项式之 LOJ150'))
			// .append(lavandula.create.code('null\n', this.prefix + 'result-challenge'))
	}

	dialog() {
		lavandula.mdui.dialog({
			title: '多项式小助手',
			content: this.$html.html()
		})
		$(`#${this.prefix}array1, #${this.prefix}array2`).bind('input propertychange', () => { this.update() })
	}

	constructor() {
		super()
		this.prefix = 'lavandula-polynomial-'
		this.poly = lavandula.algorithm.poly
	}
}

module.exports = PolynomialHelper