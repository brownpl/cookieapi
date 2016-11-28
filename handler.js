'use strict';
'use esversion:6';

let ddb = require('dynamodb').ddb({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
	endpoint: 'dynamodb.us-west-2.amazonaws.com'
});

module.exports.getallcookies = (event, context, callback) => {
	ddb.scan('CookieTable', {}, function(err, res) {
		if(err) {
			respond(200, err, callback);
		} else {
			respond(200, res.items, callback);
		}
	});
};

module.exports.getcookies = (event, context, callback) => {
	ddb.getItem('CookieTable', event.pathParameters.UserId, null, {}, function(err, res, cap) {
		if(err) {
			respond(200, err, callback);
		} else {
			if(res)
			{
				respond(200, res, callback);
			}
			else
			{
				respond(200, false, callback);
			}
		}
	});
};
module.exports.setcookies = (event, context, callback) => {
	ddb.putItem('CookieTable', JSON.parse(event.body), {}, function(err, res, cap) {
		respond(200, { "success": true }, callback);
	});
};

/*module.exports.addacookie = (event, context, callback) => {
	let UserId = event.pathParameters.UserID;
	ddb.updateItem('CookieTable', UserId, null, { 'cookies': { value: '', action: 'PUT' } }, {}, function(err, res, cap) {
		if(err)
		{
			respond(200, err, callback);
		}
		else
		{
			respond(200, res, callback);
		}
	});
};*/


function respond(code, bodyJSON, callback)
{
	const response = {
			statusCode: code,
			body: JSON.stringify(bodyJSON)
	};
	callback(null, response);
}
