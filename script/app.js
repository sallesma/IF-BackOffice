$(document).ready(function() {
    getNews();
    getArtists();
    getInfos();
    
});



/*--------*/
/*- NEWS -*/
/*--------*/

// Add a new news
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


// Open News modal with an existing news
$(document).on("click", "#modifyNewButton", function() {
    
    $('#editNewsModal').modal('show');
    
    var formClass = $(this).parent().parent();
    
    var id = formClass.find('input[name="rowID"]').val();
    var title = formClass.find('input[name="title"]').val();
    var content = formClass.find('input[name="content"]').val();
    
    $('#editNewsModal').find('input[id="rowID"]').val(id);
    $('#editNewsModal').find('input[id="newTitle"]').val(title);
    $('#editNewsModal').find('textarea[id="newBody"]').val(content);
});

// Modify an existing news
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

/*-----------*/
/*- ARTISTS -*/
/*-----------*/

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

// Open artist modal with a specific artist
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


// Save new or update existing artist
$('#artistModalActionButton').click(function() {
    //Get ID of the article
    
    var id = $(this).parent().parent().parent().find('input[name="id"]').val();
    
    if (id =='-1') {
        
        // New artist : add it to the DB
        // TO DO : form secure and 
        
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
        
    } else {
        // Existing artist : update in the db
        var modal = $('#artistModal');
        $.ajax({
        type : "POST",
        url : "data/updateArtist.php",
        data : {
            id : id,
            name: modal.find('#art-name').val(),
            genre: modal.find('#art-style').val(),
            description: modal.find('#art-description').val(),
            day: modal.find('#art-day').val(),
            scene: modal.find('#art-scene').val(),
            start_time: modal.find('#art-start-time').val(),
            end_time: modal.find('#art-end-time').val(),
            website: modal.find('#art-website').val(),
            facebook: modal.find('#art-facebook').val(),
            twitter: modal.find('#art-twitter').val(),
            youtube: modal.find('#art-youtube').val()   
        }
    }).done(function(msg) {
        alert(msg);
        $('#artistModal').modal('hide');
        getArtists();
    }).fail(function(msg) {
        alert("Failure");
    });
    }
    
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
	$.getJSON("data/getInfos.php", function(data) {
		$('#infos-tree').jqxTree({ source:computeTree(data), height: '300px', width: '300px' });
		$('#infos-tree').bind('select', function (event) {
			var htmlElement = event.args.element;
			var item = $('#infos-tree').jqxTree('getItem', htmlElement);
			alert(item.label);
		});
    });
}

var computeTree = function (data) {
    var source = [];
    var items = [];
    // build hierarchical source.
    for (i = 0; i < data.length; i++) {
        var item = data[i];
        var label = item["text"];
        var parentid = item["parentid"];
        var id = item["id"];

        if (items[parentid]) {
            var item = { parentid: parentid, label: label, item: item };
            if (!items[parentid].items) {
                items[parentid].items = [];
            }
            items[parentid].items[items[parentid].items.length] = item;
            items[id] = item;
        }
        else {
            items[id] = { parentid: parentid, label: label, item: item };
            source[id] = items[id];
        }
    }
    return source;
}

function loadArtistModalWithObject(artist){
    
    var modal = $('#artistModal');
    modal.find('input[name="id"]').val(artist.id);
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
    modal.find('input[name="id"]').val('-1');
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
