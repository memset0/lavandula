function createElement(tag, attr = {}) {
	return $(`<${tag}/>`).attr(attr)
}

function createChipElement(text, icon = '') {
	let chip = createElement('div', { class: 'lavandula-chip' })
	if (icon) {
		createElement('span', { class: 'lavandula-chip-icon' })
			.appendTo(chip)
			.html(`<i class="lavandula-icon material-icons">${icon}</i>`)
	}
	createElement('span', { class: 'lavandula-chip-title' })
		.appendTo(chip)
		.text(text)
	return chip
}

function createLinksPanelElement(title, links) {
	let content = createElement('ul')
	links.forEach(link => {
		let a = createElement('a', { href: link.href, target: '_blank' })
			.text(link.text)
		createElement('li')
			.appendTo(content)
			.append(a)
	})
	let panel = createElement('div', { class: 'lavandula-panel-card' })
	createElement('div', { class: 'lavandula-panel-card-title' })
		.appendTo(panel)
		.text(title)
	createElement('div', { class: 'lavandula-panel-card-content' })
		.appendTo(panel)
		.append(content)
	return panel
}

module.exports = {
	createElement: createElement,
	createChipElement: createChipElement,
	createLinksPanelElement: createLinksPanelElement,
}