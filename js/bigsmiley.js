$(document).ready(function(){

    // Initialize Tooltips
    $('.part').tooltip({"placement":"bottom"})

    // Store the initial bigSmiley html content for later
    $('#bigSmiley').data( 'defaultBigSmiley', $('#bigSmiley').html() );

    // Function for resizing the smiley based on length
    var fontScale = function() {
        var currentSmiley = $('#bigSmiley').children().text();
        var length = currentSmiley.length
        var scaleFactor = 2;
        var size = 120 - ( length * scaleFactor ) + 'px';
        console.log(size); // Log for debugging until I get this working nicely
        $("#bigSmiley > .part").css('font-size',size);
    }

    fontScale(); // Scale the font on page load

    // Function for returning the current smiley as text
    var getSmiley = function() {
        var currentSmiley = $('#bigSmiley').children().text();;
        return currentSmiley;
    }

    var setHoverAction = function() {
        // This function looks for any .paired elements, then looks for any others that match the data-pairType value and changes them on hover.
        $(".paired").hover(function() {
            var pairType = $(this).attr("data-pairType");
            $('*[data-pairType="' + pairType + '"]').addClass('active');
        }, function () {
            var pairType = $(this).attr("data-pairType");
            $('*[data-pairType="' + pairType + '"]').removeClass('active');
        });
    }

    setHoverAction(); // Initialize hover action

    // Do this every time the Smiley changes
    var smileyUpdate = function() {
        fontScale(); // Scale the font
        $("title").text(getSmiley()); // Update the html title
        $('.part').tooltip({"placement":"bottom"}); // Reinitialize when the smiley is updated. Due to adding/removing cheecks

        // Initialize ZeroClipboard
        $("a#clipBoard").zclip({
            path:'js/ZeroClipboard.swf',
            copy:getSmiley(),
            beforeCopy:function(){
                $('#bigSmiley').css('color','red');
            },
            afterCopy:function(){
                $('#bigSmiley').css('color','#333');
                $(this).next('.check').show();
            }
        });
        setHoverAction(); // Reinitialize hover action
    }

    // Declare this variable which will be used to hang on to the cheeck when flipping left to right. Set as inital left cheeck for default.
    var cheeckMemory = $("#rightCheeck").text();

    // Set the default options html in a variable
    var defaultOption = '<h3>Default Option</h3>Text';

    $('#options').html(defaultOption); // replace on page before start

    // This function allows you to click off of the smiley to clear the selection
    $(".clickWrapper").click(function(){
        $(".part").removeClass('hold');
        $('#options').html(defaultOption);
    }).children().click(function(e) {
        return false;
    });

    // When you click on a .part, display some options
    //$(".part").click(function() {
    $("#bigSmiley").on( "click", ".part", function() {
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
        } else if(pairType == 'cheeck'){
            partsArray = cheeck_parts;
            partsTitle = 'Cheeck';
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
            $('#options').prepend('<h4>'+partsTitle+' parts</h4>');
        });
    });

    // Update bigSmiley logic
    $(document).on( "click", 'ul.partPicker > li', function() {
        selectedType = $(this).attr("data-pairType"); // Get the part's type

        // Update cheeckMemory so the alignment functions can know what to place
        if(selectedType == 'cheeck'){ cheeckMemory = $(this).text(); }

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
        if(cheeckMemory == '' || (!cheeckMemory)) {
            cheeckMemory = $("#rightCheeck").text(); // Update memory (if not blank)
        } else {
            if($("#leftCheeck").length != 0){
                $("#leftCheeck").text(cheeckMemory); // If left cheeck exists, update it
            } else {
                $("#leftBracket").after('<span class="part paired left" data-pairType="cheeck" id="leftCheeck" title="Cheecks">'+cheeckMemory+'</span>'); // If left cheeck doesn't exist, add it.
            }
        }
        $("#rightCheeck").remove(); // Remove the right cheeck if facing left
        smileyUpdate(); // Run smiley update function
    });

    $("#turnRight").click(function(){
        if(cheeckMemory == '' || (!cheeckMemory)) {
            cheeckMemory = $("#leftCheeck").text(); // Update memory (if not blank)
        } else {
            if($("#rightCheeck").length != 0){
                $("#rightCheeck").text(cheeckMemory); // If right  cheeck exists, update it
            } else {
                $("#rightBracket").before('<span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">'+cheeckMemory+'</span>'); // If left cheeck doesn't exist, add it.
            }
        }
        $("#leftCheeck").remove(); // Remove the left cheeck if facing left
        smileyUpdate(); // Run smiley update function
    });

    // Center
    $("#center").click(function(){
        // Check to see if that spacer is already there, if so, don't add another one.
        if($('#rightCheeck').length == 0){
            $("#rightBracket").before('<span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">'+cheeckMemory+'</span>');
        }
        if($('#leftCheeck').length == 0){
            $("#leftBracket").after('<span class="part paired left" data-pairType="cheeck" id="leftCheeck" title="Cheecks">'+cheeckMemory+'</span>');
        }
        smileyUpdate(); // Run smiley update function
    });

    // Reset button
    $("#reset").click(function(){
        location.reload(); // Reset the DOM
    });


});
