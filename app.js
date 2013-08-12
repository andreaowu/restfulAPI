var express = require("express")
, stylus = require("stylus")
, nib = require("nib")
, http = require('http')

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 3);
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'host',
    user     : 'username',
    password : 'password',
    database: 'innodb'
});
connection.connect();

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(stylus.middleware({ 
        src: __dirname + '/public', compile: compile
    }));
    app.use(express.static(__dirname + '/public'));
});

var port = process.env.PORT || 3000;
server.listen(port);

var counter = 0;
function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.get('/', function (req, res) { // HTTP GET method with path /, "root" page
    res.render('layout',
    { title : 'Home' }
    );
})

io.sockets.on('connection', function (socket) {
    socket.on('get', function (id) {
        connection.query('SELECT * FROM Andrea WHERE id=' + id, function(err, rows, fields) {
            if (err || rows.length == 0) {
                socket.emit('error', "Queried ID does not exist");
            } else {
                socket.emit('response', rows, "get");
            }
        });
    });
    socket.on('getAll', function () {
        connection.query('SELECT * FROM Andrea', function(err, rows, fields) {
            if (err) {
                socket.emit('error', "Getting all records failed");
            } else {
                socket.emit('response', rows, "getAll");
            }
        });
    });
    socket.on('put', function (id, name) {
        connection.query('INSERT INTO Andrea VALUES (\'' + id + '\', \'' + name + '\')', function(err, rows, fields) {
            if (err || name == null || id == null) {
                socket.emit('error', "Put failed");
            } else {
                socket.emit('response', "[{\"id\":" + id + ", \"name\":" + name + "\"}]", "put");
            }
        });
    });
    socket.on('update', function (id, name) {
        connection.query('UPDATE Andrea SET name=\'' + name + '\' WHERE id=\'' + id + '\'', function(err, rows, fields) {
            if (err || rows.changedRows == 0 || name == null || id == null) {
                socket.emit('error', "Update ID does not exist");
            } else {
                socket.emit('response', "[{\"id\":" + id + ", \"name\":" + name + "\"}]", "update");
            }
        });
    });
    socket.on('delete', function (id) {
        connection.query('DELETE From Andrea WHERE id=' + id, function(err, rows, fields) {
            if (err || rows.affectedRows == 0 || id == null) {
                socket.emit('error', "Delete ID does not exist");
            } else {
                socket.emit('response', "[{\"id\":" + id + "\"}]", "delete");
            }
        }); 
    });
});
