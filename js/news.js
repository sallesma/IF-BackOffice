// Add a new news
$('#addNewButton').click(function() {
    $.ajax({
        type : "POST",
        url : "addNews",
        data : {
            title : $("#newTitle").val(),
            body : $("#newBody").val()
        }
    }).done(function(msg) {
        $('#addNewModal').modal('hide');
        getNews();
    }).fail(function(msg) {
        alert("Echec à l'ajout d'une news");
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
        url : "updateNews",
        data : {
            id : id,
            title : title,
            content : content
        }
    }).done(function(msg) {
        $('#editNewsModal').modal('hide');
        getNews();
    }).fail(function(msg) {
        alert("Echec à la modification d'une news");
    });

});

$(document).on('click', '.newsDeleteButton', function (event) {
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var id = $(this).parent().parent().find('input[name="rowID"]').val();

        $.ajax({
            type: "GET",
            url: "deleteNews/"+id,
        }).done(function (msg) {
            getNews();
            $("#onDeleteNewsAlert").show();
        }).fail(function (msg) {
            alert("Echec à la suppression d'une news");
        });
    }
});

function getNews() {
    $.get("getNews", function(data) {
        $("#news-table").html(data);
    }).fail(function(msg) {
        alert("Echec au chargement des news");
    });
}