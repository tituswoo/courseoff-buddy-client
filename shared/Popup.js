import $ from 'jQuery'

const template = '<div id="cbe-popup" style="position: absolute;"></div>'
let popup = $(template)

export default { create, update, destroy }

function create(html, coords) {
  destroy()
  popup = $(template).appendTo('body')
  return popup.html(html).css(coords)
}

function update(newHtml) {
  popup.html(newHtml)
}

function destroy() {
  popup.remove()
}
