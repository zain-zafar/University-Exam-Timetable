// BY: Syed Zain Zafar, 1002534705, zafarsy4, CSCB20H3S.
// Date: 2017-03-31.
// Assign. Description: Upon entering course name, display
// info of that course; exam timetable.
// File content: This file contains the java 
// script responsible for courses.php and search.php
// to perform properly.

$(document).ready(function(){

		// When the form is submitted (click or enter), prevent it 
		$("#form").submit(function(event) {
			event.preventDefault();
			var choosen_course_id = "";
			
			// Find course name entered by user, and use it to fill the dropdown menu
			var course_name = $("#input_box").val();
			populate_options(course_name);
		});

		// When the value in dropdown menu changes, redirect to new URL or function
		$("select").change(function() {
			choosen_course_id = $(this).val(); // Store the hidden option value clicked.
			
			// If html table contains 1 row, redirect it to search.php
			// 2 or more rows indicates that current page is search.php and so dont redirect,
			// rather fill the html table
                        if ($('tr').length >= 2) { 
                                fill_table(choosen_course_id);
                        }
			else{
                        	url = "search.php?course_id="+choosen_course_id;
                        	window.location.href = url;
			}
		});

		// Extra feature, reset button clears tables accumulated and goes to courses.php
		$("#clear").click(function(){
			window.location.href = 'courses.php';
		});
});


// this function makes a AJAX request to exams.php, sending it course name as a parameter, 
// and retreving a JSON array consisting of queries that contain the partial/full course name.    

function populate_options(course_name) {
        $.getJSON("exams.php",
        {"course": course_name},
        function(data) {
                $.each(data, function(idx, val) {
                        $("#list").append('<option value = "'+val.id + '">' + val.course +" " +val.section +" " +val.instructor +'</option>');

                });
	// If no course found 
	}).fail(function() { 
		alert('Course not found. Please re-enter.');
		fill_table("");
	}); 
}


// This function makes an AJAX request to exams.php, sending it the hidden course id
// of the option selected in the dropdown menu to retrieve JSON array containing course
// information that will then be appended to the HTML table.
// This function triggers when search.php loads. 

function fill_table(course_id) {

	// Get course id sent in the url of search.php
	var passed_course_id = $('p').text(); //Without using echo, get the passed course_id from search.php

	// Check if HTML table contains 2 or more rows, this indicates that
	// search.php body onload() has already been activated, thus the script has re-run
	// And the user has inputted some course name again. 
	if ($('tr').length >= 2) { 
		passed_course_id = course_id; // Store the selected option's hidden id
	}

	// If no id was passed to search.php, then don't show anything   
	// Else something was passed, then do AJAX request to exams.php 
	if (passed_course_id.length != 0) {
		$.getJSON('exams.php', {'course_id': passed_course_id}, function(data) {
			
			// Store all table data in a string
			var table_data_str = $('table').find("td").text();
			// If user enters course name that exists already in table, raise error.
			if (table_data_str.includes(data[0].course)){
				alert("This course has already been selected. Please choose another.");
			}
			// If course name is not in table, append the course information to the html table
			else {
				$.each(data, function(idx, val) {
					$('table').append('<tr><td>'+val.course+'</td><td>'+val.section+'</td><td>'+
						val.instructor +'</td><td>'+val.date+'</td><td>'+val.start+'</td><td>'+val.end+'</td></tr>');
				});	
			}
		});
	}
	// Reset all user input information
	$("select").find('option').remove(); // Clear dropdown menu
	$("select").append("<option>Select A Course</option>");
	$("#form")[0].reset(); // Clears user input in the form
	
}
