import css from './style/main.less'

$(document).ready(function () {
	unsafeWindow.lavandula = {
		tools: new (require('./tools.js'))(),
		panel: new (require('./panel.js'))(),
		reader: new (require('./reader.js'))(),
		button: new (require('./button.js'))(),
		GM_getValue: GM.getValue,
		GM_setValue: GM.setValue,
		GM_listValues: GM.listValues,
		GM_deleteValue: GM.deleteValue,
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