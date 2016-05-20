import $ from 'jQuery'

export function courseFromCourseBlock (courseBlock) {
  courseBlock = $(courseBlock)
  return {
    name: courseBlock.find('.course-content').text().replace(' - ', ''),
    location: courseBlock.find('.location').text()
  }
}

export function courseFromPopup(popup) {
  const content = $(popup).find('.popover')
  let items = content.find('em')
  let instructorName = content.find('[data-visible="instr"]').find('em').text().trim()
  let instructorId = instructorName.replace(/\s/g,'').replace(',','').toUpperCase()
  let course = {
    refNumber: items[0].innerText.trim(),
    section: items[1].innerText.trim(),
    creditHours: items[2].innerText.trim(),
    instructor: instructorName,
    instructorId,
    location: content.find('[data-visible="location"]').find('em').text().trim()
  }
  return course
}
