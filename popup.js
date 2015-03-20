$(document).ready(function () {
  $('body')
    .append($('<img width="200"/>')
    .attr('src', chrome.extension.getURL('/images/course-buddy-banner.jpg')));
  $('body')
    .append($('<p/>')
    .html("Course Buddy brings Course Critique, Rate My Professors, the Gatech Course Catalog, and more right into Courseoff for all your Georgia Tech classes!"));

  $('body')
    .append('<hr/>');

  $('body')
    .append($('<p/>')
    .html('Written with love by <a href="#">Titus K. Woo</a>.')
    .click(function () {
      chrome.tabs.create({url: 'http://tituswoo.com'});
      return false;
    }));
});
