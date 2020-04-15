import css from './style/main.less'

GM_addStyle(GM_getResourceText('mdui-css'))

$(document).ready(function () {
	unsafeWindow.lavandula = {
		mode: 'development',
		tools: new (require('./tools.js'))(),
		panel: new (require('./panel.js'))(),
		reader: new (require('./reader.js'))(),
		button: new (require('./button.js'))(),
	}
	if (lavandula.mode == 'development') {
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
	if (lavandula.mode == 'development') {
		if (lavandula.reader.loaded) {
			$('#lavandula-toggle-button').click()
		}
	}
})