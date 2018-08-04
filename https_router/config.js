var environments= 
{
    'staging' : 
    {
      'http_port': 3000,
      'https_port': 3001,
      'env_name'  : 'staging'
    },

    'production' :
    {
      'http_port' : 5000,
      'https_port': 5001,
      'env_name' : 'production'
    }
};

var current_environment, export_environment; 

if(process.env.NODE_ENV)
{
  current_environment= process.env.NODE_ENV.toLowerCase();
  if(environments[current_environment])
    export_environment= environments[current_environment];
  else
    export_environment= environments.staging;
}
else
  export_environment= environments.staging;

module.exports= export_environment;