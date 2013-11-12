$(document).ready(function(){

    // Store the initial bigSmiley html content for later
    $('#bigSmiley').data( 'defaultBigSmiley', $('#bigSmiley').html() );

    // Function for resizing the smiley based on length
    var fontScale = function() {
        var currentSmiley = $('#bigSmiley').children().text();
        var length = currentSmiley.length
        var size = 90 - length + 'px';
        console.log(size);
        $("#bigSmiley > .part").css('font-size',size);
    }

    // Function for returning the current smiley as text
    var getSmiley = function() {
        var currentSmiley = $('#bigSmiley').children().text();;
        return currentSmiley;
    }

    // Do this every time the Smiley changes
    var smileyUpdate = function() {
        fontScale(); // Scale the font
        $("title").text(getSmiley()); // Update the html title
    }


    var defaultOption = '<h3>Default Option</h3>Text'; // Set the default options html in a variable
    $('#options').html(defaultOption); // replace on page before start

    // This function allows you to click off of the smiley to clear the selection
    $("#bigSmiley").click(function(){
        $(".part").removeClass('hold');
        $('#options').html(defaultOption);
    }).children().click(function(e) {
        return false;
    });

    // When you click on a .part, display some options
    $(".part").click(function() {
        var optionsBox = $( "div#options" );
        var pairType = $(this).attr("data-pairType"); // Get data-pairtype

        $(".part").removeClass('hold');
        $('*[data-pairType="' + pairType + '"]').addClass('hold');


        var partsList = $(document.createElement('ul')).addClass('partPicker').addClass(pairType);

        // Determine which parts array I should access
        var partsArray;
        if(pairType == 'eye'){
            partsArray = eye_parts;
            partsTitle = 'Eye';
        } else if(pairType == 'mouth'){
            partsArray = mouth_parts;
            partsTitle = 'Mouth';
        } else if(pairType == 'bracket'){
            partsArray = bracket_parts;
            partsTitle = 'Bracket';
        } else if(pairType == 'leftFlair'){
            partsArray = leftFlair_parts;
            partsTitle = 'Left Flair';
        } else if(pairType == 'rightFlair'){
            partsArray = rightFlair_parts;
            partsTitle = 'Right Flair';
        }

        // Put those parts into the options div
        $(partsArray).each(function (key, value) {
            var li = $(document.createElement('li')).attr("data-pairType", pairType);
            // Treat arrays a little differently
            if (value instanceof Array) {
                $(value).each(function(key,ind){
                    li.addClass('pair');
                    li.append('<span class="individual">' + ind + '</span>');
                });
            } else {
                li.html(value);
            }

            partsList.append(li);
        }).promise().done(function () {
            $('#options').html(partsList);
            $('#options').prepend('<h3>'+partsTitle+' parts</h3>');
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

    // Update bigSmiley logic
    $(document).on( "click", 'ul.partPicker > li', function() {
        selectedType = $(this).attr("data-pairType"); // Get the part's type
        // Update on the big smiley
        if ($(this).hasClass('pair')){
            var counter = 0;
            $(this).children().each(function(key, value){
                counter++; // Incriment to tell difference between left and right
                selectedPart = $(value).text(); // Get the part
                // Left part operation
                if(counter == 1){
                    $('#bigSmiley *[data-pairType="' + selectedType + '"].left').text(selectedPart);
                } else if(counter == 2){
                    $('#bigSmiley *[data-pairType="' + selectedType + '"].right').text(selectedPart);
                }
            });
        } else {
            selectedPart = $(this).text(); // Get the part
            $('#bigSmiley *[data-pairType="' + selectedType + '"]').text(selectedPart);
        }
        smileyUpdate(); // Run smiley update function
    });

    // Turn right and left logic
    $("#turnLeft").click(function(){
        $("#leftSpacer").remove(); // Check to see if that spacer is already there, if so, don't add another one.
        $("#leftBracket").after("<span id='leftSpacer' class='part spacer'>&nbsp;</span>"); // Add the new spacer
        $("#rightSpacer").remove(); // Remove the old one
        smileyUpdate(); // Run smiley update function
    });
    $("#turnRight").click(function(){
        $("#rightSpacer").remove(); // Check to see if that spacer is already there, if so, don't add another one.
        $("#rightBracket").before("<span id='rightSpacer' class='part spacer'>&nbsp;</span>"); // Add the new spacer
        $("#leftSpacer").remove(); // Remove the old one
        smileyUpdate(); // Run smiley update function
    });

    // Center
    $("#center").click(function(){
        // Check to see if that spacer is already there, if so, don't add another one.
        if($('#rightSpacer').length == 0){
            $("#rightBracket").before("<span id='rightSpacer' class='part spacer'>&nbsp;</span>");
        }
        if($('#leftSpacer').length == 0){
            $("#leftBracket").after("<span id='leftSpacer' class='part spacer'>&nbsp;</span>");
        }
        smileyUpdate(); // Run smiley update function
    });

    // Reset button
    $("#reset").click(function(){
        location.reload(); // Reset the DOM
    });


});
