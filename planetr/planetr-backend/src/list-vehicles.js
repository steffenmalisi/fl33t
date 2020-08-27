"use strict";

const AWS = require("aws-sdk");

const { VEHICLE_TABLE, IS_OFFLINE } = process.env;
const dynamoDb =
  IS_OFFLINE === "true"
    ? new AWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
      })
    : new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
  const params = {
    TableName: VEHICLE_TABLE,
  };

  console.log("My params", params);
  console.log("Is Offline?", IS_OFFLINE);

  const findAll = dynamoDb.scan(params).promise();

  try {
    const data = await findAll;
    const { Items: assets } = data;
    console.log("Success", assets);
    return response(200, assets);
  } catch (error) {
    console.log("Error", error);
    return response(400, { error: "Error retrieving Assets" });
  }

};

function response(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body, null, 2),
  };
}

module.exports.handler = handler;
