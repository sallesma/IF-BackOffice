// Add a new partner
$('#addPartnerButton').click(function() {
    $.ajax({
        type : "POST",
        url : "data/addPartner.php",
        data : {
            name : $("#newName").val(),
            weblink : $("#newWebLink").val()
        }
    }).done(function(msg) {
        $('#addPartnerModal').modal('hide');
        getPartners();
    }).fail(function(msg) {
        alert("Failure");
    });
});


// Open News modal with an existing partner
$(document).on("click", ".modifyPartnerButton", function() {

    $('#editPartnerModal').modal('show');

    var formClass = $(this).parent().parent();

    var id = formClass.find('input[name="rowID"]').val();
    var name = formClass.find('input[name="name"]').val();
    var weblink = formClass.find('input[name="webLink"]').val();

    $('#editNewsModal').find('input[id="rowID"]').val(id);
    $('#editNewsModal').find('input[id="newName"]').val(name);
    $('#editNewsModal').find('textarea[id="newWebLink"]').val(weblink);
});

// Modify an existing news
$('#editPartnerButton').click(function() {

    var id = $('#editPartnerModal').find('input[id="rowID"]').val();
    var name =  $('#editPartnerModal').find('input[id="newName"]').val();
    var weblink = $('#editPartnerModal').find('textarea[id="newWebLink"]').val();

    $.ajax({
        type : "POST",
        url : "data/updatePartner.php",
        data : {
            id : id,
            name : name,
            weblink : weblink
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