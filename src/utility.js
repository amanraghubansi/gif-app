export default function debounce(func, wait) {
	var timer;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			timer = null;
			func.apply(context, args);
		}, wait);
	};
};