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
    $.get("data/getPartners.php", function(data) {
        $("#partners-table").html(data);
    });
}