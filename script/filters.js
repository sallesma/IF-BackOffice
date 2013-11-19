// ADD FILTER
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './data/fileUpload/index.php?directory=filters';
    $('#filtersFileUpload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {

               $.ajax({
                    type : "POST",
                    url : "data/addFilter.php",
                    data : {
                        url : file.url,

                    }
                }).done(function(msg) {
                   getFilters()
                }).fail(function(msg) {
                    alert("Failure");
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
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var id = $(this).parent().parent().find('input[name="filterId"]').val();

        $.ajax({
            type: "GET",
            url: "data/deleteFilter.php?id="+id,
        }).done(function (msg) {
            getFilters();
            $("#onDeleteFiltersAlert").show();
        }).fail(function (msg) {
            alert("Failure");
        });
    }
});

function getFilters() {
    $.get("data/getFilters.php", function(data) {
        $("#photoFilter-edit").html(data);
    }).fail(function(msg) {
		alert("Failure");
	});
}