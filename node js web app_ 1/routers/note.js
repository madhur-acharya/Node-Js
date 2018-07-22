 const express=  require('express');
 var router= express.Router();
 const fileSystem= require('fs');
 const bodyParser= require('body-parser');

 var urlencodedParser = bodyParser.urlencoded({ extended: false });

 router.get('/', function(request, response)
 {
 	var RAW_data= "";
 	fileSystem.readFile('./database/text.txt', function(err, data)
	{
		if(err)
			console.log(err);
		else
		{
			RAW_data= data.toString()
			console.log("parsing from text.txt");
 			console.log(RAW_data);
 			response.send(RAW_data);
		}
	});
 });

router.post('/', urlencodedParser, function(request, response)
{
	console.log(request.body);
	/*fileSystem.writeFile('./database/text.txt', games + request.body, function(err)
	{
		if(err)
			console.log(err);
	});
	console.log("writing to games.JSON");
	 console.log(games);*/
	 response.send("data added!");
});

/* router.get('/', function(request, response)
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
});*/

 module.exports= router;