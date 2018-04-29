<!DOCTYPE html>
<html>
    <head>
	<!-- Add file which contains the head -->
	<?php include("top.html"); ?>
    </head>


    <body onload="fill_table('')">
	<!-- The above line calls the js fill_table function after search.php loads -->
	<?php
		// Include a file which contains most body code
		include("bottom.html");
		$course_id = $_REQUEST['course_id']; //Get the course_id value from url
	?>
	<!-- The hidden paragraph stores the passed course_id and cannot be seen -->
	<!-- This paragraph text is then received using js function fill_table(), thus no need to echo -->
	<!-- Instead of passing php variable to js, I turned the php variable into html and send to js -->
	<!-- This way I avoid the need to echo -->
	<p hidden><?= $course_id ?></p>

    </body>
</html>
