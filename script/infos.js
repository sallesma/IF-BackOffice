function getInfos() {
    $.getJSON("data/getInfos.php", function(data) {
        $('#infos-tree').jqxTree({ source:computeTree(data)});
        $('#infos-tree').jqxTree('refresh');

        // On click on an item get the item from database
        $('#infos-tree').bind('select', function (event) {
            var htmlElement = event.args.element;
            var item = $('#infos-tree').jqxTree('getItem', htmlElement);
            $.getJSON("data/getInfo.php?id="+item.id).done(function (msg) {
                var infoForm = $('#infos-edit-form');
				$('#infos-form').show();
				$('#infos-edit-text').hide();

                infoForm.find('#info-id').val(msg.id);

                //name
                infoForm.find('#info-name').val(msg.name);

                //picture
                if (msg.picture != "") {
                    $('#edit-infoFileButtonName').html('Modifier l\'icône');
                    infoForm.find('#edit-photoInfo').html('<a href="#" class="thumbnail"><img src="'+msg.picture + '" alt="..."></a></div>');
                }

                else {
                    $('#edit-infoFileButtonName').html('Séléctionner un fichier');
                    infoForm.find('#edit-photoInfo').html('<i>Pas d\'icône actuellement</i>');
                }

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
    var infoForm = $('#infos-edit-form');
    $.ajax({
        type : "POST",
        url : "data/updateInfo.php",
        data : {
            id : infoForm.find('#info-id').val(),
            name : infoForm.find('#info-name').val(),
            isCategory : $('input[type=radio][name=isCategoryRadio]:checked').attr('value'),
            content : infoForm.find('#info-content').val(),
            picture : infoForm.find('#edit-info-image').val(),
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
        var id = $('#infos-edit-form').find('#info-id').val();

        $.ajax({
            type : "POST",
            url : "data/deleteInfo.php",
            data : {
                id : $('#infos-edit-form').find('#info-id').val()
            }
        }).done(function(msg) {
            getInfos();
            $("#onDeleteInfoAlert").show();
            $('#infos-form').hide();
			$('#infos-edit-text').show();
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
            picture : $("#add-info-image").val(),
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
    $("#add-photoInfo").html("");
    $("#add-info-image").val("");
    $('#add-progressInfo .progress-bar').css(
                'width',
                '0%'
            );
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


// Infos file Upload
//ADD
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './data/fileUpload/index.php?directory=infos';
    $('#add-infoFileUpload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
            $("#add-info-image").val(file.url);
            $("#add-photoInfo").html('<a href="#" class="thumbnail"><img src="'+file.url + '" alt="..."></a></div>');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#add-progressInfo .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

//EDIT
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './data/fileUpload/index.php?directory=infos';
    $('#edit-infoFileUpload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $("#edit-info-image").val(file.url);
                $("#edit-photoInfo").html('<a href="#" class="thumbnail"><img src="'+file.url + '" alt="..."></a></div>');
            });
            $('#edit-infoFileButtonName').html('Modifier l\'icône');
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#edit-progressInfo .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');
});
