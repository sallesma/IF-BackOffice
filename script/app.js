$( document ).ready( function() {

    $.get( "data/artistes.php", function( data ) {
        $( "#artists-table" ).html(data);
        alert( data );
    });
    
})