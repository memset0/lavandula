import css from './style.less'

window.lavandula = {
	panel: new (require('./panel.js'))(),
	reader: new (require('./reader.js'))(),
	button: new (require('./button.js'))(),
}

$('body').ready(function () {
	if (lavandula.reader.load()) {
		$('body').append(lavandula.reader.create())
	}
	$('body').append(lavandula.panel.create())
	$('body').append(lavandula.button.create())
	if (lavandula.reader.load()) {
		$('#lavandula-toggle-button').click()
	}
})