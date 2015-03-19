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
			if (item.key === key) {
				found = true;
			}
		});
		return found;
	}

	return ArrayList;
})();