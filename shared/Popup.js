import $ from 'jQuery'

const template = '<div id="cbe-popup" style="position: absolute;"></div>'
let popup = $(template).appendTo('body')

export default { create, update, destroy }

function create(html, coords) {
  return popup.html(html).css(coords)
}

function update(newHtml) {
  popup.html(newHtml)
}

function destroy() {
  popup.html('')
}
