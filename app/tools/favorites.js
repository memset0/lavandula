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
					find: filter => db.get('link').find(filter).value(),
					list: () => db.get('link').value(),
					update: data => db.set(['link', db.get('link').findIndex(['url', data.url]).value()], data).write(),
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
		this.log('star', this.status())
		return this.op().then(op => {
			op.append(this.status())
			this.render()
		})
	}

	unstar() {
		this.log('unstar')
		return this.op().then(op => {
			op.delete({ url: window.location.href })
			this.render()
		})
	}

	update() {
		this.log('update', this.status())
		return this.op().then(op => {
			let loc = this.status()
			let dat = op.find(['url', loc.url])
			if (dat) {
				op.update(loc).then(() => { this.render() })
			}
		})
	}

	status() {
		return {
			url: window.location.href,
			title: this.$title.children('textarea').val(),
			color: _.compact(this.$colors.map(($color, index) => $color.find('input')[0].checked ? index + 1 : null)),
		}
	}

	table(data) {
		const empty = '他妈怎么没数据'

		const head = ['Title', '']
		const body = data.map(data => [
			h('a', { href: data.url || empty, target: '_blank' }, data.title || empty),
			h(`div.${this.prefix}table-buttons`, [

			])
		])

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
			let loc = op.query({ url: window.location.href })[0]
			let star = loc ? true : false
			if (!loc) loc = new Object()
			this.log('render', loc)
			this.$buttons.star.children('i')[0].innerHTML = star ? 'star' : 'star_border'
			this.$buttons.star[0].onclick = star ? () => { this.unstar() } : () => { this.star() }
			if (star) {
				let color = loc.color || []
				this.$colors.forEach(($color, index) => {
					$color.find('input')[0].checked = color.indexOf(index + 1) == -1 ? false : true
				})

				if (loc.title) {
					this.$title.children('textarea').val(loc.title)
				}
			}
			this.$table.html(this.table(op.list()).html())
			lavandula.mdui.mutation()
		})
	}

	constructor($e) {
		super()
		this.prefix = 'lavandula-favorites-'

		this.panel = new ExtraPanel(this.prefix + 'panel')

		lavandula.favorite = {
			debug: () => { this.op().then(op => { console.log(op.db.value()) }) },
			op: this.op,
		}

		this.$ = $(c.panel('收藏')).appendTo(lavandula.panel.$tools).find('.lavandula-panel-card-content')

		this.$buttons = {
			menu: $(c.icon_button('menu')).click(() => { this.render(), this.panel.toggle() }),
			star: $(c.icon_button('star_border')),
			export_down: $(c.icon_button('file_download')).click(() => { this.export().then(data => lavandula.utils.downloadText(data)) }),
			export_copy: $(c.icon_button('content_copy')).click(() => { this.export().then(data => lavandula.utils.copyText(data)) }),
			refresh: $(c.icon_button('refresh')).click(() => this.render()),
		}
		this.$colors = ['red', 'orange', 'amber', 'green', 'indigo', 'purple']
			.map(color => $(h('span.lavandula-checkbox-btn.lavandula-theme-accent-' + color, c.checkbox())))
		this.$title = $(c.textarea('title', undefined, undefined, this.prefix + 'title'))
		this.$title.children('textarea').val($('title').text().trim())

		this.$table = this.table([])

		this.$
			.append(h('div', Object.values(this.$buttons).map(o => o[0])))
			.append(h('div', this.$colors.map(o => o[0])))
			.append(this.$title)
		this.panel.$
			.append(this.$table)

		console.log(this.$.find('input, textarea'))
		this.$.find('input, textarea').bind('input propertychange', () => { this.update() })

		lavandula.extra_panel.push(this.panel)

		this.render()
	}
}

module.exports = FavoritesTool