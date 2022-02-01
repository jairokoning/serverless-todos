import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  
  if (!user_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
      message: "Usuário não encontrado"
    })
    }
  }

  const response = await document.query({
    TableName: "users_todos",
    KeyConditionExpression: "user_id = :user_id",
    IndexName: "userid_index",
    ExpressionAttributeValues: {
      
      ":user_id": user_id,
    }
  }).promise();

  const userTodos = response.Items;

  if (userTodos.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ userTodos })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Este usuário não possui ToDos"
    })
  }
}