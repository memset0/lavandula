import css from './style/main.less'

GM_addStyle(GM_getResourceText('mdui-css'))

function mdui_loader() {
	this.window = window
	eval(GM_getResourceText('mdui-js'))
}

unsafeWindow.lavandula = {}

unsafeWindow.lavandula.$ = $
unsafeWindow.lavandula.mode = 'development'

unsafeWindow.lavandula.mdui = (new mdui_loader()).lavandula
unsafeWindow.lavandula.mduiJQ = unsafeWindow.lavandula.mdui.JQ

unsafeWindow.lavandula.hyperscript = require('hyperscript')
unsafeWindow.lavandula.dom2hscript = require('dom2hscript')

require('./create')
require('./utils')
require('./algorithm')

unsafeWindow.lavandula.panel = require('./panel')
unsafeWindow.lavandula.reader = require('./reader')
unsafeWindow.lavandula.button = require('./button')
unsafeWindow.lavandula.tools = require('./tools')

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