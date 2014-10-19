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
        $('#year-message').hide();
        enable($(affectedElements));
        $('div#main-content').css('cursor', 'default');
        $('div#main-content').off('click');
    }
    else {
        $('#year-message').show();
        disable($(affectedElements));
        $('div#main-content').css('cursor', 'not-allowed');
        $('div#main-content').on('click', function( event ) {
            disable($(affectedElements));
            event.preventDefault();
            event.stopImmediatePropagation();
            $('#year-message').fadeOut( "50" ).fadeIn("50");
        });
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
