import { v4 as uuid } from "uuid";
import { document  } from "src/utils/dynamodbClient";

type TCreateToDO = {
	title: string;
	done: boolean;
	deadline: Date;
};

export const handle = async (event) => {
  const { title, done, deadline } = JSON.parse(event.body) as TCreateToDO;

  const id = uuid();
  const { user_id } = event.pathParameters;
  
  await document.put({
    TableName: "users_todos",
    Item: {
      id, 
      user_id,
      title, 
      done, 
      deadline
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "ToDo created",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
}
