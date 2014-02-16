// Add a new news
$('#addNewButton').click(function() {
    $.ajax({
        type : "POST",
        url : "addNews",
        data : {
            title : $("#newTitle").val(),
            content : $("#newContent").val()
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
    $('#editNewsModal').find('textarea[id="newContent"]').val(content);
});

// Modify an existing news
$('#editNewButton').click(function() {

    var id = $('#editNewsModal').find('input[id="rowID"]').val();
    var title =  $('#editNewsModal').find('input[id="newTitle"]').val();
    var content = $('#editNewsModal').find('textarea[id="newContent"]').val();

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
    $.get("getNews", function(jsonNewsTable) {
		jsonNewsTable=JSON.parse(jsonNewsTable);
		newsHtmlString = '<tr><th>Nom</th><th>Description</th><th>Date</th></tr>';
		$.each(jsonNewsTable, function(index, news) {
			newsHtmlString += "<tr><form role='form'>";
			newsHtmlString += "<input type='hidden' name='title' value='"+news.title.replace("'", "&apos;")+"'>";
			newsHtmlString += "<input type='hidden' name='content' value='"+news.content.replace("'", "&apos;")+"'>";
			newsHtmlString += "<td id='title'>"+news.title+"</td>";
			newsHtmlString += "<td id='content'>"+news.content+"</td>";
			newsHtmlString += "<td>"+news.date+"</td>";
			newsHtmlString += "<td>";
            newsHtmlString += "	<button type='button' class='btn btn-primary modifyNewButton'>Modifier</button>";
            newsHtmlString += "	<button type='button' class='newsDeleteButton btn btn-danger'>Supprimer !</button>";
			newsHtmlString += "</td>";
			newsHtmlString += "<input type='hidden' name='rowID' value='"+news.id+"'>";
			newsHtmlString += "</form></tr>";
		});
		$("#news-table").html(newsHtmlString);
    }).fail(function(msg) {
        alert("Echec au chargement des news");
    });
}