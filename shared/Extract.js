import $ from 'jQuery';
import { RGBtoRGBA } from 'shared/ColorUtilities';

const unknown = '?';

export function courseFromCourseBlock(courseBlock) {
  const block = $(courseBlock);

  const y = block.offset().top;

  return {
    id: block.find('.course-content').text().replace(' - ', '') || unknown,
    location: block.find('.location').text() || unknown,
    color: colorFromCourseBlock(block),
    x: block.offset().left + block.width(),
    y,
  };
}

export function courseFromPopup(popup) {
  const content = $(popup).find('.popover');
  const items = content.find('em');
  const instructorName = content.find('[data-visible="instr"]').find('em').text().trim();
  const instructorId = instructorName.replace(/\s/g, '').replace(',', '').toUpperCase();
  const course = {
    title: content.find('.title').text().trim() || unknown,
    ref: items[0].innerText.trim() || unknown,
    section: items[1].innerText.trim() || unknown,
    credits: items[2].innerText.trim() || unknown,
    instructor: instructorName || unknown,
    instructorId,
    location: content.find('[data-visible="location"]').find('em').text().trim() || unknown,
  };
  return course;
}

export function colorFromCourseInfoContainer(container) {
  container = $(container);
  const color = container.css('border-left-color');
  return RGBtoRGBA(color, '0.15');
}

export function colorFromCourseBlock(block) {
  const color = $(block).css('backgroundColor');
  return color;
}
