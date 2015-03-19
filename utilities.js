var ArrayList = (function () {
	function ArrayList() {}
	var data = [];

	ArrayList.prototype.add = function (key, object) {
		if (!exists(key)) {
			data.push({
				key: key,
				value: object
			});
		}
	};

	ArrayList.prototype.getData = function () {
		return data;
	};

	ArrayList.prototype.get = function (key) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].key === key) return data[i];
		}
		return false;
	};

	ArrayList.prototype.size = function () {
		return data.length;
	};

	// helper methods:
	
	function exists(key) {
		var found = false;
		data.map(function (item) {
			if (item.key === key && item.key) {
				found = true;
			}
		});
		return found;
	}

	return ArrayList;
})();

function downloadCourseStats(courseTitle, callback) {
	retrieve('search', {query: courseTitle}, function (results) {
		if (results.status === 404) {
			courses.add(false); // needed to make sure onResourcesLoaded works.
			if (callback) callback(false);
		} else {
			var id = results[0].id;
			retrieve('course', {id: id}, function (course) {
				courses.add(course.title.replace(' ', ''), course);
				if (callback) callback(course);
			});
		}
	});
}

function getProfessorStats(profName, callback) {
	retrieve('search', {query: profName}, function (results) {
		if (results.status != '404') {
			var profID = results[0].id;
			retrieve('prof', {id: profID}, function (data) {
				callback(data);
			});
		} else {
			callback(false);
		}
	});
}

function makeAverageMarksTable(averages) {		
	// table to hold averageMarks
	var table = $('<table/>').addClass('average-marks-table');
	// header section
	var header = $('<tr/>');
	$('<th/>').text('GPA').appendTo(header);
	$('<th/>').text('A%').appendTo(header);
	$('<th/>').text('B%').appendTo(header);
	$('<th/>').text('C%').appendTo(header);
	$('<th/>').text('D%').appendTo(header);
	$('<th/>').text('F%').appendTo(header);
	// content section
	var body = $('<tr/>');
	$('<td/>').text(averages.gpa).appendTo(body);
	$('<td/>').text(averages.a).appendTo(body);
	$('<td/>').text(averages.b).appendTo(body);
	$('<td/>').text(averages.c).appendTo(body);
	$('<td/>').text(averages.d).appendTo(body);
	$('<td/>').text(averages.f).appendTo(body);
	// put everything into the table
	header.appendTo(table);
	body.appendTo(table);

	return table;
}

function retrieve(command, params, callback) {
	chrome.runtime.sendMessage({
		command: command,
		params: params
	}, callback);
}

function LoadingScreen(element) {
	var id = 'loading-screen';

	var overlay = $('<div/>').attr('id', id).css({
		paddingTop: (element.height() / 2) - 50
	});
	overlay.append($('<h2/>').html('Loading enhancements...'));
	overlay.append($('<img/>').attr('src', chrome.extension.getURL('/images/spinner.gif')));

	this.show = function () {
		overlay.appendTo(element);
	};

	this.hide = function () {
		$('#' + id).fadeOut(500, function () {
			$(this).remove();
		})
	};
}

function numCourses() {
	return $('.course-list > .course-info-container').size();
}