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
				if (course.status != '404') {
					courses.add(course.title.replace(' ', ''), course);
					if (callback) callback(course);
				} else {
					courses.add(false);
					if (callback) callback(false);
				}
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

function makeAverageMarksTable(averages, color) {		
	color = color || 'white';
	// table to hold averageMarks
	var table = $('<table/>').addClass('average-marks-table');
	table.css({
		backgroundColor: color
	});
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
	try {
		$('<td/>').text(averages.gpa).appendTo(body);
		$('<td/>').text(averages.a).appendTo(body);
		$('<td/>').text(averages.b).appendTo(body);
		$('<td/>').text(averages.c).appendTo(body);
		$('<td/>').text(averages.d).appendTo(body);
		$('<td/>').text(averages.f).appendTo(body);
	} catch (e) {
		return false;
	}
	// put everything into the table
	header.appendTo(table);
	body.appendTo(table);

	return table;
}

function makeProfessorPillbox(professor) {
	var container = $('<div/>').addClass('professor-pillbox');
	var averageMarksTable = makeAverageMarksTable(professor.averageMarks);
	var rmp = professor.rateMyProfessors;


	var rmpBox = $('<div/>').addClass('rmp-box');

	try {
		var clarity = $('<div/>').html('clarity');
		rmp.clarity = rmp.clarity || '?';
		clarity.append($('<span/>').html(rmp.clarity));

		var easiness = $('<div/>').html('easiness');
		rmp.easiness = rmp.easiness || '?';
		easiness.append($('<span/>').html(rmp.easiness));

		var helpfulness = $('<div/>').html('helpfulness');
		rmp.helpfulness = rmp.helpfulness || '?';
		helpfulness.append($('<span/>').html(rmp.helpfulness));

		clarity.appendTo(rmpBox);
		easiness.appendTo(rmpBox);
		helpfulness.appendTo(rmpBox);

		container.append(rmpBox);
		container.append(averageMarksTable);
	} catch (e) {
		return false;
	}
	return container;
}

function retrieve(command, params, callback) {
	chrome.runtime.sendMessage({
		command: command,
		params: params
	}, callback);
}

function LoadingScreen(element) {
	console.log('showing loading screen');
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

function RGBtoRGBA(rgb, opacity) {
	rgb = String(rgb);
	rgb = rgb.replace('rgb', 'rgba');
	rgba = rgb.substr(0, rgb.indexOf(')')) + ',' + opacity + ')';
	return rgba;
}

function Loader(target) {
	var randID = Math.floor(Math.random() * 10) + new Date().getSeconds();
	var id = 'ls' + randID;
	var spinnerHTML = '<p id="'+id+'"><img width="16" src=' + chrome.extension.getURL('/images/spinner.gif') + '/> Loading...</p>';

	this.begin = function () {
		target.append(spinnerHTML);
	}

	this.end = function () {
		$('#'+id).remove();
	}

	this.error = function (msg) {
		$('#'+id).fadeOut(function () {
			$('#'+id).html(msg).fadeIn();
		});		
	}
}