function progress (button, text) {
	text = typeof text !== 'undefined' ? text : ''

	button.attr("disabled", "disabled");
	button.html("<i class='fa fa-refresh fa-spin'></i>" + text);
}

function remove (button, text) {
	text = typeof text !== 'undefined' ? text : ''

	button.removeAttr("disabled");
	button.html("<i class='fa fa-times'></i>" + text);
}

function edit (button, text) {
	text = typeof text !== 'undefined' ? text : ''

	button.removeAttr("disabled");
	button.html("<i class='fa fa-pencil'></i>" + text);
}