function progress (button) {
	button.attr("disabled", "disabled");
	button.html("<i class='fa fa-refresh fa-spin'></i>");
}

function remove (button) {
	button.removeAttr("disabled");
	button.html("<i class='fa fa-times'></i>");
}

function edit (button) {
	button.removeAttr("disabled");
	button.html("<i class='fa fa-pencil'></i>");
}