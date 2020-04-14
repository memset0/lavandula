function createElement(tag, attrs = {}, extend = {}) {
	let ele = $(`<${tag}></${tag}>`)
	_.each(attrs, (val, key) => ele.attr(key, val))
	_.each(extend, (val, key) => {
		switch (key) {
			case 'text': ele.text(val); break;
		}
	})
	return ele
}

function createChipElement(icon, text) {
	return createElement('div', {
		class: 'lavandula-chip'
	}).html(`
		<span class="lavandula-chip-icon"><i class="lavandula-icon material-icons">${icon}</i></span>
		<span class="lavandula-chip-title">${text}</span>
	`)
}

module.exports = {
	createElement: createElement,
	createChipElement: createChipElement,
}