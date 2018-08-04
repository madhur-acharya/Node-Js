const http= require('http');
const https= require('https');
const router= require('./my_router.js');
const url= require('url');
const string_decoder= require('string_decoder').StringDecoder;
const config= require('./config.js');
const fs= require('fs');

var my_router= new router();
var parsed_request;
var https_options= {'key' : fs.readFileSync('./https/key.pem'), 'cert' : fs.readFileSync('./https/cert.pem')};


//http server-----------------------------------------------------------------------------------------------------
var http_server= http.createServer(function(request, response)
{
	server_handler(request, response);
});

http_server.listen(config.http_port, function(err)
{
	if(err)
		console.log(err);
	else
		console.log("listening on port " + config.http_port + " in " + config.env_name);
});

//https server-----------------------------------------------------------------------------------------------
var https_server= https.createServer(https_options, function(request, response)
{
	server_handler(request, response);
});

https_server.listen(config.https_port, function(err)
{
	if(err)
		console.log(err);
	else
		console.log("listening on port " + config.https_port + " in " + config.env_name);
});

//routes-----------------------------------------------------------------------------------------------------
my_router.create('/oranges', function(request, response)
{
	response.setHeader('content-type', 'application/json');
	response.end(JSON.stringify("{oranges: great sources of vitamin C}"));
});

my_router.create('/apples', function(request, response)
{
	response.end("an apple a day keeps the doctor away!");
});

my_router.create('/favicon.ico', function(request, response)
{
	response.end("favicon.ico");
});

//------------------------------------------------------------------------------------------------------------
var server_handler= function(request, response)
{
	var parsed_url= url.parse(request.url,true); 
	var trimmed_path= parsed_url.pathname.replace(/^\/+|\/+$/g, '');
	var quary_params= parsed_url.query;
	var headers= request.headers;
	var utf8_decoder= new string_decoder('utf-8');
	var buffer= "";
	var request_data= {};
	request.on('data',  function(data_stream)
	{
		buffer= buffer + utf8_decoder.write(data_stream);
	});

	request.on('end', function()
	{
		buffer= buffer + utf8_decoder.end();
		request_data= 
		{
			'trimmed_path' : trimmed_path,
			'quary_params' : quary_params,
			'headers': headers,
			'request_method' : request.method.toUpperCase(), 
			'payload' : buffer
		};
		my_router.handler(request_data, response);
	});

	if(trimmed_path != "favicon.ico")
	{
		console.log((trimmed_path ? "true" : "false") + " : " + "'" + trimmed_path + "' sent using: " + request.method.toUpperCase() + " request");
		console.log((quary_params ? "true" : "false") + " : query parameters: " + JSON.stringify(quary_params));
		//console.log(headers);
	}
};