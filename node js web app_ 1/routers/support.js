  const express= require('express');
  var router= express.Router();

  router.get('/', function(request, response)
  {
  	response.send("<h3>phone: 1234567890 </h3> <h3> email: my_express_app@gmail.com</h3>");
  });

  module.exports= router;