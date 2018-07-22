const express = require('express');
const path= require('path');
const bodyParser= require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function(request, response)
{
	response.sendFile(path.join(process.cwd() + '/public/ASTEROIDS/game.html'));
});



module.exports= router;