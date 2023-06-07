import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getGraphQLClient } from "../../domain/graphql";
import { Scenario } from "../../domain/scenario/types";
import { format } from "date-fns";
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body)
    return {
      statusCode: 400,
      body: JSON.stringify("body is requrired"),
    };
  const envList = ["GRAPHQL_ENDPOINT", "GRAPHQL_SECRET"] as const;
  for (const key of envList) {
    if (!process.env[key]) throw new Error(`env ${key} is empty`);
  }
  const processEnv = process.env as Record<(typeof envList)[number], string>;
  const scenario = JSON.parse(event.body) as Scenario;

  const graphqlClient = getGraphQLClient(
    processEnv.GRAPHQL_ENDPOINT,
    processEnv.GRAPHQL_SECRET,
  );
  const now = new Date();
  const updatedAt = format(now, "yyyy-mm-dd HH:mm:ss");
  const query = `mutation  { 
    upsertPostRinneScenario: insert_RinneScenario_one(
      on_conflict: {constraint: RinneScenario_pkey, update_columns:[title,published,updatedAt]},
      object: { id: "${scenario.id}"
              , authorId: "${scenario.authorId}"
              , title: "${scenario.title}"
              , path: "${scenario.path}"
              , imageUrl: "${scenario.imageUrl}"
              , published: ${scenario.published}
              , updatedAt: "${updatedAt}"}
      ) { id }
    }`;

  const data = await graphqlClient.executeQuery(query);
  console.log(data);
  return {
    statusCode: 202,
    body: JSON.stringify(data),
  };
};
