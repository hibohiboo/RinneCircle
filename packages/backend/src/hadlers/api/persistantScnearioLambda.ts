import { APIGatewayProxyHandlerV2 } from "aws-lambda";
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 202,
    body: JSON.stringify({}),
  };
};
