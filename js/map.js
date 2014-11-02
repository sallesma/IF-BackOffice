//Clicks on addmodal map determine mapItem coordinates
$(document).on("click", "#add-map", function(e) {
    if(typeof e.offsetX === "undefined" || typeof e.offsetY === "undefined") {
        var targetOffset = $(e.target).offset();
        e.offsetX = e.pageX - targetOffset.left;
        e.offsetY = e.pageY - targetOffset.top;
    }
	x_100 = ( e.offsetX * 100 ) / e.target.width;
	y_100 = ( e.offsetY * 100 ) / e.target.height;
	$('#addMapItemModal').find('input[id="newX"]').val(x_100);
	$('#addMapItemModal').find('input[id="newY"]').val(y_100);
});

//Initializes the infoId selector in addModal
var infoIdSelect = $('#addMapItemModal').find('#addMapItem-linked-info');
infoIdSelect.html('');
infoIdSelect.append('<option value="-1"> Aucune info </option>');
$.get("info", function(jsonInfosTable) {
	jsonInfosTable=JSON.parse(jsonInfosTable);
	$.each(jsonInfosTable, function (key, it) {
			infoIdSelect.append('<option value="' + it.id + '">' + it.name + '</option>');
	});
});

// Add a new map item
$('#addMapItemButton').click(function() {
    $.ajax({
        type : "POST",
        url : "mapItem",
        data : {
            label : $("#newLabel").val(),
            x : $("#newX").val(),
            y : $("#newY").val(),
            infoId : $('#addMapItemModal').find('#addMapItem-linked-info').val()
        }
    }).done(function(msg) {
        $('#addMapItemModal').modal('hide');
        getMapItems();
    }).fail(function(msg) {
        alert("Echec à l'ajout d'un point");
    });
});


// Open map item modal with an existing map item
$(document).on("click", ".modifyMapItemButton", function() {

    $('#editMapItemModal').modal('show');

    var formClass = $(this).parent().parent().parent();

    var id = formClass.find('input[name="id"]').val();
    var label = formClass.find('input[name="label"]').val();
    var x = formClass.find('input[name="x"]').val();
    var y = formClass.find('input[name="y"]').val();
    var infoId = formClass.find('input[name="infoId"]').val();

    $('#editMapItemModal').find('input[id="id"]').val(id);
    $('#editMapItemModal').find('input[id="label"]').val(label);
    $('#editMapItemModal').find('input[id="x"]').val(x);
    $('#editMapItemModal').find('input[id="y"]').val(y);

	$(document).on("click", "#edit-map", function(e) {
	    if(typeof e.offsetX === "undefined" || typeof e.offsetY === "undefined") {
            var targetOffset = $(e.target).offset();
            e.offsetX = e.pageX - targetOffset.left;
            e.offsetY = e.pageY - targetOffset.top;
        }
		x_100 = ( e.offsetX * 100 ) / e.target.width;
		y_100 = ( e.offsetY * 100 ) / e.target.height;
		$('#editMapItemModal').find('input[id="x"]').val(x_100);
		$('#editMapItemModal').find('input[id="y"]').val(y_100);
	});

	var infoIdSelect = $('#editMapItemModal').find('#mapItem-linked-info');


	infoIdSelect.html('');
	infoIdSelect.append('<option value="-1"> Aucune info </option>');
	$.get("info", function(jsonInfosTable) {
		jsonInfosTable=JSON.parse(jsonInfosTable);
		$.each(jsonInfosTable, function (key, it) {
            if(it.id == infoId)
				infoIdSelect.append('<option value="' + it.id + '" selected>' + it.name + '</option>');
            else
                infoIdSelect.append('<option value="' + it.id + '">' + it.name + '</option>');
		});
	});
});

// Modify an existing map item
$('#editMapItemButton').click(function() {
    var id = $('#editMapItemModal').find('input[id="id"]').val();
    var label =  $('#editMapItemModal').find('input[id="label"]').val();
    var x = $('#editMapItemModal').find('input[id="x"]').val();
    var y = $('#editMapItemModal').find('input[id="y"]').val();
    var infoId = $('#editMapItemModal').find('#mapItem-linked-info').val();

	$.ajax({
        type : "PUT",
        url : "mapItem/"+id,
        data : {
            label : label,
            x : x,
            y : y,
            infoId : infoId
        }
    }).done(function(msg) {
        $('#editMapItemModal').modal('hide');
        getMapItems();
    }).fail(function(msg) {
        alert("Echec à la mise à jour du point");
    });
});

$(document).on('click', '.mapItemDeleteButton', function (event) {
    var name = $(this).parent().parent().parent().find('input[name="label"]').val();
    if (confirm('Point : ' + name + '\n\nEs-tu sûr de vouloir supprimer ce point ?\n\nC\'est définitif hein...') ) {
		var $button = $(this);
		progress($button);

        var id = $(this).parent().parent().parent().find('input[name="id"]').val();

        $.ajax({
            type: "DELETE",
            url: "mapItem/"+id
        }).done(function (msg) {
            getMapItems();
			remove($button);
            $("#onDeleteMapItemsAlert").show();
        }).fail(function (msg) {
			remove($button);
            alert("Echec à la suppression du point");
        });
    }
});

function getMapItems() {
	$.get("mapItem", function(jsonMapItemsTable) {
		jsonMapItemsTable=JSON.parse(jsonMapItemsTable);
		mapItemsHtmlString = '';
		$.each(jsonMapItemsTable, function(index, mapItem) {
			mapItemsHtmlString += "<tr><form role='form'>";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"label\" value=\""+mapItem.label+"\">";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"x\" value=\""+mapItem.x+"\">";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"y\" value=\""+mapItem.y+"\">";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"id\" value=\""+mapItem.id+"\">";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"infoId\" value=\""+mapItem.infoId+"\">";
			mapItemsHtmlString += "<td>"+mapItem.label+"</td>";
			mapItemsHtmlString += "<td>"+mapItem.x+"</td>";
			mapItemsHtmlString += "<td>"+mapItem.y+"</td>";
            mapItemsHtmlString +="<td>";

            var infoName = "";
            if (mapItem.infoId != -1) {
                $.ajax({
                    url: 'info/'+mapItem.infoId,
                    async: false,
                    dataType: 'json',
                    success: function (json) {
                        infoName = json.name;
                    }
                });
            }
            else {
            //No info
                infoName = "<i>Aucune info liée</i>"
            }

            mapItemsHtmlString += infoName;
            mapItemsHtmlString += "</td>";
			mapItemsHtmlString += "<td>";
			mapItemsHtmlString += " <div class='btn-group'>";
			mapItemsHtmlString += "	<button class='btn btn-default modifyMapItemButton'><i class='fa fa-pencil'></i></button>";
			mapItemsHtmlString += "	<button class='btn btn-default mapItemDeleteButton'><i class='fa fa-times'></i></button>";
			mapItemsHtmlString += " </div>";
			mapItemsHtmlString += "</td>";
			mapItemsHtmlString += "</form>";
			mapItemsHtmlString += "</tr>";
		});
    	$("#mapItem-table tbody").html(mapItemsHtmlString);
	}).fail(function(msg) {
		alert("Echec au chargement des points de la carte");
	});
}
