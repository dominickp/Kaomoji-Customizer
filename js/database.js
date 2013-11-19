$(document).ready(function(){

    $("#saveSmiley").click(function(){
        $("#saveDatabase").animate({bottom: '0px'}, 600);
    });

    /* attach a submit handler to the form */
    $("#submitSmiley").submit(function(event) {
    console.log("submit");
        /* stop form from submitting normally */
        event.preventDefault();

        /* get some values from elements on the page: */
        var $form = $( this ),
            url = $form.attr( 'action' );

        /* Send the data using post */
        var posting = $.post( url, { smiley: $('#smileyInputHidden').val(), description: $('#description').val() } );

        /* Put the results in a div */
        posting.done(function( data ) {
            alert('success');
            $("#bigSmiley").html(data);
        });
    });

});