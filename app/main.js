import css from './style/main.less'

GM_addStyle(GM_getResourceText('mdui-css'))

function mdui_loader() {
	this.window = window
	eval(GM_getResourceText('mdui-js'))
}

unsafeWindow.lavandula = {}

unsafeWindow.lavandula.mode = 'development'

unsafeWindow.lavandula.Jquery = $

unsafeWindow.lavandula.mdui = (new mdui_loader()).lavandula
unsafeWindow.lavandula.mduiJQ = unsafeWindow.lavandula.mdui.JQ

unsafeWindow.lavandula.hyperscript = require('hyperscript')
unsafeWindow.lavandula.dom2hscript = require('dom2hscript')

unsafeWindow.lavandula.$ = $(lavandula.hyperscript('div.lavandula-body')).appendTo('body')

require('./create')
require('./utils')
require('./algorithm')

unsafeWindow.lavandula.panel = require('./panel')
unsafeWindow.lavandula.reader = require('./reader')
unsafeWindow.lavandula.tools = require('./tools')
unsafeWindow.lavandula.button = require('./button')

lavandula.$.append(lavandula.reader.$)
lavandula.$.append(lavandula.panel.$)
lavandula.$.append(lavandula.button.$)
lavandula.mdui.mutation()

if (lavandula.mode == 'development' && lavandula.reader.lib) {
	lavandula.button.$.click()
}