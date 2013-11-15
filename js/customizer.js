$(document).ready(function(){

    // Function for resizing the smiley based on length
    var fontScale = function() {
        var currentSmiley = $('#bigSmiley').children().text();
        var length = currentSmiley.length
        var scaleFactor = 2;
        var size = 120 - ( length * scaleFactor ) + 'px';
    //    console.log(size); // Log for debugging until I get this working nicely
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

    var setZeroClipboardAction = function() {
        // Initialize ZeroClipboard
        $("a#clipBoard").zclip({
            path:'js/ZeroClipboard.swf',
            copy:getSmiley(),
            beforeCopy:function(){
                $('#bigSmiley').css('color','#3276b1');
            },
            afterCopy:function(){
                $('#bigSmiley').css('color','#333');
                $(this).next('.check').show();
            }
        });
    }
    setZeroClipboardAction(); // Initialize ZeroClipBoard

    $("#smallPreview").text(getSmiley()); // Update the small preview

    // Do this every time the Smiley changes
    var smileyUpdate = function() {
        fontScale(); // Scale the font
        $("title").text(getSmiley()); // Update the html title
        $("#smallPreview").text(getSmiley()); // Update the small preview
        $('.part').tooltip({"placement":"bottom"}); // Reinitialize when the smiley is updated. Due to adding/removing cheecks
        setZeroClipboardAction();
        setHoverAction(); // Reinitialize hover action
    }

    // Declare this variable which will be used to hang on to the cheeck when flipping left to right. Set as inital left cheeck for default.
    var cheeckMemory = $("#rightCheeck").text();
    var leftArmMemory = $("#leftArm-left").text();
    var rightArmMemory = 'ノ'; // Start with this one, since we don't want to default to a left facing one or nothing

    // Set the default options html in a variable
    var defaultOption = '<h3>Customize!</h3>Click on a peice of the large smiley to the left to start customizing!';

    $('#options').html(defaultOption); // replace on page before start

    // This function allows you to click off of the smiley to clear the selection
   $(".clickWrapper").click(function(){
        $(".part").removeClass('hold');
        $('#options').html(defaultOption);
        $('#helpAbout').animate({bottom: '-1000px'}, 600);
    }).children().click(function(e) {
        return false;
    });


    // When you click on a .part, display some options
    //$(".part").click(function() {
    $("#bigSmiley").on( "click", ".part", function() {
        var currentPart = $(this);
       // console.log(currentPart.text());
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
        } else if(pairType == 'leftArm'){
            partsArray = leftArm_parts;
            partsTitle = 'Arms (left facing)';
        } else if(pairType == 'rightArm'){
            partsArray = rightArm_parts;
            partsTitle = 'Arms (right facing)';
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

        inUse = false; // Clear inUse variable, resetting the hover preview action.
        // Set the initial part for reference
        $('.partPicker > li:contains("'+currentPart.text()+'")').addClass("previousPart");

    });

    var inUse = false; // If true, locks down the hover preview action


    var setBigCharacter = function(part){
        selectedType = part.attr("data-pairType"); // Get the part's type

        // Update cheeckMemory so the alignment functions can know what to place
        if(selectedType == 'cheeck'){ cheeckMemory = part.text(); }
        if(selectedType == 'leftArm'){ leftArmMemory = part.text(); }
        if(selectedType == 'rightArm'){ rightArmMemory = part.text(); }

        // Update on the big smiley
        if (part.hasClass('pair')){
            var counter = 0;
            part.children().each(function(key, value){
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
            selectedPart = part.text(); // Get the part
            $('#bigSmiley *[data-pairType="' + selectedType + '"]').text(selectedPart);
        }
        smileyUpdate(); // Run smiley update function

    }

    // Update bigSmiley if you hover over a part
    $(document).on( "mouseenter mouseleave", 'ul.partPicker > li', function() {
        if(inUse == false){
            setBigCharacter($(this));
        }
    });

    // Locking / toggling mechanism for clicking a part
    $(document).on( "click", 'ul.partPicker > li', function() {
        setBigCharacter($(this));
        $(this).toggleClass("inUse").siblings().removeClass('inUse');
        $(".previousPart").removeClass('previousPart');
        if($(".inUse").length > 0){
            inUse = true;
        } else {
            inUse = false;
        }

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

        $(".rightArms").remove();
        $(".leftArms").remove();
        $("#rightBracket").after('<span class="part paired right rightArms" id="rightArm-right" data-pairType="rightArm" title="Arms (right facing)">' + rightArmMemory + '</span>');
        $("#leftBracket").after('<span class="part paired right rightArms" id="rightArm-left" data-pairType="rightArm" title="Arms (right facing)">' + rightArmMemory + '</span>');


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

        $(".rightArms").remove();
        $(".leftArms").remove();
        $("#rightBracket").before('<span class="part paired left leftArms" id="leftArm-right" data-pairType="leftArm" title="Arms (left facing)">' + leftArmMemory + '</span>');
        $("#leftBracket").before('<span class="part paired left leftArms" id="leftArm-left" data-pairType="leftArm" title="Arms (left facing)">' + leftArmMemory + '</span>');

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

        $(".rightArms").remove();
        $(".leftArms").remove();
        $("#leftBracket").before('<span class="part paired left leftArms" id="leftArm-left" data-pairType="leftArm" title="Arms (left facing)">' + leftArmMemory + '</span>');
        $("#rightBracket").after('<span class="part paired right rightArms" id="rightArm-right" data-pairType="rightArm" title="Arms (right facing)">' + rightArmMemory + '</span>');

        smileyUpdate(); // Run smiley update function
    });

    // Reset button
    $("#reset").click(function(){
        location.reload(); // Reset the DOM
    });


});
