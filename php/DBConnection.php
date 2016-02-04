<?php
//getting database instance & connection
	function getDBConnection(){
		define("USERNAME", 'root');
		define("PASSWORD", '');
		define("SERVER", 'localhost');
		define("DB", 'yellow_pixel');
		$conn=mysqli_connect(SERVER,USERNAME,PASSWORD,DB) or die('Error in database connection');
		return $conn;
	}
?>