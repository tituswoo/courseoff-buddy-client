var Instructors = (function () {

	var instructors = new ArrayList();

	function Instructors() {}

	Instructors.prototype.get = function (profName, callback) {
		var instructor = instructors.get(profName);

		if (instructor) {
			callback({
				successful: true,
				data: instructor.value
			});
		} else {
			Ajax.get('http://courseoffbuddy.tk/search/' + profName, function (response) {
				if (response.successful) {
					var profId = response.data[0].id;
					Ajax.get('http://courseoffbuddy.tk/prof/' + profId, function (response) {
						if (response.successful) {
							instructors.add(profName, response.data);
							instructors.add(profId, response.data);
						}
						callback(response);
					});
				} else {
					callback(response);
				}
			})
		}
	};

	return new Instructors();
})();