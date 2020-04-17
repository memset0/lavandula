const BaseTool = require('./base.js')

function matchUrl() {
	const regExpGroup = [
		/^https\:\/\/codeforces\.com\/contest\/(?<round>[0-9]+)\/problem\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforces\.com\/problemset\/problem\/(?<round>[0-9]+)\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforces\.ml\/contest\/(?<round>[0-9]+)\/problem\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforces\.ml\/problemset\/problem\/(?<round>[0-9]+)\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforc\.es\/contest\/(?<round>[0-9]+)\/problem\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/codeforc\.es\/problemset\/problem\/(?<round>[0-9]+)\/(?<problem>[A-Z]+[0-9]*)$/,
		/^https\:\/\/www\.luogu\.com\.cn\/problem\/CF(?<round>[0-9]+)(?<problem>[A-Z]+[0-9]*)$/,
	]
	let matchResult = null
	regExpGroup.forEach(regExp => {
		matchResult = matchResult || regExp.exec(location.href)
	})
	return matchResult
}

class CodeforcesLinks extends BaseTool {
	static isAvailable() {
		return matchUrl()
	}
	match() {
		let groups = matchUrl().groups
		return [groups.round, groups.problem]
	}
	links(round, problem) {
		return [
			{ text: '在 洛谷 中打开', href: `https://www.luogu.com.cn/problem/CF${round}${problem}` },
			{ text: '在 Virtual Judge 中打开', href: `https://vjudge.net/problem/CodeForces-${round}${problem}` },
			{ text: '打开这道题目在比赛中的链接', href: `https://codeforces.com/contest/${round}/problem/${problem}` },
			{ text: '打开这道题目在题库中的链接', href: `https://codeforces.com/problemset/problem/${round}/${problem}` },
			{ text: '在 codeforces.ml 镜像中打开', href: `https://codeforces.ml/contest/${round}/problem/${problem}` },
			{ text: '在 codeforc.es 镜像中打开', href: `https://codeforc.es/contest/${round}/problem/${problem}` },
			{ text: '打开这场比赛的 Submit 页面', href: `https://codeforces.com/contest/${round}/submit` },
			{ text: '打开这场比赛的 Status 页面', href: `https://codeforces.com/contest/${round}/status` },
			{ text: '打开这场比赛的 Hacks 页面', href: `https://codeforces.com/contest/${round}/hacks` },
			{ text: '打开这场比赛的 Room 页面', href: `https://codeforces.com/contest/${round}/room` },
			{ text: '打开这场比赛的 Standings 页面', href: `https://codeforces.com/contest/${round}/standings` },
			{ text: '注册这场比赛的 Virtual participation', href: `https://codeforces.com/contestRegistration/${round}/virtual/true` },
		]
	}
	constructor() {
		super()
		[this.round, this.problem] = this.match()

		this.$ = $(lavandula.create.panel_links('CodeForces Links', this.links(this.round, this.problem))).appendTo($e)
	}
}

module.exports = CodeforcesLinks