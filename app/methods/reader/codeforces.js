const BaseReader = require('./base.js')
const { createElement } = require('../../utils.js')

function matchUrl() {
	const regExpGroup = [
		/^https\:\/\/codeforces\.com\/contest\/(?<round>[0-9]+)\/problem\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforces\.com\/problemset\/problem\/(?<round>[0-9]+)\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforces\.ml\/contest\/(?<round>[0-9]+)\/problem\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforces\.ml\/problemset\/problem\/(?<round>[0-9]+)\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforc\.es\/contest\/(?<round>[0-9]+)\/problem\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforc\.es\/problemset\/problem\/(?<round>[0-9]+)\/(?<problem>[A-Z]+[0-9]*)$/,
	]
	let matchResult = null
	regExpGroup.forEach(regExp => {
		matchResult = matchResult || regExp.exec(location.href)
	})
	return matchResult
}

class CodeforcesReader extends BaseReader {
	static isAvailable() {
		return matchUrl()
	}
	render($e) {
		super.render($e)
		$('#lavandula-reader .lavandula-typo')
			.ready(function () {
				let $content = $('#lavandula-reader .lavandula-typo')
				$content.addClass('lavandula-codeforces')
				$('div#pageContent .problem-statement > div')
					.each(function (index) {
						if (1 <= index && index <= 5) {
							$(this).appendTo($content)
							$(this).children('.section-title').remove()
						}
						if (2 <= index && index <= 5) {
							const text = {
								2: '输入格式',
								3: '输出格式',
								4: '样例',
								5: '数据范围和备注'
							}
							createElement('h3')
								.text(text[index])
								.prependTo($(this))
						}
						if (index == 4) {
							$(this).find('.sample-test .input')
								.addClass('lavandula-codeforces-input')
							$(this).find('.sample-test .output')
								.addClass('lavandula-codeforces-output')
							$(this).find('.sample-test .input-output-copier')
								.addClass('lavandula-btn')
								.addClass('lavandula-codeforces-copier')
						}
					})
			})
	}
	constructor() {
		super()
		let $header = $('div#pageContent .problem-statement .header').clone()
		$header.find('.property-title').remove()
		this.config = Object.assign(matchUrl().groups, {
			time_limit: $header.find('.time-limit').text().replace(' second', 's'),
			memory_limit: $header.find('.memory-limit').text().replace(' megabytes', 'MiB'),
			input_file: $header.find('.input-file').text().replace('standard input', 'stdin'),
			output_file: $header.find('.output-file').text().replace('standard output', 'stdout'),
		})
		console.log(this.config)
		this.data = {
			title: `CF${this.config.round}${this.config.problem} ${$header.find('.title').text().split('. ')[1]}`,
			tag: [
				'时间限制 ' + this.config.time_limit,
				'空间限制 ' + this.config.memory_limit,
				'输入文件 ' + this.config.input_file,
				'输出文件 ' + this.config.output_file,
			]
		}
	}
}

module.exports = CodeforcesReader