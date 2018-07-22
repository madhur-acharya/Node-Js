const express= require('express');
var app= new express();
const port= 3000;
var router= express.Router();
var path= require('path');

app.use(express.static('public'));

var contacts_route_handler = require('./routers/contacts.js');
app.use('/contacts', contacts_route_handler);

var support_route_handler= require('./routers/support.js');
app.use('/support', support_route_handler);

var games_route_handler= require('./routers/note.js');
app.use('/note', games_route_handler);

var asteroids_route_handler= require('./routers/asteroids.js');
app.use('/asteroids', asteroids_route_handler);

app.listen(port, function(err)
{
	if(err)
		console.log(err);
	else
		console.log("listening on port: ", port);
});

app.get('/', function(request, response)
{
	response.sendFile(path.join(__dirname + '/public/main.html'));
});

app.get('*', function(request, response)
{
	response.send("<h1> Whoops!</h1>");
});