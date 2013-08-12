Node.js End-To-End Web Stack
===========

This RESTful service is built on Node.js, and it has the following components: a UI, a server, and a MySQL database.  

To deploy this locally, download Node.js here: http://nodejs.org/download/. Clone this repository, go to the nodeService directory, and run in the command line:  

    node app.js

To view, open a browser and go to <code>localhost:3000</code>.  

If at any point the current RDS instance gets taken down, edit <code>app.js</code> lines 17-20 for information about the new database.

APIs
-----
<b>Get All Records</b>  
Gets all records that are in the database and returns them.  

<b>Get Record</b>   
Gets a specific record specified the record ID.  

<b>Put Record</b>  
Stores a record with the specified record ID and name for later access.  

<b>Update Record</b>  
Updates a record already saved with the specified record ID and the new name for the record ID.  

<b>Delete Record</b>  
Deletes a record with the specified record ID.  :w


Files
-----
* <code>app.js</code>: Server side: database connections and calls; configuration for rendering files, choosing ports, and so on
* <code>/views/layout.jade</code>: UI implementation and calling of the APIs using Javascript  
* <code>/public/stylesheets/style.css</code>: CSS stylesheet for the UI  


