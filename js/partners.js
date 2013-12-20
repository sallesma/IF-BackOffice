// Add a new partner
$('#addPartnerButton').click(function() {
    $.ajax({
        type : "POST",
        url : "data/addPartner.php",
        data : {
            name : $("#newName").val(),
            website : $("#newWebsite").val()
        }
    }).done(function(msg) {
        $('#addPartnerModal').modal('hide');
        getPartners();
    }).fail(function(msg) {
        alert("Failure");
    });
});


// Open partner modal with an existing partner
$(document).on("click", ".modifyPartnerButton", function() {

    $('#editPartnerModal').modal('show');

    var formClass = $(this).parent().parent();

    var id = formClass.find('input[name="id"]').val();
    var name = formClass.find('input[name="name"]').val();
    var website = formClass.find('input[name="website"]').val();

    $('#editPartnerModal').find('input[id="id"]').val(id);
    $('#editPartnerModal').find('input[id="name"]').val(name);
    $('#editPartnerModal').find('input[id="website"]').val(website);
});

// Modify an existing partner
$('#editPartnerButton').click(function() {

    var id = $('#editPartnerModal').find('input[id="id"]').val();
    var name =  $('#editPartnerModal').find('input[id="name"]').val();
    var website = $('#editPartnerModal').find('input[id="website"]').val();

    $.ajax({
        type : "POST",
        url : "data/updatePartner.php",
        data : {
            id : id,
            name : name,
            website : website
        }
    }).done(function(msg) {
        $('#editPartnerModal').modal('hide');
        getPartners();
    }).fail(function(msg) {
        alert("Failure");
    });

});

$(document).on('click', '.partnerDeleteButton', function (event) {
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var id = $(this).parent().parent().find('input[name="id"]').val();

        $.ajax({
            type: "GET",
            url: "data/deletePartner.php?id="+id,
        }).done(function (msg) {
            getPartners();
            $("#onDeletePartnersAlert").show();
        }).fail(function (msg) {
            alert("Failure");
        });
    }
});

function getPartners() {    
     $.get("getPartners", function(jsonPartnersTable) {
		jsonPartnersTable=JSON.parse(jsonPartnersTable);
		partnerHtmlString = '';
		$.each(jsonPartnersTable, function(index, partner) {
			partnerHtmlString += "<tr><form role='form'>";
			partnerHtmlString += "<input type=\"hidden\" name=\"name\" value=\""+partner.name+"\">";
			partnerHtmlString += "<input type=\"hidden\" name=\"website\" value=\""+partner.website+"\">";
            partnerHtmlString +=  "<input type=\"hidden\" name=\"id\" value=\""+partner.id+"\">";
			partnerHtmlString += "<td>"+partner.name+"</td>";
			partnerHtmlString += "<td>"+partner.picture+"</td>";
			partnerHtmlString += "<td>"+partner.website+"</td>";
			partnerHtmlString += "<td>";
            partnerHtmlString += "	<button type='button' class='btn btn-primary modifyNewButton'>Modifier</button>";
            partnerHtmlString += "	<button type='button' class='newsDeleteButton btn btn-danger'>Supprimer !</button>";
			
            partnerHtmlString += "</form>";
	        partnerHtmlString += "</tr>";
	        partnerHtmlString += "</tr>";
			
		});
		$("#partners-table").html(partnerHtmlString);
    }).fail(function(msg) {
        alert("Echec au chargement des partenaires");

    });
}