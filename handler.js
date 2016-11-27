'use strict';
'use esversion:6';

let AWS = require('aws-sdk');
var db = new AWS.DynamoDB.DocumentClient();

module.exports.getallcookies = (event, context, callback) => {
		var params = {
				TableName: 'CookieTable'
		};

		db.scan(params, function(err, data) {
				if (err) callback(err, null);
				else {
						const response = {
								statusCode: 200,
								body: JSON.stringify(data.Items)
						};
						callback(null, response);
				}
		});
};

module.exports.getcookies = (event, context, callback) => {
		var params = {
				TableName: "CookieTable",
				KeyConditionExpression: "#UserId = :UserId",
				ExpressionAttributeNames: {
						"#UserId": "UserId"
				},
				ExpressionAttributeValues: {
						":UserId": event.pathParameters.UserId
				}
		};

		db.query(params, (err, data) => {
				if (err) {
						const err = {
								statusCode: 200,
								body: JSON.stringify({
										input: event
								})
						};
						callback(err, null);
				} else {
						const response = {
								statusCode: 200,
								body: JSON.stringify(data.Items)
						};
						callback(null, response);
				}
		});
};
module.exports.setcookies = (event, context, callback) => {

		var params = {
				TableName: 'CookieTable',
				Item: JSON.parse(event.body)
		};

		db.put(params, function(err, data) {
				if (err) console.log(err);
				else console.log(data);
		});
		const response = {
				statusCode: 200,
				body: JSON.stringify({
						success: true
				}),
		};
		callback(null, response);
};

module.exports.getcookies = (event, context, callback) => {
		var params = {
				TableName: 'CookieTable'
		};

		db.scan(params, function(err, data) {
				if (err) callback(err, null);
				else {
						const response = {
								statusCode: 200,
								body: JSON.stringify(data.Items)
						};
						callback(null, response);
				}
		});
};

module.exports.addacookie = (event, context, callback) => {
	var params = {
		TableName: "CookieTable",
			Key: { "UserId": event.pathParameters.UserID },
			UpdateExpression: "SET cookies = :cookies + 1",
	};

		db.update(params, (err, data) => {
				if (err) {
						const err = {
								statusCode: 200,
								body: JSON.stringify({
										input: event
								})
						};
						callback(err, null);
				} else {

						const response = {
								statusCode: 200,
								body: JSON.stringify(data)
						};
						callback(null, response);
				}
		});
};
