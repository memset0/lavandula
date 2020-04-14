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

module.exports = {
	createElement: createElement,
}