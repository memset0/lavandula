function createElement(tag, attr = {}) {
	return $(`<${tag}/>`).attr(attr)
}

function createChipElement(icon, text) {
	return createElement('div', { class: 'lavandula-chip' })
		.html(`
			<span class="lavandula-chip-icon"><i class="lavandula-icon material-icons">${icon}</i></span>
			<span class="lavandula-chip-title">${text}</span>
		`)
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
	let element = createElement('div', { class: 'lavandula-panel-card' })
	createElement('div', { class: 'lavandula-panel-card-title' })
		.appendTo(element)
		.text(title)
	createElement('div', { class: 'lavandula-panel-card-content' })
		.appendTo(element)
		.append(content)
	return element
}

module.exports = {
	createElement: createElement,
	createChipElement: createChipElement,
	createLinksPanelElement: createLinksPanelElement,
}