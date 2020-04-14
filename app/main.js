import css from './style/main.less'

$(document).ready(function () {
	window.lavandula = {
		tools: new (require('./tools.js'))(),
		panel: new (require('./panel.js'))(),
		reader: new (require('./reader.js'))(),
		button: new (require('./button.js'))(),
	}
	if (lavandula.reader.loaded) {
		$('body').append(lavandula.reader.create())
	}
	$('body').append(lavandula.panel.create())
	$('body').append(lavandula.button.create())
	if (lavandula.reader.loaded) {
		$('#lavandula-toggle-button').click()
	}
})