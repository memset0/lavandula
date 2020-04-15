import css from './style/main.less'

$(document).ready(function () {
	const mode = 'development'
	unsafeWindow.lavandula = {
		tools: new (require('./tools.js'))(),
		panel: new (require('./panel.js'))(),
		reader: new (require('./reader.js'))(),
		button: new (require('./button.js'))(),
	}
	if (mode == 'development') {
		unsafeWindow.lavandula = Object.assign(unsafeWindow.lavandula, {
			GM_getValue: GM.getValue,
			GM_setValue: GM.setValue,
			GM_listValues: GM.listValues,
			GM_deleteValue: GM.deleteValue,
		})
	}
	if (lavandula.reader.loaded) {
		$('body').append(lavandula.reader.create())
	}
	$('body').append(lavandula.panel.create())
	$('body').append(lavandula.button.create())
	if (mode == 'development') {
		if (lavandula.reader.loaded) {
			$('#lavandula-toggle-button').click()
		}
	}
})