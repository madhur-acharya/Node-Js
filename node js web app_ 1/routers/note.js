 const express=  require('express');
 var router= express.Router();
 const fileSystem= require('fs');
 const bodyParser= require('body-parser');
 const path= require('path');

 var urlencodedParser = bodyParser.urlencoded({ extended: false });
 var JSON_parser= bodyParser.json();
 var text_parser= bodyParser.text();

 router.get('/', function(request, response)
 {
 	var RAW_data= "";
 	fileSystem.readFile(path.join(process.cwd(), '/database/text.txt'), function(err, data)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);
		else
		{
			RAW_data= data.toString()
 			response.render('note', {note: RAW_data});
		}
	});
 });

router.get('/delete', function(request, response)
{
	fileSystem.writeFile(path.join(process.cwd(), '/database/text.txt'), '', function(err)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);
		else
			response.send("note deleted");
	});
});

router.post('/', text_parser, function(request, response)
{
	var RAW_data= "";
 	fileSystem.readFile(path.join(process.cwd(), '/database/text.txt'), function(err, data)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);
		else
		{
			RAW_data= data.toString()
 			fileSystem.writeFile(path.join(process.cwd(), '/database/text.txt'), RAW_data + request.body, function(err)
			{
				if(err != null || err != undefined)
					console.log("error: ", err);
				else
					response.send("data added!");
			});
		}
	});
});

 module.exports= router;
