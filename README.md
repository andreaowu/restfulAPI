Node.js End-To-End Web Stack
===========

This RESTful service is built on Node.js, and it has the following components: a UI, a server, and a MySQL database.  

To deploy this locally, download Node.js here: http://nodejs.org/download/. Clone this repository, go to the nodeService directory, and run in the command line:  

    node app.js

APIs
-----
<b>Get</b>
<b>Get All</b>


Files
-----
* <code>app.js</code>: Server side: database connections and calls; configuration for rendering files, choosing ports, and so on
* <code>/views/layout.jade</code>: UI implementation and calling of the APIs using Javascript  
* <code>/public/stylesheets/style.css</code>: CSS stylesheet for the UI  


