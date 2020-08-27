"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");

const { VEHICLE_TABLE, IS_OFFLINE } = process.env;
const dynamoDb =
  IS_OFFLINE === "true"
    ? new AWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
      })
    : new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
  console.log("Is Offline?", IS_OFFLINE);
  console.log("Processing event", event);

  const body = JSON.parse(event.body);

  const { id, color, seats } = body;

  const tid = uuid.v4();
  const params = {
    TableName: VEHICLE_TABLE,
    Item: {
      tid,
      id,
      color,
      seats,
    },
  };

  const infleet = dynamoDb.put(params).promise();

  try {
    const data = await infleet;
    console.log("Success", data);
    return response(200, params.Item);
  } catch (error) {
    console.log("Error", error);
    return response(400, { error: "Error infleeting Asset" });
  }
};

function response(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body, null, 2),
  };
}

module.exports.handler = handler;
