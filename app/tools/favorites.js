const BaseTool = require('./base')
const ExtraPanel = require('../extrapanel')

const h = lavandula.hyperscript
const c = lavandula.create

class FavoritesTool extends BaseTool {
	static isAvailable() { return true }
	log(...argv) { console.log('[lavandula-favorites]', ...argv) }

	op() {
		return low(new GreasemonkeyAsync('lavandula.tools.favorites'))
			.then(db => {
				db.defaults({
					link: []
				}).write()
				return {
					db: db,
					query: filter => db.get('link').filter(filter).take(1).value(),
					append: data => db.get('link').push(data).write(),
					delete: filter => db.get('link').remove(filter).write(),
					list: () => db.get('link').value(),
				}
			})
	}

	import(data) {
		return this.op().then(op => op.db.set('', data).write())
	}

	export() {
		return this.op().then(op => JSON.stringify(op.db.value(), null, 2))
	}

	star() {
		this.log('star')
		return this.op().then(op => {
			op.append({
				url: window.location.href,
				title: this.$input.children('textarea').val(),
			})
			this.render()
		})
	}

	unstar() {
		this.log('unstar')
		return this.op().then(op => {
			op.delete({
				url: window.location.href
			})
			this.render()
		})
	}

	table(data) {
		const empty = '他妈怎么没数据'
		const button = (data) => {

		}

		const head = ['Title', '']
		const body = data.map(data => {
			let e = new Array()
			e.push(h('a', { href: data.url || empty, target: '_blank' }, data.title || empty))
			e.push(button(data))
			return e
		})

		return $(
			h('div.lavandula-table-fluid',
				h('table.lavandula-table.lavandula-table-hoverable',
					h('thead',
						h('tr', head.map(o => h('th', o)))),
					h('tbody', body.map(line =>
						h('tr', line.map(o => h('td', o))))))))
	}

	render() {
		return this.op().then(op => {
			let loc = op.query({ url: window.location.href })

			this.$buttons.star.children('i').text(loc.length ? 'star' : 'star_border')
			this.$buttons.star[0].onclick = loc.length ? () => { this.unstar() } : () => { this.star() }

			this.$table.html(this.table(op.list()).html())

			lavandula.mdui.mutation()
		})
	}

	constructor($e) {
		super()
		this.prefix = 'lavandula-favorites-'

		this.panel = new ExtraPanel(this.prefix + 'panel')

		lavandula.favorite = {
			debug: () => { this.op().then(op => { console.log(op.db.value()) }) }
		}

		this.$ = $(c.panel('收藏')).appendTo(lavandula.panel.$tools).find('.lavandula-panel-card-content')

		this.$buttons = {
			menu: $(c.icon_button('menu')).click(() => { this.render(), this.panel.toggle() }),
			star: $(c.icon_button('star_border')),
			export: $(c.icon_button('open_in_new')).click(() => { this.export().then(data => lavandula.utils.downloadText(data)) })
		}
		this.$input = $(c.textarea('title', undefined, undefined, this.prefix + 'title'))
		this.$input.children('textarea').val($('title').text())

		this.$table = this.table([])

		this.$
			.append($(h('div', Object.values(this.$buttons).map(o => o[0]))))
			.append(this.$input)
		this.panel.$
			.append(this.$table)

		lavandula.extra_panel.push(this.panel)

		this.render()
	}
}

module.exports = FavoritesTool