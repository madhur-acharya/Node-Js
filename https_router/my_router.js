var router= function()
{
	this.router_stack= [];

	this.create= function(path, clbk)
	{
		this.router_stack.push(
		{
			path: path.replace(/^\/+|\/+$/g, ''),
			callback: clbk
		});
	};

	this.handler= function(request, response)
	{
		var flag= false;
		for(i= 0; i < this.router_stack.length; i++)
		{
			if(this.router_stack[i].path == request.trimmed_path)
			{
				this.router_stack[i].callback(request, response);
				flag= true;
				break;
			}
		}
		if(flag === false)
		{
			response.end("whoops!");
		}
	}
};

module.exports= router;