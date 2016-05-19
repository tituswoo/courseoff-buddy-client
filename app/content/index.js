import $ from 'jquery'
import mainStyles from './main.css'

import credits from './templates/credits.html'

console.info('RUNNING CONTENT SCRIPT')

$('.calendar-panel .noprint').append(credits)
