$(document).ready(function () {
  $('body')
    .append($('<img width="300"/>')
    .attr('src', chrome.extension.getURL('/images/course-buddy-banner.jpg')));
  $('body')
    .append($('<p/>')
    .html("Courseoff Buddy brings Course Critique, Rate My Professors, the Gatech Course Catalog, and more right into Courseoff for all your Georgia Tech classes!"));

  $('body')
    .append('<hr/>');

  $('body')
    .append($('<p/>')
    .html('Created with love by <a href="#">Titus Woo</a>.')
    .click(function () {
      chrome.tabs.create({url: 'http://tituswoo.com'});
      return false;
    }));
});
