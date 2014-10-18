$(document).ready(function() {
	getYears();
	getNews();
	getArtists();
	getFilters();
	getInfos();
	getPartners();
	getMapItems();
});

$('#year-select').change(function () {
    var selectedYear = $('#year-select option:selected').text();
    
    updateYear(selectedYear).done(manageReadOnly(selectedYear));
});

function updateYear(selectedYear) {
    $.ajax({
        type : "PUT",
        url : "year",
        data : {
            year : selectedYear
        }
    }).done(function(msg) {
        getNews();
	    getArtists();
	    getFilters();
	    getInfos();
	    getPartners();
	    getMapItems();
    }).fail(function(msg) {
        alert("Le serveur n'a pas pu mettre à jour le backoffice en fonction de l'année");
    });
    return $.Deferred().resolve();
}

function manageReadOnly(selectedYear) {
    var currentYear = new Date().getFullYear();
    var affectedElements = '.newsDeleteButton, .modifyNewButton, #addNewsTriggerModal, .artistDeleteButton, #artistModalActionButton, #showArtistModalToAdd, .fileinput-button, .filterDeleteButton, #showInfoModalToAdd, #infosEditButton, #infosDeleteButton, .modifyMapItemButton, .mapItemDeleteButton, #addMapItemTriggerModal, .modifyPartnerButton, .partnerDeleteButton, #addPartnersTriggerModal';
    if (selectedYear == currentYear) {
        $('#year-message').html('');
        enable($(affectedElements));
    }
    else {
        $('#year-message').html('<i class="fa fa-warning"></i> Le backoffice est en lecture seule car l\'année sélectionnée n\'est pas celle de la prochaine édition du festival');
        disable($(affectedElements));
    }
}

function getYears() {
    $.get("year", function(jsonYears) {
        var years = JSON.parse(jsonYears);
        var yearSelect = $('select#year-select');
        
        yearSelect.html('');
        $.each(years, function (index, year) {
            yearSelect.append('<option value="' + year + '">' + year + '</option>');
        });
        
        var currentYear = new Date().getFullYear();
        $('#current-year').html(currentYear);
        if (yearSelect.find('select[value='+currentYear+']') === "undefined")
            infoSelect.append('<option value="' + currentYear + '">' + currentYear + '</option>');
            
        yearSelect.val(currentYear);
    });
}
