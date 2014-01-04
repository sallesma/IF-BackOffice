// Add a new map item
$('#addMapItemButton').click(function() {
    $.ajax({
        type : "POST",
        url : "addMapItem",
        data : {
            label : $("#newLabel").val(),
            x : $("#newX").val(),
            y : $("#newY").val(),
            infoId : $("#newInfoId").val()
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

    var formClass = $(this).parent().parent();

    var id = formClass.find('input[name="id"]').val();
    var label = formClass.find('input[name="label"]').val();
    var x = formClass.find('input[name="x"]').val();
    var y = formClass.find('input[name="y"]').val();
    var infoId = formClass.find('input[name="infoId"]').val();

    $('#editMapItemModal').find('input[id="id"]').val(id);
    $('#editMapItemModal').find('input[id="label"]').val(label);
    $('#editMapItemModal').find('input[id="x"]').val(x);
    $('#editMapItemModal').find('input[id="y"]').val(y);
    $('#editMapItemModal').find('input[id="infoId"]').val(infoId);
});

// Modify an existing map item
$('#editMapItemButton').click(function() {
    var id = $('#editMapItemModal').find('input[id="id"]').val();
    var label =  $('#editMapItemModal').find('input[id="label"]').val();
    var x = $('#editMapItemModal').find('input[id="x"]').val();
    var y = $('#editMapItemModal').find('input[id="y"]').val();
    var infoId = $('#editMapItemModal').find('input[id="infoId"]').val();

	$.ajax({
        type : "POST",
        url : "updateMapItem",
        data : {
            id : id,
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
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var id = $(this).parent().parent().find('input[name="id"]').val();

        $.ajax({
            type: "GET",
            url: "deleteMapItem/"+id
        }).done(function (msg) {
            getMapItems();
            $("#onDeleteMapItemsAlert").show();
        }).fail(function (msg) {
            alert("Echec à la suppression du point");
        });
    }
});

function getMapItems() {
	$.get("getMapItems", function(jsonMapItemsTable) {
		jsonMapItemsTable=JSON.parse(jsonMapItemsTable);
		mapItemsHtmlString = '<tr><th>Label</th><th>X</th><th>Y</th></tr>';
		$.each(jsonMapItemsTable, function(index, mapItem) {
			mapItemsHtmlString += "<tr><form role='form'>";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"label\" value=\""+mapItem.label+"\">";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"x\" value=\""+mapItem.x+"\">";
			mapItemsHtmlString += "<input type=\"hidden\" name=\"y\" value=\""+mapItem.y+"\">";
			mapItemsHtmlString +=  "<input type=\"hidden\" name=\"id\" value=\""+mapItem.id+"\">";
			mapItemsHtmlString +=  "<input type=\"hidden\" name=\"infoId\" value=\""+mapItem.infoId+"\">";
			mapItemsHtmlString += "<td>"+mapItem.label+"</td>";
			mapItemsHtmlString += "<td>"+mapItem.x+"</td>";
			mapItemsHtmlString += "<td>"+mapItem.y+"</td>";
			mapItemsHtmlString += "<td>";
			mapItemsHtmlString += "	<button type='button' class='btn btn-primary modifyMapItemButton'>Modifier</button>";
			mapItemsHtmlString += "	<button type='button' class='mapItemDeleteButton btn btn-danger'>Supprimer !</button>";
			mapItemsHtmlString += "</form>";
			mapItemsHtmlString += "</tr>";
		});
    	$("#mapItem-table").html(mapItemsHtmlString);
	}).fail(function(msg) {
		alert("Echec au chargement des points de la carte");
	});
}