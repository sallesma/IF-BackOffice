IF-BackOffice
=============

Back Office for the Festival mobile applications.

It aims to provide data for both android and iOS apps, so that the crew can update both applications without updating any code

## Information

We know that the project is a bit messy right know (and will fiw that a bit later).

Here is what each important folder stands for :

	/api

Contains function calls used by mobile application to get the data from the server database


	/data

Contains all php treatment for the backoffice (mainly CRUD operations).  It also contains the files uploaded by the user.


	/fonts

Contains some files for the backoffice


	/script

Contains JavaScript libraries (such as jQuery) and our app.js file


	/style

Contains CSS librairies (such as Bootstrap) and our style.css file


	index.html

The main (and only) page of the backoffice


	base.sql

A dump of the database that we use when we move to another server to install the database

## Installation

To have the project running properly, put all the files in your web server file system

Use base.sql to create your MySQL database with all the tables and some fake data (that you can delete afterwards if you want).

Then you need to update the file data/connection.php to set up your database connection :

	$host = "";
	$login = "";
	$password = "";
	$databaseName = "";

Your backoffice is now available!
