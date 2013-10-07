$(document).ready(function() {
	getNews();
	getArtists();

	$.get("data/getInfosCategories.php", function(data) {
		$("#infoCategory-table").html(data);
	});

	$.get("data/getInfos.php", function(data) {
		$("#infos-table").html(data);
	});

	$('#addNewButton').click(function() {
		$.ajax({
			type : "POST",
			url : "data/addNew.php",
			data : {
				title : $("#newTitle").val(),
				body : $("#newBody").val()
			}
		}).done(function(msg) {
			alert("Data Saved: " + msg);
			getNews();
		}).fail(function(msg) {
			alert("Failure");
		});
	});

	$('#addArtistButton').click(function() {
		$.ajax({
			type : "POST",
			url : "data/addArtist.php",
			data : {
				name : $("#artistName").val(),
				style : $("#artistStyle").val()
			}
		}).done(function(msg) {
			alert("Data Saved: " + msg);
			getArtist();
		}).fail(function(msg) {
			alert("Failure");
		});
	});

})

function getNews() {
	$.get("data/getNews.php", function(data) {
		$("#news-table").html(data);
	});
}

function getArtists() {
	$.get("data/getArtists.php", function(data) {
		$("#artists-table").html(data);
	});
}