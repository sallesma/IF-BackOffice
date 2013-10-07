$( document ).ready( function() {
	$.get( "data/getNews.php", function( data ) {
        $( "#news-table" ).html(data);
    });
	
    $.get( "data/getArtists.php", function( data ) {
        $( "#artists-table" ).html(data);
    });
    
    $.get( "data/getInfosCategories.php", function( data ) {
        $( "#infoCategory-table" ).html(data);
    });
    
    $.get( "data/getInfos.php", function( data ) {
        $( "#infos-table" ).html(data);
    });
    
})