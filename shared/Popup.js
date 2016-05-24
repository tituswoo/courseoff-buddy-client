import $ from 'jQuery'

const template = '<div id="cbe-popup" style="position: absolute;"></div>'
let popup = $(template)

export default { create, update, destroy }

function create(html, elementToAnchorTo) {
  destroy()
  popup = $(template).appendTo('body')

  const coords = { ...$(elementToAnchorTo).offset() }
  const width = $(elementToAnchorTo).width()

  popup.html(html).css({ top: coords.top, left: coords.left + width })

  let start, end

  popup.on('mouseleave', e => {
    let condition = $(e.relatedTarget).closest(elementToAnchorTo)
    if (condition.length < 1) {
      destroy()
    }
  })

  $(elementToAnchorTo).on('mouseleave', e => {
    let condition = $(e.relatedTarget).closest(popup)
    if (condition.length < 1) {
      destroy()
    }
  })
}

function update(newHtml) {
  popup.html(newHtml)
}

function destroy() {
  popup.remove()
}
