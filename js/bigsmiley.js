$(document).ready(function(){

    // When you click on a .part, display some options
    $(".part").click(function() {
        var optionsBox = $( "div#options" );
        var pairType = $(this).attr("data-pairType");

        var eyePartsList = $(document.createElement('ul'));
        var eyeParts = ['A', 'B', 'C', 'D'];

        $(mouth_parts).each(function (key, value) {
            var li = $(document.createElement('li'));
            li.text(value);
            eyePartsList.append(li);
        }).promise().done(function () {
            $('#options').append(eyePartsList);
        });


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
