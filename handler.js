'use strict';
'use esversion:6';

let AWS = require('aws-sdk');
var db = new AWS.DynamoDB.DocumentClient();


module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
  callback(null, response);
};

module.exports.addentry = (event, context, callback) => {

	var params = {
	  TableName : 'cookieTable',
	  Item: {
	     user_id: '1asdfasdf',
			 cookies: 5
	  }
	};

	db.put(params, function(err, data) {
	  if (err) console.log(err);
	  else console.log(data);
	});
	const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'written database',
      input: event,
    }),
  };
  callback(null, response);
};
