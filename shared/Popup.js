import $ from 'jQuery'

const template = '<div id="cbe-popup" style="position: absolute;"></div>'
let popup = $(template).appendTo('body')

export default { create, destroy }

function create(html, coords) {
  popup.html(html).css(coords)
}

function destroy() {
  popup.html('')
}
