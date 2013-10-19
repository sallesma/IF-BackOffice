$(document).ready(function() {
	getNews();
	getArtists();
	getInfos();
    

    //Setup time pickers
    $("#art-start-time").timepicker({
                minuteStep: 15,
                showInputs: false,
                disableFocus: true,
                showMeridian:false
    });
    
    $("#art-end-time").timepicker({
                minuteStep: 15,
                showInputs: false,
                disableFocus: true,
                showMeridian:false
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
    
    
    $('#showArtistModalToAdd').click(function() {
        loadEmptyArtistModal();
        $("#artistModal").modal('show');
    });

	$('#artistModalActionButton').click(function() {
		$.ajax({
			type : "POST",
			url : "data/addArtist.php",
			data : {
				name : $("#art-name").val(),
				style : $("#art-style").val(),
                description : $("#art-description").val(),
                day : $("#art-day").val(),
                scene : $("#art-scene").val(),
                startTime :$("#art-start-time").val(),
                endTime :$("#art-end-time").val(),
                website : $("#art-website").val(),
                facebook : $("#art-facebook").val(),
                twitter : $("#art-twitter").val(),
                youtube : $("#art-youtube").val()
			}
		}).done(function(msg) {
			$("#artistModal").modal('hide');
			getArtists();
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
    
 $(document).on('click', '.showArtistButton', function (event) {
        var target = $(event.currentTarget);
        var id = target.parent().find('input[name="id"]');
        
        $.ajax({
            type: "GET",
            url: "data/getArtist.php?id="+id.val(),
        }).done(function (msg) {
            var artist = $.parseJSON(msg);
            loadArtistModalWithObject(artist);
            $('#artistModal').modal('show');
        }).fail(function (msg) {
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
function getInfos() {
    
	$.get("data/getInfos.php", function(data) {
        alert(data);
        $('#infos-div').jqxTree({ source:data, height: '300px', width: '300px' });
	});
    
    //example tree
    $('#exampleTree').jqxTree({ height: '300px', width: '300px' });
    $('#exampleTree').bind('select', function (event) {
            var htmlElement = event.args.element;
            var item = $('#exampleTree').jqxTree('getItem', htmlElement);
            alert(item.label);
    });
}

function loadArtistModalWithObject(artist){
    
    var modal = $('#artistModal');
    modal.find('#title').html('Modifier un artiste');
    modal.find('#artistModalActionButton').html('Sauvegarder');
    modal.find('#art-name').val(artist.nom);
    modal.find('#art-style').val(artist.genre);
    modal.find('#art-description').val(artist.description);
    modal.find('#art-day').val(artist.jour);
    modal.find('#art-scene').val(artist.scene);
    modal.find('#art-start-time').val(artist.debut);
    modal.find('#art-end-time').val(artist.fin);
    modal.find('#art-website').val(artist.website);
    modal.find('#art-facebook').val(artist.facebook);
    modal.find('#art-twitter').val(artist.twitter);
    modal.find('#art-youtube').val(artist.youtube);
}


function loadEmptyArtistModal(){
    
    var modal = $('#artistModal');
    modal.find('#title').html('Ajouter un artiste');
    modal.find('#artistModalActionButton').html('Ajouter');
    modal.find('#art-name').val('');
    modal.find('#art-style').val('');
    modal.find('#art-description').val('');
    modal.find('#art-website').val('');
    modal.find('#art-facebook').val('');
    modal.find('#art-twitter').val('');
    modal.find('#art-youtube').val('');
}
