<?php
	include("config.php"); // Provides variables to connect to mysql

	//connect to the database
        $dbh = mysqli_connect($servername, $username, $password, $dbname);

	// Get course name or course id, if passed in URL
	$course_name = $_REQUEST['course'];
	$course_id = $_REQUEST['course_id'];


	if(!$dbh) { // If connection fails, print error
		die("Connection Failed: " . mysqli_connect_error());
       	}

	// If no course id is passed, then courses.php will need this query
	// And even if no id or course name is passed, then query will still be valid.
	if (strlen($course_id) == 0) {
		// This query will join courses and time tables together
		// to retrieve course, section, instructor, and id  for the given course name
		// or part of it. If no course name is given, then query still works.
       		$query = "SELECT course,section,instructor,id FROM courses NATURAL JOIN time WHERE course LIKE'$course_name%';";

	// This query will be made, if search.php was called, thus id was passed 
	}else {
		// Combine courses and time tables to retrieve course, section
		// insturctor, date, start, end with matching id.
		// This query will not run if no id is given.
		$query = "SELECT course,section,instructor,date,start,end FROM courses INNER JOIN time ON courses.id = time.id WHERE courses.id =$course_id;";
	}

      	$result = mysqli_query($dbh, $query);// Store query results
	$json_rows = array();

	// If there is atleast 1 row, then jason encode those results.
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
  			$json_rows[] = $row;
             	}
        echo json_encode($json_rows);
	}

	// If there is no matching course or id, then raise HTTP 404 error.
	else {
		$url =  $_SERVER['REQUEST_URI'];
                header("HTTP/1.1 400 Invalid Request"); ?>
                <h1>Not Found</h1>
                <p id = "error"><?= die("The requested URL $url was not found on this server.") ?></p>
	<?php } ?>


