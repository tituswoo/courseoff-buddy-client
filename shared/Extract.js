import $ from 'jQuery'

const unknown = '?'

export function courseFromCourseBlock (courseBlock) {
  courseBlock = $(courseBlock)
  return {
    name: courseBlock.find('.course-content').text().replace(' - ', '') || unknown,
    location: courseBlock.find('.location').text() || unknown
  }
}

export function courseFromPopup(popup) {
  const content = $(popup).find('.popover')
  let items = content.find('em')
  let instructorName = content.find('[data-visible="instr"]').find('em').text().trim()
  let instructorId = instructorName.replace(/\s/g,'').replace(',','').toUpperCase()
  let course = {
    title: content.find('.title').text().trim() || unknown,
    refNumber: items[0].innerText.trim() || unknown,
    section: items[1].innerText.trim() || unknown,
    creditHours: items[2].innerText.trim() || unknown,
    instructor: instructorName || unknown,
    instructorId,
    location: content.find('[data-visible="location"]').find('em').text().trim() || unknown
  }
  return course
}
