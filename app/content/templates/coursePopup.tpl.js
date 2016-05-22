import Handlebars from 'handlebars'
import coursePopup from './coursePopup.html'
import styles from '../coursePopup.css'

export default function(course) {
  const bundle = {
    ...course,
    styles
  }
  console.info('bundle:', bundle)
  return Handlebars.compile(coursePopup)(bundle)
}
