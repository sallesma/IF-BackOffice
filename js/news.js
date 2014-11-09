// Add a new news
$('#addNewButton').click(function() {
    $.ajax({
        type : "POST",
        url : "news",
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
    var formClass = $(this).parent().parent().parent();

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
        type : "PUT",
        url : "news/"+id,
        data : {
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
    var name = $(this).parent().parent().parent().find('input[name="title"]').val();
    var content = $(this).parent().parent().parent().find('input[name="content"]').val();
    if (confirm('Titre : ' + name + '\nContenu : ' + content.substring(0, 20) + '\n\nEs-tu sûr de vouloir supprimer cette news ?\n\n C\'est définitif hein...') ) {
		var $button = $(this);
		progress($button);

        var id = $(this).parent().parent().parent().find('input[name="rowID"]').val();

        $.ajax({
            type: "DELETE",
            url: "news/"+id,
        }).done(function (msg) {
			remove($button);
            getNews();
            $("#onDeleteNewsAlert").show();
        }).fail(function (msg) {
			remove($button);
            alert("Echec à la suppression d'une news");
        });
    }
});

function getNews() {
    $.get("news", function(jsonNewsTable) {
		jsonNewsTable=JSON.parse(jsonNewsTable);
		newsHtmlString = '';
		$.each(jsonNewsTable, function(index, news) {
			newsHtmlString += "<tr><form role='form'>";
			newsHtmlString += "<input type='hidden' name='title' value='"+news.title.replace("'", "&apos;")+"'>";
			newsHtmlString += "<input type='hidden' name='content' value='"+news.content.replace("'", "&apos;")+"'>";
			newsHtmlString += "<td id='title'>"+news.title+"</td>";
			newsHtmlString += "<td id='content'>"+news.content+"</td>";
			newsHtmlString += "<td>"+news.date+"</td>";
			newsHtmlString += "<td>";
            newsHtmlString += " <div class='btn-group'>";
            newsHtmlString += " <button data-toggle='modal' href='#editNewsModal' class='btn btn-default modifyNewButton'><i class='fa fa-pencil'></i></button>";
            newsHtmlString += " <button class='btn btn-default newsDeleteButton'><i class='fa fa-times'></i></button>";
			newsHtmlString += " </div>";
			newsHtmlString += "</td>";
			newsHtmlString += "<input type='hidden' name='rowID' value='"+news.id+"'>";
			newsHtmlString += "</form></tr>";
		});
		$("#news-table tbody").html(newsHtmlString);
    }).fail(function(msg) {
        alert("Echec au chargement des news");
    });
}
