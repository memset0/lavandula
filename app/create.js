lavandula.create = {}

let create = lavandula.create
let $$ = lavandula.mduiJQ

create.$ = create.element = function (tag, attr = {}) {
	return $(`<${tag}/>`).attr(attr)
}

create.button = function (text) {
	return $(`
		<button class="lavandula-btn">${text}</button>
	`)
}

create.block_button = function (text) {
	return $(`
		<button class="lavandula-btn lavandula-btn-block">${text}</button>
	`)
}

create.chip = function (text, icon = '') {
	let $chip = $(`
		<div class="lavandula-chip">
			<span class="lavandula-chip-title">${text}</span>
		</div>
	`)
	if (icon) {
		$chip.prepend($(`
			<span class="lavandula-chip-icon">
				<i class="lavandula-icon material-icons">${icon}</i>
			</span>
		`))
	}
	return $chip
}

create.checkbox = function (id, checked = false, text = '') {
	return $(`
		<label class="lavandula-checkbox">
			${text}
			<input type="checkbox" ${checked ? 'checked' : ''} id="${id}" />
			<i class="lavandula-checkbox-icon"></i>
		</label>
	`)
}

create.code = function (code, id = null) {
	return $(`
		<pre><code id="${id ? id : ''}">${code}</code></pre>
	`)
}

create.icon = function (icon) {
	return $(`
		<i class="lavandula-icon material-icons">${icon}</i>
	`)
}

create.icon_button = function (icon) {
	return $(`
		<button class="lavandula-btn lavandula-btn-icon">
			<i class="lavandula-icon material-icons">${icon}</i>
		</button>
	`)
}

create.textarea = function (label, text = null, icon = null, id = null) {
	let $textarea = $(`
		<div class="lavandula-textfield lavandula-textfield-floating-label">
		</div>
	`)
	if (icon) {
		$textarea.append($(`
			<i class="lavandula-icon material-icons">${icon}</i>
		`))
	}
	if (label) {
		$textarea.append($(`
			<label class="lavandula-textfield-label">${label}</label>
		`))
	}
	$textarea.append($(`
		<textarea class="lavandula-textfield-input" id="${id ? id : ''}">${text ? text : ''}</textarea>
	`))
	return $textarea
}

create.table = function (id, keys, dataset) {
	let $table = $(`
		<div class="lavandula-table-fluid" id="${id}">
			<table class="lavandula-table lavandula-table-hoverable">
				<thead></thead>
				<tbody></tbody>
			</table>
		</div>
	`)
	let $thead = $table.find('thead')
	$tr = $('<tr/>').appendTo($thead)
	keys.forEach(key => $tr.append($('<td/>').text(key)))
	let $tbody = $table.find('tbody')
	dataset.forEach(data => {
		$tr = $('<tr/>').appendTo($tbody)
		keys.forEach(key => $tr.append($('<td/>').text(data[key])))
	})
	lavandula.mduiJQ('#' + id).mutation()
	return $table
}

create.panel = function (title, $content) {
	let $panel = $(`
		<div class="lavandula-panel-card">
			<div class="lavandula-panel-card-title">${title}</div>
			<div class="lavandula-panel-card-content"></div>
		</div>
	`)
	$panel.children('.lavandula-panel-card-content').append($content)
	return $panel
}

create.panel_links = function (title, links) {
	$content = $('<ul/>')
	links.forEach(link => {
		$content.append($(`
			<li><a href="${link.href}" target="_blank">${link.text}</a></li>
		`))
	})
	return create.panel(title, $content)
}