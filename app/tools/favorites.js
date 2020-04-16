const BaseTool = require('./base.js')
const adapter = new GreasemonkeyAsync('lavandula.tools.favorites')

class FavoritesTool extends BaseTool {
	static isAvailable() { return true }

	querySync(db, filter) { return db.get('link').filter(filter).take(1).value() }
	query(filter = {}) { return this.db.then(db => this.querySync(db, filter)) }
	appendSync(db, data) { return db.get('link').push(data).write() }
	append(data) { return this.db.then(db => this.appendSync(db, data)) }
	deleteSync(db, filter) { return db.get('link').remove(filter).write() }
	delete(filter) { return this.db.then(db => this.deleteSync(db, filter)) }
	listSync(db) { return db.get('link').value() }
	list() { return this.db.then(db => this.listSync(db)) }

	star() {
		return this.append({
			url: window.location.href,
		}).then(() => {
			this.$addButton.click(() => { this.unstar() })
			this.$addButton.children('i').text('star')
		})
	}
	unstar() {
		return this.delete({
			url: window.location.href,
		}).then(() => {
			this.$addButton.click(() => { this.star() })
			this.$addButton.children('i').text('star_border')
		})
	}
	toggleStar() {
		let icon = this.$addButton.children('i').text()
		if (icon == 'star') {
			this.unstar()
		} else {
			this.star()
		}
	}
	openPanel() {
		this.list()
			.then(res => {
				let $html = lavandula.create.element('div')
					.append(lavandula.create.table('lavandula-favorites-table', ['url'], res))
				lavandula.mdui.dialog({
					title: '收藏夹',
					content: $html.html(),
				})
			})
	}
	create($e) {
		this.$content = lavandula.create.panel('收藏')
			.appendTo($e)
			.children('.lavandula-panel-card-content')
		this.$btnGroup = lavandula.create.element('div')
			.appendTo(this.$content)
		this.query({ url: window.location.href }).then(res => {
			// extra button
			this.$extraButton = lavandula.create.icon_button('menu')
				.appendTo(this.$btnGroup)
				.click(() => { this.openPanel() })
			// add button
			this.$addButton = lavandula.create.icon_button(res.length ? 'star' : 'star_border')
				.appendTo(this.$btnGroup)
				.click(() => { this.toggleStar() })
			// checkboxes
			// let data = added ? res[0] : { color: [] }
			// const colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
			// colorList.forEach(color => {
			// 	lavandula.create.checkbox('lavandula-favorite-tag-' + color, data.color.indexOf(color) != -1)
			// 		.appendTo(this.$btnGroup)
			// })
		})
		this.db.then(db => { console.log(db.value()) })
	}
	constructor() {
		super()
		this.db = low(adapter)
		this.db.then(db => {
			db.defaults({ link: [] }).write()
		})
		if (lavandula.mode == 'development') {
			lavandula.favoritesTool = {
				debug: () => {
					this.db.then(db => {
						console.log(db.value())
					})
				}
			}
		}
	}
}

module.exports = FavoritesTool