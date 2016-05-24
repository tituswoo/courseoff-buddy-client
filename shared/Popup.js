import $ from 'jQuery'

const template = '<div id="cbe-popup" style="position: absolute;"></div>'
let popup = $(template)

export default { create, update, destroy }

function create(html, elementToAnchorTo) {
  destroy()

  popup = $(template).appendTo('body')

  const coords = { ...$(elementToAnchorTo).offset() }
  const width = $(elementToAnchorTo).width()

  return popup.html(html).css({ top: coords.top, left: coords.left + width })
}

function update(newHtml) {
  popup.html(newHtml)
}

function destroy() {
  popup.remove()
}
