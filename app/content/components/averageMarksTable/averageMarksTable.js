import Handlebars from 'handlebars'
import template from './averageMarksTable.html'
import styles from './averageMarksTable.css'

export default function(averageMarks) {
  const bundle = {
    ...averageMarks,
    styles
  }
  return Handlebars.compile(template)(bundle)
}
