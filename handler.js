'use strict';
'use esversion:6';

let ddb = require('dynamodb').ddb({ accessKeyId: process.env.AWS_KEY,
                                    secretAccessKey: process.env.AWS_SECRET });

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
	ddb.query('CookieTable', event.pathParameters.UserId, {}, function(err, res, cap) {
		if(err) {
			respond(200, err, callback);
		} else {
			respond(200, res.items, callback);
		}
	});
};
module.exports.setcookies = (event, context, callback) => {
	ddb.putItem('CookieTable', JSON.parse(event.body), {}, function(err, res, cap) {
		respond(200, { "success": true }, callback);
	});
};



/*module.exports.addacookie = (event, context, callback) => {
	var params = {
		TableName: "CookieTable",
			Key: { "UserId": event.pathParameters.UserID },
			UpdateExpression: "SET cookies = :cookies + 1",
	};

		db.update(params, (err, data) => {
				if (err) {
						respond(200, { "input": event }, callback);
				} else {
						respond(200, body, callback);
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
