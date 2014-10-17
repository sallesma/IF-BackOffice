// Add a new partner
$('#addPartnerButton').click(function() {
    $.ajax({
        type : "POST",
        url : "partner",
        data : {
            name : $("#newName").val(),
            picture : $("#newPicture").val(),
            website : $("#newWebsite").val(),
            priority : $("#newPriority").val()
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

    var formClass = $(this).parent().parent().parent();

    var id = formClass.find('input[name="id"]').val();
    var name = formClass.find('input[name="name"]').val();
    var picture = formClass.find('input[name="picture"]').val();
    var website = formClass.find('input[name="website"]').val();
    var priority = formClass.find('input[name="priority"]').val();

    $('#editPartnerModal').find('input[id="id"]').val(id);
    $('#editPartnerModal').find('input[id="name"]').val(name);
    $('#editPartnerModal').find('#part-picture').val(picture);

    if (picture) {
        $('#editPartnerModal').find('#edit-photoPartner').html('<a href="#" class="thumbnail"><img src="'+ picture + '" alt="..."></a>');
    } else {
        $('#editPartnerModal').find('#edit-photoPartner').html("");
    }

    $('#editPartnerModal').find('input[id="website"]').val(website);
    $('#editPartnerModal').find('input[id="priority"]').val(priority);
});

// Modify an existing partner
$('#editPartnerButton').click(function() {

    var id = $('#editPartnerModal').find('input[id="id"]').val();
    var name =  $('#editPartnerModal').find('input[id="name"]').val();
    var picture = $('#editPartnerModal').find('input[id="part-picture"]').val();
    var website = $('#editPartnerModal').find('input[id="website"]').val();
    var priority = $('#editPartnerModal').find('input[id="priority"]').val();

    $.ajax({
        type : "PUT",
        url : "partner/"+id,
        data : {
            name : name,
            picture: picture,
            website : website,
            priority : priority
        }
    }).done(function(msg) {
        $('#editPartnerModal').modal('hide');
        getPartners();
    }).fail(function(msg) {
        alert("Failed to update partner");
    });

});

$(document).on('click', '.partnerDeleteButton', function (event) {
    var name = $(this).parent().parent().parent().find('input[name="name"]').val();
    if (confirm('Partenaire : ' + name + '\n\nEs-tu sûr de vouloir supprimer ce partenaire ?\n\nC\'est définitif hein...') ) {
		var $button = $(this);
		progress($button);

        var id = $(this).parent().parent().parent().find('input[name="id"]').val();

        $.ajax({
            type: "DELETE",
            url: "partner/"+id,
        }).done(function (msg) {
            getPartners();
			remove($button);
            $("#onDeletePartnersAlert").show();
        }).fail(function (msg) {
			remove($button);
            alert("Failure deleting partner");
        });
    }
});

function getPartners() {
     $.get("partner", function(jsonPartnersTable) {
		jsonPartnersTable=JSON.parse(jsonPartnersTable);
		partnerHtmlString = '';
		$.each(jsonPartnersTable, function(index, partner) {
			partnerHtmlString += "<tr><form role='form'>";
			partnerHtmlString += "<input type=\"hidden\" name=\"name\" value=\""+partner.name+"\">";
			partnerHtmlString += "<input type=\"hidden\" name=\"website\" value=\""+partner.website+"\">";
			partnerHtmlString += "<input type=\"hidden\" name=\"priority\" value=\""+partner.priority+"\">";
            partnerHtmlString += "<input type=\"hidden\" name=\"picture\" value=\""+partner.picture+"\">";
            partnerHtmlString +=  "<input type=\"hidden\" name=\"id\" value=\""+partner.id+"\">";
			partnerHtmlString += "<td>"+partner.name+"</td>";
			partnerHtmlString += "<td><img class=\"col-md-9\" src=\" "+partner.picture+" \"/></td>";
			partnerHtmlString += "<td><a href='"+partner.website+"' target=blank>"+partner.website+"</a></td>";
			partnerHtmlString += "<td>"+partner.priority+"</td>";
			partnerHtmlString += "<td>";
			partnerHtmlString += " <div class='btn-group'>";
            partnerHtmlString += "	<button class='btn btn-default modifyPartnerButton'><i class='fa fa-pencil'></i></button>";
            partnerHtmlString += "	<button class='btn btn-default partnerDeleteButton'><i class='fa fa-times'></i></button>";
			partnerHtmlString += "</td>";
			partnerHtmlString += " <div>";

            partnerHtmlString += "</form>";
	        partnerHtmlString += "</tr>";

		});
		$("#partners-table tbody").html(partnerHtmlString);
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
            $("#edit-photoPartner").html('<a href="#" class="thumbnail"><img src="'+file.url + '" alt="..."></a>');
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

