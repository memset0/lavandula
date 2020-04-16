function createElement(tag, attr = {}) {
	return $(`<${tag}/>`).attr(attr)
}

function createChipElement(text, icon = '') {
	let $chip = createElement('div', { class: 'lavandula-chip' })
	if (icon) {
		createElement('span', { class: 'lavandula-chip-icon' })
			.appendTo($chip)
			.html(`<i class="lavandula-icon material-icons">${icon}</i>`)
	}
	createElement('span', { class: 'lavandula-chip-title' })
		.appendTo($chip)
		.text(text)
	return $chip
}

function createCheckbox(id, checked = false, text = '') {
	return createElement('label', { class: 'lavandula-checkbox' })
		.text(text)
		.append(createElement('input', { type: 'checkbox', checked: checked ? '' : undefined }))
		.append(createElement('i', { class: 'lavandula-checkbox-icon' }))
}

function createIconElement(icon) {
	return createElement('i', { class: 'lavandula-icon material-icons' })
		.text(icon)
}

function createIconButton(icon) {
	return createElement('button', { class: 'lavandula-btn lavandula-btn-icon' })
		.append(createIconElement(icon))
}

function createTable(id, keys, dataset) {
	let $table = $(`
		<div class="lavandula-table-fluid" id="${id}">
			<table class="lavandula-table mdui-table-hoverable">
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
	lavandula.mdui.mutation('#' + id)
	return $table
}

function createPanel(title = '', content = '') {
	let $panel = createElement('div', { class: 'lavandula-panel-card' })
	createElement('div', { class: 'lavandula-panel-card-title' })
		.appendTo($panel)
		.text(title)
	createElement('div', { class: 'lavandula-panel-card-content' })
		.appendTo($panel)
		.append(content)
	return $panel
}

function createLinksPanelElement(title, links) {
	let $content = createElement('ul')
	links.forEach(link => {
		let a = createElement('a', { href: link.href, target: '_blank' })
			.text(link.text)
		createElement('li')
			.appendTo($content)
			.append(a)
	})
	return createPanel(title, $content)
}

module.exports = {
	createElement: createElement,
	createChipElement: createChipElement,
	createCheckbox: createCheckbox,
	createIconElement: createIconElement,
	createIconButton: createIconButton,
	createPanel: createPanel,
	createTable: createTable,
	createLinksPanelElement: createLinksPanelElement,
}