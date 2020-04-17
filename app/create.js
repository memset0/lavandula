lavandula.create = {}

let create = lavandula.create
let h = lavandula.hyperscript

create.element = (tag, attr = {}) => $(`<${tag}/>`).attr(attr)

create.link = (href, text) => h('a', { href: href }, text)
create.linkNewTab = (href, text) => h('a', { href: href, target: '_blank' }, text)

create.icon = icon => h('i.lavandula-icon.material-icons', icon)
create.button = text => h('button.lavandula-btn', text)
create.block_button = text => h('button.lavandula-btn.lavandula-btn-block', text)

create.icon_button = icon =>
  h('button.lavandula-btn.lavandula-btn-icon',
    h('i.lavandula-icon.material-icons', icon))

create.chip = (text, icon = '') =>
  h('div.lavandula-chip', icon ?
    h('span.lavandula-chip-icon',
      h('i.lavandula-icon.material-icons', icon)) : null,
    h('span.lavandula-chip-title', text))

create.textarea = (label, text = null, icon = null, id = null) =>
  h('div.lavandula-textfield.lavandula-textfield-floating-label', icon ?
    h('i.lavandula-icon.material-icons', icon) : undefined, label ?
    h('label.lavandula-textfield-label', label) : undefined,
    h('textarea.lavandula-textfield-input', { id: id }, text))

create.table = (keySet, dataSet) =>
  h('div.lavandula-table-fluid',
    h('table.lavandula-table.lavandula-table-hoverable',
      h('thead',
        h('tr', keySet.map(key =>
          h('td', key)))),
      h('tbody', dataSet.map(data =>
        h('tr', keySet.map(key =>
          h('td', data[key])))))))

create.panel = (title, $content) =>
  h('div.lavandula-panel-card',
    h('div.lavandula-panel-card-title', title),
    h('div.lavandula-panel-card-content', $($content)[0]))

create.panel_links = (title, links) => create.panel(title,
  h('ul', links.map(link =>
    h('li',
      h('a', link.text, { href: link.href, target: '_blank' })))))