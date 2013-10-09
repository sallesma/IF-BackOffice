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
            $('#addNewModal').modal('hide');
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
			//alert("Data Saved: " + msg);
			getArtist();
		}).fail(function(msg) {
			alert("Failure");
		});
	});
    
    
  

    $("body").on("click", "#modifyNewButton", function() {
        
        $('#editNewsModal').modal('show');
        var formClass = $(this).parent().parent();
        
        
        var id = formClass.find('input[name="rowID"]').val();
        var title = formClass.find('input[name="title"]').val();
        var content = formClass.find('input[name="content"]').val();
        
        $('#editNewsModal').find('input[id="rowID"]').val(id);
        $('#editNewsModal').find('input[id="newTitle"]').val(title);
        $('#editNewsModal').find('textarea[id="newBody"]').val(content);
        
   
	});
    

    $('#editNewButton').click(function() {
        
        var id = $('#editNewsModal').find('input[id="rowID"]').val();
        var title =  $('#editNewsModal').find('input[id="newTitle"]').val();
        var content = $('#editNewsModal').find('textarea[id="newBody"]').val();
        
        $.ajax({
			type : "POST",
			url : "data/updateNew.php",
			data : {
                id : id,
				title : title,
                content : content
			}
		}).done(function(msg) {
            $('#editNewsModal').modal('hide');
			getNews();
		}).fail(function(msg) {
			alert("Failure");
		});
        
    });
    
    
});



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