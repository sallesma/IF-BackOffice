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

// Show the artist modal to add a new one
$('#showArtistModalToAdd').click(function() {
    loadEmptyArtistModal();
    $("#artistModal").modal('show');
});

//Set up visit links in modal
$('.visit-link').each(function() {
	$(this).click(function() {
		var url = $(this).parent().parent().find('.input-link').val();
		window.open(url);
	})
});

$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './src/fileUpload/index.php?directory=artists';
    $('#artistFileUpload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
            $("#art-image").val(file.url);
            $("#photoArtist").html('<a href="#" class="thumbnail"><img src="'+file.url + '" alt="..."></a></div>');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progressArtist .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

// Open artist modal with a specific artist
$(document).on('click', '.showArtistButton', function (event) {
    var target = $(event.currentTarget);
    var id = target.parent().find('input[name="id"]');

    $.ajax({
        type: "GET",
        url: "artist/"+id.val(),
    }).done(function (msg) {
        var artist = $.parseJSON(msg);
        loadArtistModalWithObject(artist);
        $('#artistModal').modal('show');
    }).fail(function (msg) {
        alert("Failure");
    });
});

$(document).on('click', '.artistDeleteButton', function (event) {
	if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
		var $button = $(this);
		progress($button);

        var id = $(event.currentTarget).parent().find('input[name="id"]');

        $.ajax({
            type: "DELETE",
            url: "artist/"+id.val(),
        }).done(function (msg) {
			remove($button);
            getArtists();
            $("#onDeleteArtistAlert").show();
        }).fail(function (msg) {
			remove($button);
            alert("Echec à la suppression de l'artiste");
        });
    }
});

// Save new or update existing artist
$('#artistModalActionButton').click(function() {

    var id = $(this).parent().parent().parent().find('input[name="id"]').val();

    if (id =='-1') {
        // New artist : add it to the DB
        $.ajax({
            type : "POST",
            url : "artist",
            data : {
                name : $("#art-name").val(),
                style : $("#art-style").val(),
                picture : $("#art-image").val(),
                description : $("#art-description").val(),
                day : $("#art-day").val(),
                stage : $("#art-scene").val(),
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
            alert("Echec à l'ajout de l'artiste");
        });

    } else {
        // Existing artist : update in the db
        var modal = $('#artistModal');

        $.ajax({
            type : "PUT",
            url : "artist/"+id,
            data : {
                name: modal.find('#art-name').val(),
                picture: modal.find('#art-image').val(),
                style: modal.find('#art-style').val(),
                description: modal.find('#art-description').val(),
                day: modal.find('#art-day').val(),
                stage: modal.find('#art-scene').val(),
                startTime: modal.find('#art-start-time').val(),
                endTime: modal.find('#art-end-time').val(),
                website: modal.find('#art-website').val(),
                facebook: modal.find('#art-facebook').val(),
                twitter: modal.find('#art-twitter').val(),
                youtube: modal.find('#art-youtube').val()
            }
        }).done(function(msg) {
            $('#artistModal').modal('hide');
            getArtists();
        }).fail(function(msg) {
            alert("Echec à la mise à jour de l'artiste");
        });
    }

});

function getArtists() {
    $.get("artist", function(jsonArtistsTable) {
		jsonArtistsTable=JSON.parse(jsonArtistsTable);
		artistsHtmlString = '';
		$.each(jsonArtistsTable, function(index, artist) {
			artistsHtmlString += "<tr>";
			artistsHtmlString += "<td>" + artist.name + "</td>";
			artistsHtmlString += "<td>" + artist.style + "</td>";
			artistsHtmlString += "<td>" + artist.stage + "</td>";
			artistsHtmlString += "<td>" + artist.day + "</td>";
			artistsHtmlString += "<td>" + artist.beginHour + "</td>";
			artistsHtmlString += "<td>";
			artistsHtmlString += "	<div class='btn-group'>";
            artistsHtmlString += "	<input type='hidden' value='" + artist.id + "' name='id'/>";
            artistsHtmlString += "	<button class='btn btn-default showArtistButton'><i class='fa fa-pencil'></i></button>";
            artistsHtmlString += "	<button class='artistDeleteButton btn btn-default'><i class='fa fa-times'></i></button>";
			artistsHtmlString += "	</div>";
			artistsHtmlString += "</td>";
			artistsHtmlString += "</tr>";
		});
        $("#artists-table tbody").html(artistsHtmlString);
    }).fail(function(msg) {
		alert("Echec au chargement des artistes");
	});
}

function loadArtistModalWithObject(artist){
    var modal = $('#artistModal');
    modal.find('input[name="id"]').val(artist.id);
    modal.find('#title').html('Modifier un artiste');
    modal.find('#artistModalActionButton').html('Sauvegarder');
    modal.find('#art-name').val(artist.name);
    modal.find('#art-image').val(artist.picture);

    if (artist.picture != '') {
        modal.find("#photoArtist").html('<a href="#" class="thumbnail"><img src="'+artist.picture + '" alt="..."></a></div>');
        modal.find("#artistFileButtonName").html('Modifier l\'image');
    }
    else {
        modal.find("#artistFileButtonName").html('Sélectionner une image');
        modal.find("#photoArtist").html('');
    }
    modal.find('#art-style').val(artist.style);
    modal.find('#art-description').val(artist.description);
    modal.find('#art-day').val(artist.day);
    modal.find('#art-scene').val(artist.stage);
    modal.find('#art-start-time').val(artist.beginHour);
    modal.find('#art-end-time').val(artist.endHour);
    modal.find('#art-website').val(artist.website);
    modal.find('#art-facebook').val(artist.facebook);
    modal.find('#art-twitter').val(artist.twitter);
    modal.find('#art-youtube').val(artist.youtube);
}


function loadEmptyArtistModal(){
    var modal = $('#artistModal');
    modal.find('input[name="id"]').val('-1');
    modal.find('#title').html('Ajouter un artiste');
    modal.find("#artistFileButtonName").html('Sélectionner une image');
    modal.find('#artistModalActionButton').html('Ajouter');
    modal.find('#art-name').val('');
    modal.find('#art-image').val('');
    modal.find("#photoArtist").html('');
    modal.find('#art-style').val('');
    modal.find('#art-description').val('');
    modal.find('#art-website').val('');
    modal.find('#art-facebook').val('');
    modal.find('#art-twitter').val('');
    modal.find('#art-youtube').val('');
}
