// ADD FILTER
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './src/fileUpload/index.php?directory=filters';
    $('#filtersFileUpload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {

               $.ajax({
                    type : "POST",
                    url : "filter",
                    data : {
                        url : file.url,

                    }
                }).done(function(msg) {
                   getFilters();
                }).fail(function(msg) {
                    alert("Echec à l'ajout d'un filtre");
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

$(document).on('click', '.filterDeleteButton', function (event) {
    if (confirm('Es-tu sûr de vouloir supprimer ce filtre photo ?\n\nC\'est définitif hein...') ) {
		var $button = $(this);
		progress($button);

        var id = $(this).parent().parent().find('input[name="filterId"]').val();

        $.ajax({
            type: "DELETE",
            url: "filter/"+id,
        }).done(function (msg) {
			remove($button);
            getFilters();
            $("#onDeleteFiltersAlert").show();
        }).fail(function (msg) {
			remove($button);
            alert("Echec à la suppression d'un filtre");
        });
    }
});

function getFilters() {
    $.get("filter", function(jsonFilters) {
		jsonFilters=JSON.parse(jsonFilters);
		filtersHtmlString = '';
		$.each(jsonFilters, function(index, filter) {
			filtersHtmlString += "<div class='col-sm-6 col-md-3'>";
			filtersHtmlString += "	<form role='form'>";
			filtersHtmlString += "		<a href='#photo-filter' class='thumbnail'>";
			filtersHtmlString += "			<img src=\"" + filter.picture + "\" alt=\"...\">";
			filtersHtmlString += "		</a>";
            filtersHtmlString += "		<button class='filterDeleteButton btn btn-default'><i class='fa fa-times'></i></button>";
            filtersHtmlString += "		<input type='hidden' name='filterId' value='" + filter.id + "'>";
			filtersHtmlString += "	</form>";
			filtersHtmlString += "</div>";
		});
		$("#photo-filters").html(filtersHtmlString);
    }).fail(function(msg) {
		alert("Echec au chargement des filtres");
	});
}
