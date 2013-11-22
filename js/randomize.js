$(document).ready(function(){

    $("#randomize").click(function(){
        console.log("Randomize!");

        // Pull some random parts
        var mouth = mouth_parts[Math.floor(Math.random()*mouth_parts.length)];
        var eyes = eye_parts[Math.floor(Math.random()*eye_parts.length)];
        var leftEye = eyes[0];
        var rightEye = eyes[1];
        var leftArm = leftArm_parts[Math.floor(Math.random()*leftArm_parts.length)];
        var rightArm = rightArm_parts[Math.floor(Math.random()*rightArm_parts.length)];
        var cheeck = cheeck_parts[Math.floor(Math.random()*cheeck_parts.length)];

        console.log(leftArm+rightArm);

        // List some different templates

        var templates = new Array();

        templates[0] =
            '<span class="part left" data-pairType="leftFlair" id="leftFlair" title="Left Flair">&nbsp;</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-left" title="Arms (left facing)">'
        + leftArm +
            '</span><span class="part paired left" data-pairType="bracket" id="leftBracket" title="Brackets">(</span><span class="part paired left" data-pairType="eye" id="leftEye" title="Eyes">'
        + leftEye +
            '</span><span class="part" data-pairType="mouth" id="mouth" title="Mouth">'
        + mouth +
            '</span><span class="part paired right" data-pairType="eye" id="rightEye" title="Eyes">'
        + rightEye +
            '</span><span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">&nbsp;</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-right" title="Arms (left facing)">'
        + leftArm +
            '</span><span class="part paired right" data-pairType="bracket" id="rightBracket" title="Brackets">)</span><span class="part right" data-pairType="rightFlair" id="rightFlair" title="Right Flair">&nbsp;</span><div class="clearfix"> </div>';

        templates[1] =
            '<span class="part left" data-pairType="leftFlair" id="leftFlair" title="Left Flair">&nbsp;</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-left" title="Arms (left facing)">&nbsp;</span><span class="part paired left" data-pairType="bracket" id="leftBracket" title="Brackets">(</span><span class="part paired left" data-pairType="eye" id="leftEye" title="Eyes">'
        + leftEye +
            '</span><span class="part" data-pairType="mouth" id="mouth" title="Mouth">'
        + mouth +
            '</span><span class="part paired right" data-pairType="eye" id="rightEye" title="Eyes">'
        + rightEye +
            '</span><span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">'
        + cheeck +
            '</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-right" title="Arms (left facing)">&nbsp;</span><span class="part paired right" data-pairType="bracket" id="rightBracket" title="Brackets">)</span><span class="part right" data-pairType="rightFlair" id="rightFlair" title="Right Flair">&nbsp;</span><div class="clearfix"> </div>';

        templates[2] =
            '<span class="part left" data-pairType="leftFlair" id="leftFlair" title="Left Flair">&nbsp;</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-left" title="Arms (left facing)">&nbsp;</span><span class="part paired left" data-pairType="bracket" id="leftBracket" title="Brackets">(</span><span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">&nbsp;</span><span class="part paired left" data-pairType="eye" id="leftEye" title="Eyes">'
        + leftEye +
            '</span><span class="part" data-pairType="mouth" id="mouth" title="Mouth">'
        + mouth +
            '</span><span class="part paired right" data-pairType="eye" id="rightEye" title="Eyes">'
        + rightEye +
            '</span><span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">&nbsp;</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-right" title="Arms (left facing)">&nbsp;</span><span class="part paired right" data-pairType="bracket" id="rightBracket" title="Brackets">)</span><span class="part right" data-pairType="rightFlair" id="rightFlair" title="Right Flair">&nbsp;</span><div class="clearfix"> </div>';

        templates[3] =
            '<span class="part left" data-pairType="leftFlair" id="leftFlair" title="Left Flair">&nbsp;</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-left" title="Arms (left facing)">&nbsp;</span><span class="part paired left" data-pairType="bracket" id="leftBracket" title="Brackets">(</span><span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">'
        + cheeck +
                '</span><span class="part paired left" data-pairType="eye" id="leftEye" title="Eyes">'
        + leftEye +
            '</span><span class="part" data-pairType="mouth" id="mouth" title="Mouth">'
        + mouth +
            '</span><span class="part paired right" data-pairType="eye" id="rightEye" title="Eyes">'
        + rightEye +
            '</span><span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">'
        + cheeck +
            '</span><span class="part paired leftArms" data-pairType="leftArm" id="leftArm-right" title="Arms (left facing)">&nbsp;</span><span class="part paired right" data-pairType="bracket" id="rightBracket" title="Brackets">)</span><span class="part right" data-pairType="rightFlair" id="rightFlair" title="Right Flair">&nbsp;</span><div class="clearfix"> </div>';

        var randTemplate = templates[Math.floor(Math.random() * templates.length)];

        $("#bigSmiley").fadeOut('fast',function(){
            $(this).html(randTemplate).fadeIn('fast'); // Update the big guy
            smileyUpdate(); // Run smiley update function
        });


    });
});