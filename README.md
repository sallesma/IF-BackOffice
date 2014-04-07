IF-BackOffice
=============

Back Office for the Festival mobile applications.

It aims to provide data for both android and iOS apps, so that the crew can update both applications without updating any code

## Information

The project uses slim framework : http://www.slimframework.com/

Here is what non slim framework files stand for :

    base.sql

A dump of the database that we use when we move to another server to install the database

## Installation

To have the project running properly, put all the files in your web server file system

Use base.sql to create your MySQL database with all the tables.

Then you need to create the file src/parameters.ini to set up your database connection :

    [connection]
    db_driver = mysql
    db_user =
    db_password =

    [dsn]
    host =
    dbname =

Last but not least, set up the $homeUrl var with your local basePath in index.php

Your backoffice is now available!

## Contribution

If you have any good ideas about a better interface, contact us :)
