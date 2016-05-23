import $ from 'jQuery'
import courseInfoContainerStyles from 'content/hydrators/courseInfoContainer.css'

export function courseInfoContainer(courseInfoContainer, html) {
  let target = $(courseInfoContainer)
  let template = `<div class="test">${html}</div>`
  $(template).hide().insertBefore(target.find('.table')).fadeIn()
}
