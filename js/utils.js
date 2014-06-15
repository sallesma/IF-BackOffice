function progress (button, text='') {
	button.attr("disabled", "disabled");
	button.html("<i class='fa fa-refresh fa-spin'></i>" + text);
}

function remove (button, text='') {
	button.removeAttr("disabled");
	button.html("<i class='fa fa-times'></i>" + text);
}

function edit (button, text='') {
	button.removeAttr("disabled");
	button.html("<i class='fa fa-pencil'></i>" + text);
}