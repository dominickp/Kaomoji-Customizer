$(document).ready(function(){

    // Initialize Tooltips
    $('.part').tooltip({"placement":"bottom"})

    // Store the initial bigSmiley html content for later
    $('#bigSmiley').data( 'defaultBigSmiley', $('#bigSmiley').html() );

    // Click about modal
    $("#helpAboutBtn").click(function(){
        $('#helpAbout').animate({bottom: '0px'}, 600);
    });

    function selectAllText(textbox) {
        textbox.focus();
        textbox.select();
    }

    // Select button logic
    $('#clipBoard').click(function() {
        selectAllText($("#smallPreview"))
    });
});