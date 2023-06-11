import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getGraphQLClient } from "../../domain/graphql";
import { Scenario } from "../../domain/scenario/types";
import { utcToJstWithResponseFormat } from "@/domain/response/date";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const envList = ["GRAPHQL_ENDPOINT", "GRAPHQL_SECRET"] as const;
  for (const key of envList) {
    if (!process.env[key]) throw new Error(`env ${key} is empty`);
  }
  const processEnv = process.env as Record<(typeof envList)[number], string>;
  const id = event.queryStringParameters?.id;
  if (!id) {
    console.log(event.queryStringParameters);
    return {
      statusCode: 400,
      body: JSON.stringify([]),
    };
  }

  const graphqlClient = getGraphQLClient(
    processEnv.GRAPHQL_ENDPOINT,
    processEnv.GRAPHQL_SECRET,
  );

  const query = `query { 
      RinneScenario(where: { id: { _eq: "${id}" } }) {
        id
        authorId
        title
        path
        imageUrl
        published
        createdAt
        updatedAt
      }
    }`;

  const response = await graphqlClient.executeQuery<{
    RinneScenario: Scenario[];
  }>(query);

  if (response.errors) {
    console.error(JSON.stringify(response));
    return {
      statusCode: 500,
      body: JSON.stringify(response),
    };
  }
  const data = response.data;
  if (!data) {
    console.log("response is empty", JSON.stringify(response.data));
    return {
      statusCode: 200,
      body: JSON.stringify([]),
    };
  }
  console.log("data", data);
  const scenarios = data.RinneScenario.map((d) => ({
    ...d,
    createdAt: utcToJstWithResponseFormat(d.createdAt),
    updatedAt: utcToJstWithResponseFormat(d.updatedAt),
  }));
  return {
    statusCode: 200,
    body: JSON.stringify(scenarios),
  };
};
