var Instructors = (function () {

	var instructors = new ArrayList();

	function Instructors() {}

	Instructors.prototype.get = function (profName, callback) {
		var instructor = instructors.get(profName);

		if (instructor) {
			callback(instructor.value);
		} else {
			Ajax.get('http://localhost:3000/search/' + profName, function (response) {
				if (response.successful) {
					var profId = response.data[0].id;
					Ajax.get('http://localhost:3000/prof/' + profId, function (response) {
						if (response.successful) {
							instructors.add(profName, response);
							instructors.add(profId, response);
						}
						callback(response);
					});
				} else {
					if (!response.successful) {
						console.log(response);
						console.log('---');
					}
					instructors.add(profName, {
						successful: false,
						data: false
					});
					callback(response);
				}
			});
		}
	};

	return new Instructors();
})();