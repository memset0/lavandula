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

function createLinksCardElement(title, links) {
	let content = createElement('ul')
	links.forEach(link => {
		createElement('li')
			.appendTo(content)
			.append(
				createElement('a', { href: link.href, target: '_blank' })
					.text(link.text)
			)
	})
	let element = createElement('div', { class: 'lavandula-panel-card' })
		.append(
			createElement('div', { class: 'lavandula-panel-card-title' })
				.text(title)
		)
		.append(
			createElement('div', { class: 'lavandula-panel-card-content' })
				.append(content)
		)
	return element
}

module.exports = {
	createElement: createElement,
	createChipElement: createChipElement,
	createLinksCardElement: createLinksCardElement,
}