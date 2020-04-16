import css from './style/main.less'

GM_addStyle(GM_getResourceText('mdui-css'))

function mdui_loader() {
	this.window = unsafeWindow
	this.lavandula = {}
	eval(GM_getResourceText('mdui-js'))
}

unsafeWindow.$ = $
unsafeWindow.lavandula = {}
unsafeWindow.lavandula.mode = 'development'
unsafeWindow.lavandula.mdui = (new mdui_loader()).lavandula

require('./utils.js')

unsafeWindow.lavandula.tools = new (require('./tools.js'))()
unsafeWindow.lavandula.panel = new (require('./panel.js'))()
unsafeWindow.lavandula.reader = new (require('./reader.js'))()
unsafeWindow.lavandula.button = new (require('./button.js'))()

if (lavandula.mode == 'development') {
	unsafeWindow.lavandula = Object.assign(unsafeWindow.lavandula, {
		GM_getValue: GM.getValue,
		GM_setValue: GM.setValue,
		GM_listValues: GM.listValues,
		GM_deleteValue: GM.deleteValue,
	})
}

$(document).ready(function () {
	if (lavandula.reader.loaded) {
		$('body').append(lavandula.reader.create())
	}
	$('body').append(lavandula.panel.create())
	$('body').append(lavandula.button.create())
	if (lavandula.reader.loaded) {
		$('#lavandula-toggle-button').click()
	}
})