import $ from 'jQuery'
import Handlebars from 'handlebars'

export function courseInfoContainer(courseInfoContainer, html, bkgColor) {
  let target = $(courseInfoContainer)
  const s = require('content/hydrators/courseInfoContainer.css')
  let template = Handlebars.compile(`
    <div class="{{s.wrap}}" style="background-color:{{bkgColor}};">
      ${html}
    </div>
  `)({ s, bkgColor })
  $(template).hide().insertBefore(target.find('.table')).fadeIn()
}
