//polyfill for Object.assign. paste the code to use. ----------------------------------------------------------------------
// object1= Object.assign(param1, param2, param3...);-----------------------------------------------------------
require(path.join(process.cwd() + '/custom_modules_and_middleware/object_assign_polyfill.js'));

//----------------------------------------------------------------------------------------------------------------------------
document.getElementById("submit").onclick= function()
{
	var http= new XMLHttpRequest();
	http.onreadystatechange= function()
	{
		if(http.readyState === 4 && http.status === 200)
			console.log(JSON.parse(http.responseText));
	}
	http.open('GET', "./select/" + document.getElementById("d_type").value + "/" + document.getElementById("value").value);
	http.send();
};
//----------------------------------------------------------------------------------------------------------------------------

xhr = new XMLHttpRequest();
var url = "url";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange = function () 
{ 
if (xhr.readyState == 4 && xhr.status == 200) 
	{
	    var json = JSON.parse(xhr.responseText);
	    console.log(json.email + ", " + json.name)
	}
}
var data = JSON.stringify({"email":"tomb@raider.com","name":"LaraCroft"});
xhr.send(data);

//----------------------------------------------------------------------------------------------------------------------------
if(request.query.del_info === '' || request.query.del_info === null || request.query.del_info === undefined)
	{
		console.log("empty data string detected!")
		db.run('DELETE FROM contacts WHERE $del_type IS NULL OR $del_type = "" OR trim($del_type) = "" OR LENGTH($del_type)<= 1', {$del_type: request.query.del_type, $del_info: request.query.del_info}, function(err, result)
		{ 
			console.log(request.query);
			if(err != null || err != undefined)
			{
				console.log("error: ", err);
				response.send("<p>could not parse data!</p>");
			}

			else
			{
				console.log(this.lastID);
				response.redirect('./all');
			}
				
		});
	}

//------------------------------------------------------------------------------------------------------------------------------
router.get('/all', function(request, response)
{
	var obj= {}
	db.each('SELECT * FROM contacts', function(err, rows)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);

		else if(rows)
		{
			obj= Object.assign({}, obj, rows);
			console.log(obj);
		}
			
	},function(err, length)
	{
		console.log("query outputs: " + length + "rows");
		if(length)
			response.send(obj);
		else
			response.send("<p>culd not parse data!</p>");
	});
});
//------------------------------------------------------------------------------------------------------------------------------
//parsing and writing to a JSON file
router.get('/', function(request, response)
 {
 	console.log("parsing from games.JSON");
 	console.log(games);
 	response.send(games);
 });

router.get('/:genre/:game', function(request, response)
{
	games[request.params.genre]= request.params.game;
	fileSystem.writeFile('./database/games.JSON', JSON.stringify(games, null, 2), function(err)
	{
		if(err)
			console.log(err);
	});
	console.log("writing to games.JSON");
	 console.log(games);
	 response.send("data added!");
});
//------------------------------------------------------------------------------------------------------------------------------
