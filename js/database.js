$(document).ready(function(){

    $("#saveSmiley").click(function(){
        $("#saveDatabase").animate({bottom: '0px'}, 600);
    });

    $("#confirmSubmit").click(function(){
        $.post( "submit.php", function( data ) {
            $( ".result" ).html( data );
        });
    });

});