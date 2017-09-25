'use strict';

module.exports = function(Leads) {


	Leads.beforeRemote ('create', function (context, modelInstance, next) {
		//var now = new Date().getTime();    
		context.req.body.ip = context.req.connection.remoteAddress;
		//context.req.body.createdDate = now;
		next();
	});

};
