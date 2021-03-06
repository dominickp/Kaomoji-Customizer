<?php include("recent.php"); ?>
<!Doctype HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Japanese Smiley Customizer</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Raleway|Passion+One' rel='stylesheet' type='text/css'>
    <link href="css/weeaboo.css" rel="stylesheet">
    <link href="css/li-scroller.css" rel="stylesheet">
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js"></script>
    <script src="js/jquery.li-scroller.1.0.js"></script>
    <script src="js/parts.js"></script>
    <script src="js/initialize.js"></script>
    <script src="js/customizer.js"></script>
    <script src="js/database.js"></script>
    <script src="js/randomize.js"></script>
</head>
<body>
<!-- Begin Facebook Like button -->
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=589820471038935";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>
<!-- End Facebook Like button -->
<ul id="ticker">
    <?php echo $allListItems; ?>
</ul>
<div id="toolBar">
    <span id="secondaryFooter" class="pull-right">
        © 2013 Dominick Peluso - Project 3 for CSCI E-15 -
        <a class="btn btn-default btn-xs" href="https://github.com/dominickp/p3.kaomoj.in" target="_blank">GitHub</a>
    </span>
    <div class="btn-group btn-group-sm">
        <a class="btn btn-default" href="http://dominick.p.elu.so/fun/kaomoji/" target="_blank"><span class="glyphicon glyphicon-tasks"></span> Batch Kaomoji Generator</a>
        <a class="btn btn-default" href="#" id="helpAboutBtn"><span class="glyphicon glyphicon-info-sign"></span> Help / About</a>
    </div>
</div>
<div id="optionsContainer" class="greyPanel noSelect">
    <h1>
        Kaomoji
        <span class="thickText">Customizer</span>
    </h1>
    <div id="options">
        You shouldn't see this!
    </div>
    <div id="subOptions" class="noSelect">
        <h4>Direction</h4>
        <div class="btn-group btn-group-sm">
            <a class="btn btn-default" id="turnRight" title="Turn Left"><span class="glyphicon glyphicon-arrow-left"></span></a>
            <a class="btn btn-default" id="center" title="Center"><span class="glyphicon glyphicon-resize-horizontal"></span></a>
            <a class="btn btn-default" id="turnLeft" title="Turn Right"><span class="glyphicon glyphicon-arrow-right"></span></a>
        </div>
        <hr>
        <p class="text-center"><a class="btn btn-warning btn-sm" id="randomize"><span class="glyphicon glyphicon-random"></span>&nbsp; Randomize!</a></p>
        <p class="text-center"><a class="btn btn-danger btn-xs" id="reset"><span class="glyphicon glyphicon-remove"></span>&nbsp; Reset</a></p>
		<br><br><br>
		<div class="fb-like" data-href="http://dominick.p.elu.so/fun/kaomoji" data-layout="box_count" data-action="like" data-show-faces="true" data-share="true"></div>    </div>
</div>
<div id="saveDatabase">
    <p class="lead">Want to add your creation to this site's Kaomoji database?</p>
    <p>Enter a caption or your name in the field below and click submit!</p>
    <form id="submitSmiley" name="submitSmiley" method="post" action="submit.php">
        <div style="width:80%; float:left">
            <input type="text" id="description" name="description" class="form-control" placeholder="Woo hoo! Look at me!" required maxlength="60">
        </div>
        <input type="hidden" id="smileyInputHidden" name="smiley" value="^_^">
        <div style="width:20%; float:left; padding-left:8px;">
            <input class="btn btn-primary" type="submit" name="submit">
        </div>
    </form>
</div>
<div class="clickWrapper">
    <div class="customizer noSelect">
        <div id="bigSmiley">
            <span class="part left" data-pairType="leftFlair" id="leftFlair" title="Left Flair">&nbsp;</span>
            <span class="part paired leftArms" data-pairType="leftArm" id="leftArm-left" title="Arms (left facing)">ヽ</span>
            <span class="part paired left" data-pairType="bracket" id="leftBracket" title="Brackets">(</span>
            <span class="part paired left" data-pairType="eye" id="leftEye" title="Eyes">•</span>
            <span class="part" data-pairType="mouth" id="mouth" title="Mouth">ヮ</span>
            <span class="part paired right" data-pairType="eye" id="rightEye" title="Eyes">•</span>
            <span class="part paired right" data-pairType="cheeck" id="rightCheeck" title="Cheecks">&nbsp;</span>
            <span class="part paired leftArms" data-pairType="leftArm" id="leftArm-right" title="Arms (left facing)">ヽ</span>
            <span class="part paired right" data-pairType="bracket" id="rightBracket" title="Brackets">)</span>
            <span class="part right" data-pairType="rightFlair" id="rightFlair" title="Right Flair">&nbsp;</span>
            <div class="clearfix"> </div>
        </div>
    </div>
    <div class="smallPreviewContainer">
        <small>Small Preview:</small><br>
        <textarea id="smallPreview" spellcheck="false"></textarea>
        <p><a class="btn btn-default" id="clipBoard"><span class="glyphicon glyphicon-list-alt"></span> Select Current Smiley</a></p>
        <p><a class="btn btn-default" id="saveSmiley"><span class="glyphicon glyphicon-pushpin"></span> Save to Database</a></p>
    </div>
    <div id="helpAbout">
        <p class="lead">You're on your way to more emotive smileys! ✌(♥ヮ♥ )</p>
        <p>Welcome to the Kaomoji / Japanese Smiley Customizer! This web page allows you to create and customizer fun, Japanese-style smileys called kaomoji. Kaomoji are made of various UTF-8 characters &mdash; so their appearance can differ depending on: the client who is viewing them, the character set of the website you're posting them on, and way the browse renders them. </p>
        <p>I reccomend that you check the small preview on the bottom-left-hand of this web page to get a feel for how your smiley will look when in its small form. Once you're happy with your kaomoji, click the Select Current Smiley button, right click and copy, then share it with your friends!</p>
        <p>Read more about kaomoji on <a href="http://en.wikipedia.org/wiki/Kaomoji" target="_blank">Wikipedia</a>.</p>
    </div>
</div>

</body>
</html>