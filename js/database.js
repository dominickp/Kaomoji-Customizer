$(document).ready(function(){

    $("#saveSmiley").click(function(){
        $("#saveDatabase").animate({bottom: '0px'}, 600);
    });

    /* attach a submit handler to the form */
    $("#submitSmiley").submit(function(event) {

        /* stop form from submitting normally */
        event.preventDefault();

        /* get some values from elements on the page: */
        var $form = $( this ),
            url = $form.attr( 'action' );

        /* Send the data using post */
        var posting = $.post( url, { smiley: $('#smileyInputHidden').val(), description: $('#description').val() } );

        /* Put the results in a div */
        posting.done(function( data ) {
            $("#saveDatabase").delay( 800 ).animate({bottom: '-1000px'}, 600).css("background-color","DarkGreen"); // Move down and change color
            $('#description').val(""); // Clear out the form value for the next submit

            // Update ticker with AJAX
            $.ajax({
                url: "recent.php?echo=true",
                cache: false
            })
            .done(function( html ) {
                $( "#ticker" ).html( html ); // Overwrite ticker data
                $("ul#ticker").liScroll(); // re-initialize
            });
        });
    });
});