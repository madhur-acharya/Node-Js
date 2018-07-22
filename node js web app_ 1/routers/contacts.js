const express = require('express');
const sqlite3= require('sqlite3');
const path= require('path');
const bodyParser= require('body-parser');

var router = express.Router();
var db= new sqlite3.Database('./database/contacts.db');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//displays main webpage--------------------------------------------------------------------------------------------------------------------
router.get('/', function(request, response)
{
	response.sendFile(path.join(process.cwd() + '/public/update.html'));
});

//outputs all data from database-----------------------------------------------------------------------------------------------------------
router.get('/all', function(request, response)
{
	db.all('SELECT * FROM contacts', function(err, rows)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);

		else if(rows)
		{
			console.log("query outputs: " + rows.length + "rows");
			response.send(rows);
		}
		else
			response.send("<p>culd not parse data!</p>");
	});
});

//outputs user selected data from database----------------------------------------------------------------------------------------------
router.get('/select', function(request, response)
{
	db.all('SELECT * FROM contacts WHERE ? = '+ request.query.d_type,  [request.query.info], function(err, rows)
	{
		console.log(request.query);
		if(err != null || err != undefined)
			console.log("error: ", err);
		else if(rows)
		{
			console.log("query outputs: " + rows.length + "rows");
			response.send(rows);
		}
		else
			response.send("<p>could not parse data!</p>");
	});
});

//adds data to database database-----------------------------------------------------------------------------------------------------------
router.post('/add', urlencodedParser, function(request, response)
{
	console.log(request.body);
	db.run('INSERT INTO contacts (FirstName, LastName, Age) VALUES (?, ?, ?)', [request.body.Fname, request.body.Lname, request.body.Age]);
	response.send(request.body.Fname + ", " + request.body.Lname + ", " + request.body.Age + "  added sucessfully!");
});

//delets specific data from database------------------------------------------------------------------------------------------------------
router.get('/remove', function(request, response)
{
	db.run('DELETE FROM contacts WHERE ? = ;'+ request.query.del_info,  [request.query.del_type], function(err, result)
	{
		console.log(request.query);
		if(err != null || err != undefined)
		{
			console.log("error: ", err);
			response.send("<p>could not parse data!</p>");
		}

		else
			response.redirect('./all');
			
	});
});

//------------------------------------------------------------------------------------------------------------------------------------------


module.exports = router;