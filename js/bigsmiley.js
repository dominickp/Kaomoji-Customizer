$(document).ready(function(){
    $("#leftEye").click(function() {
        alert( "Handler for .click() called." );
    });
    // This function looks for any .paired elements, then looks for any others that match the data-pairType value and changes them on hover.
    $(".paired").hover(function() {
        var pairType = $(this).attr("data-pairType");
        $('*[data-pairType="' + pairType + '"]').addClass('active');
    }, function () {
        var pairType = $(this).attr("data-pairType");
        $('*[data-pairType="' + pairType + '"]').removeClass('active');
    });
});
