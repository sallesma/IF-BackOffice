IF-BackOffice
=============

Back Office for the Festival mobile applications.

It aims to provide data for both android and iOS apps, so that the crew can update both applications without updating any code

## Information

The project uses slim framework : http://www.slimframework.com/

Here is what non slim framework files and folders stand for :

	/api

Contains function calls used by mobile application to get the data from the server database

	base.sql

A dump of the database that we use when we move to another server to install the database

## Installation

To have the project running properly, put all the files in your web server file system

Use base.sql to create your MySQL database with all the tables.

Then you need to update the file data/connection.php to set up your database connection :

	$host = "";
	$login = "";
	$password = "";
	$databaseName = "";
	$table_schema= "";

Your backoffice is now available!
