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
$(document).on("click", ".modifyNewButton", function() {
    
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

$(document).on('click', '.newsDeleteButton', function (event) {
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var id = $(this).parent().parent().find('input[name="rowID"]').val();
        
        $.ajax({
            type: "GET",
            url: "data/deleteNews.php?id="+id,
        }).done(function (msg) {
            getNews();
            $("#onDeleteNewsAlert").show();
        }).fail(function (msg) {
            alert("Failure");
        });
    }
});

function getNews() {
    $.get("data/getNews.php", function(data) {
        $("#news-table").html(data);
    });
}

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

$(document).on('click', '.artistDeleteButton', function (event) {
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var target = $(event.currentTarget);
        var id = target.parent().find('input[name="id"]');
        
        $.ajax({
            type: "GET",
            url: "data/deleteArtist.php?id="+id.val(),
        }).done(function (msg) {
            getArtists();
            $("#onDeleteArtistAlert").show();
        }).fail(function (msg) {
            alert("Failure");
        });
    }
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
                style: modal.find('#art-style').val(),
                description: modal.find('#art-description').val(),
                day: modal.find('#art-day').val(),
                stage: modal.find('#art-scene').val(),
                start_time: modal.find('#art-start-time').val(),
                end_time: modal.find('#art-end-time').val(),
                website: modal.find('#art-website').val(),
                facebook: modal.find('#art-facebook').val(),
                twitter: modal.find('#art-twitter').val(),
                youtube: modal.find('#art-youtube').val()
            }
        }).done(function(msg) {
            $('#artistModal').modal('hide');
            getArtists();
        }).fail(function(msg) {
            alert("Failure");
        });
    }
    
});


function getArtists() {
    $.get("data/getArtists.php", function(data) {
        $("#artists-table").html(data);
    });
}


function loadArtistModalWithObject(artist){
    var modal = $('#artistModal');
    modal.find('input[name="id"]').val(artist.id);
    modal.find('#title').html('Modifier un artiste');
    modal.find('#artistModalActionButton').html('Sauvegarder');
    modal.find('#art-name').val(artist.name);
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
    modal.find('#artistModalActionButton').html('Ajouter');
    modal.find('#art-name').val('');
    modal.find('#art-style').val('');
    modal.find('#art-description').val('');
    modal.find('#art-website').val('');
    modal.find('#art-facebook').val('');
    modal.find('#art-twitter').val('');
    modal.find('#art-youtube').val('');
}

/*-----------*/
/*- INFOS -*/
/*-----------*/
function getInfos() {
    $.getJSON("data/getInfos.php", function(data) {
        $('#infos-tree').jqxTree({ source:computeTree(data)});
        $('#infos-tree').jqxTree('refresh');
        
        // On click on an item get the item from database
        $('#infos-tree').bind('select', function (event) {
            var htmlElement = event.args.element;
            var item = $('#infos-tree').jqxTree('getItem', htmlElement);
            $.getJSON("data/getInfo.php?id="+item.id).done(function (msg) {
                var infoForm = $('#infos-edit');
                infoForm.find('#info-id').val(msg.id);
                
                //name
                infoForm.find('#info-name').val(msg.name);
                
                //picture
                infoForm.find('#info-picture').attr("data-src", msg.picture);
                
                //isCategory
                $('input[type=radio][name=isCategoryRadio]').change(function() {
                    if ( $('input[type=radio][name=isCategoryRadio]:checked').attr('value') == "1") { //if category
                        $('#InfoContent').hide();
                    } else {
                        $('#InfoContent').show();
                    }
                });
                if (msg.isCategory == "1") {
                    infoForm.find("#category").click();
                } else {
                    infoForm.find("#info").click();
                }
                
                //content
                infoForm.find('#info-content').val(msg.content);
                
                //parent
                var infoSelect = infoForm.find('#info-parent');
                infoSelect.html('');
                infoSelect.append('<option value="0"> Aucun parent </option>');
                var items = $('#infos-tree').jqxTree('getItems');
                $.each(items, function (key, it) {
                    if (it.id != msg.id && it.value == "1") { //if category and not itself
                        infoSelect.append('<option value="' + it.id + '">' + it.label + '</option>');
                    }
                });
                
                infoSelect.val(msg.parentid);
                
                $('#infosDeleteButton').show();
            }).fail(function(msg) {
                alert("Failure");
            });
        });
    });
}

$('#infosEditButton').click(function() {
    var infoForm = $('#infos-edit');
    
    $.ajax({
        type : "POST",
        url : "data/updateInfo.php",
        data : {
            id : infoForm.find('#info-id').val(),
            name : infoForm.find('#info-name').val(),
            isCategory : $('input[type=radio][name=isCategoryRadio]:checked').attr('value'),
            content : infoForm.find('#info-content').val(),
            picture : infoForm.find('#info-picture').attr("data-src"),
            parentId : infoForm.find('#info-parent').val()
        }
    }).done(function(msg) {
        getInfos();
    }).fail(function(msg) {
        alert("Failure");
    });
});

$('#infosDeleteButton').click(function() {
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var id = $('#infos-edit').find('#info-id').val();
        
        $.ajax({
            type : "POST",
            url : "data/deleteInfo.php",
            data : {
                id : $('#infos-edit').find('#info-id').val()
            }
        }).done(function(msg) {
            getInfos();
            $("#onDeleteInfoAlert").show();
            $('#infosDeleteButton').hide();
        }).fail(function(msg) {
            alert("Failure");
        });
    }
});

// Add a new info
$('#addInfoButton').click(function() {
    $.ajax({
        type : "POST",
        url : "data/addInfo.php",
        data : {
            name : $("#add-info-name").val(),
            isCategory : $('input[type=radio][name=isAddCategoryRadio]:checked').attr('value'),
            content : $("#add-info-content").val(),
            picture : $("#add-info-picture").val(),
            parent : $("#add-info-parent").val()
        }
    }).done(function(msg) {
        $('#addInfoModal').modal('hide');
        getInfos();
    }).fail(function(msg) {
        alert("Failure");
    });
});

// Show the info modal to add a new one
$('#showInfoModalToAdd').click(function() {
    $('input[type=radio][name=isAddCategoryRadio]').change(function() {
        if ( $('input[type=radio][name=isAddCategoryRadio]:checked').attr('value') == "1") { //if category
            $('#add-info-content').hide();
        } else {
            $('#add-info-content').show();
        }
    });
    var infoSelect = $('#addInfoModal').find('#add-info-parent');
    infoSelect.html('');
    infoSelect.append('<option value="0"> Aucun parent </option>');
    var items = $('#infos-tree').jqxTree('getItems');
    $.each(items, function (key, it) {
        if (it.value == "1") { //if category
            infoSelect.append('<option value="' + it.id + '">' + it.label + '</option>');
        }
    });
    infoSelect.val("0");
});

var computeTree = function (data) {
    var source = [];
    var items = [];
    // build hierarchical source.
    for (i = 0; i < data.length; i++) {
        var item = data[i];
        var label = item["name"];
        var parentid = item["parentId"];
        var isCategory = item["isCategory"];
        var id = item["id"];
        
        if (items[parentid]) {
            var item = { parentid: parentid, label: label, item: item, id:id, value:isCategory};
            if (!items[parentid].items) {
                items[parentid].items = [];
            }
            items[parentid].items[items[parentid].items.length] = item;
            items[id] = item;
        }
        else {
            items[id] = { parentid: parentid, label: label, item: item, id:id, value:isCategory};
            source[id] = items[id];
        }
    }
    return source;
}

// ADD FILTER
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './data/fileUpload/';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                
               $.ajax({
                    type : "POST",
                    url : "data/addFilter.php",
                    data : {
                        url : file.url
                    }
                }).done(function(msg) {
                   //$('<p/>').text(file.url).appendTo('#files');
                   
                   $("#photoFilter-edit").append('<div class="col-sm-6 col-md-3"><a href="#" class="thumbnail"> <img src="'+file.url + '" alt="..."></a></div>');
                }).fail(function(msg) {
                    alert("msg : " + msg);
                    alert("Failure :/:");
                });
                
            
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');
});