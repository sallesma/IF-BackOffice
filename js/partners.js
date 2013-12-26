// Add a new partner
$('#addPartnerButton').click(function() {
    $.ajax({
        type : "POST",
        url : "addPartner",
        data : {
            name : $("#newName").val(),
            picture : $("#newPicture").val(),
            website : $("#newWebsite").val()
        }
    }).done(function(msg) {
        $('#addPartnerModal').modal('hide');
        getPartners();
    }).fail(function(msg) {
        alert("Failed to add partner");
    });
});


// Open partner modal with an existing partner
$(document).on("click", ".modifyPartnerButton", function() {

    $('#editPartnerModal').modal('show');

    var formClass = $(this).parent().parent();

    var id = formClass.find('input[name="id"]').val();
    var name = formClass.find('input[name="name"]').val();
    var picture = formClass.find('input[name="picture"]').val();
    var website = formClass.find('input[name="website"]').val();
    
    $('#editPartnerModal').find('input[id="id"]').val(id);
    $('#editPartnerModal').find('input[id="name"]').val(name);
    
   
    if (picture) {
        $('#editPartnerModal').find('input[id="edit-photoPartner"]').html("<img class=\"col-md-3\" src=\""+picture+" \"/>");
    }
    else {
        $('#editPartnerModal').find('input[id="edit-photoPartner"]').html("");
    }    
    
    $('#editPartnerModal').find('input[id="website"]').val(website);
});

// Modify an existing partner
$('#editPartnerButton').click(function() {

    var id = $('#editPartnerModal').find('input[id="id"]').val();
    var name =  $('#editPartnerModal').find('input[id="name"]').val();
    var picture = $('#editPartnerModal').find('input[id="part-picture"]').val();
    var website = $('#editPartnerModal').find('input[id="website"]').val();
    
    alert(picture);
    
    $.ajax({
        type : "POST",
        url : "updatePartner",
        data : {
            id : id,
            name : name,
            picture: picture,
            website : website
        }
    }).done(function(msg) {
        $('#editPartnerModal').modal('hide');
        getPartners();
    }).fail(function(msg) {
        alert("Failed to update partner");
    });

});

$(document).on('click', '.partnerDeleteButton', function (event) {
    if (confirm('Es-tu sûr de vouloir supprimer ça ? C\'est définitif hein...') ) {
        var id = $(this).parent().parent().find('input[name="id"]').val();

        $.ajax({
            type: "GET",
            url: "deletePartner/"+id,
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
		partnerHtmlString = '<tr><th>Nom</th><th>Image</th><th>Lien</th></tr>';
		$.each(jsonPartnersTable, function(index, partner) {
			partnerHtmlString += "<tr><form role='form'>";
			partnerHtmlString += "<input type=\"hidden\" name=\"name\" value=\""+partner.name+"\">";
			partnerHtmlString += "<input type=\"hidden\" name=\"website\" value=\""+partner.website+"\">";
            partnerHtmlString += "<input type=\"hidden\" name=\"picture\" value=\""+partner.picture+"\">";
            partnerHtmlString +=  "<input type=\"hidden\" name=\"id\" value=\""+partner.id+"\">";
			partnerHtmlString += "<td>"+partner.name+"</td>";
			partnerHtmlString += "<td><img class=\"col-md-3\" src=\" "+partner.picture+" \"/></td>";
			partnerHtmlString += "<td>"+partner.website+"</td>";
			partnerHtmlString += "<td>";
            partnerHtmlString += "	<button type='button' class='btn btn-primary modifyPartnerButton'>Modifier</button>";
            partnerHtmlString += "	<button type='button' class='partnerDeleteButton btn btn-danger'>Supprimer !</button>";

            partnerHtmlString += "</form>";
	        partnerHtmlString += "</tr>";
	        partnerHtmlString += "</tr>";

		});
		$("#partners-table").html(partnerHtmlString);
    }).fail(function(msg) {
        alert("Echec au chargement des partenaires");

    });
}

$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './src/fileUpload/index.php?directory=partners';
    $('#partnerFileUpload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
            $("#newPicture").val(file.url);
            $("#photoPartner").html('<a href="#" class="thumbnail"><img src="'+file.url + '" alt="..."></a></div>');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progressPartner .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = './src/fileUpload/index.php?directory=partners';
    $('#edit-partnerFileUpload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
            $("#part-picture").val(file.url);
            $("#edit-photoPartner").html('<a href="#" class="thumbnail"><img src="'+file.url + '" alt="..."></a></div>');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#edit-progressPartner .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

