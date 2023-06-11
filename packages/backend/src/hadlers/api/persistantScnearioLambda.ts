import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getGraphQLClient } from "../../domain/graphql";
import { ScenarioInput, UpsertResponse } from "../../domain/scenario/types";
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
  const scenario = JSON.parse(event.body) as ScenarioInput;

  const graphqlClient = getGraphQLClient(
    processEnv.GRAPHQL_ENDPOINT,
    processEnv.GRAPHQL_SECRET,
  );
  const now = new Date();
  const updatedAt = format(now, "yyyy-MM-dd HH:mm:ss");
  const query = `mutation { 
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

  const res = await graphqlClient.executeQuery<UpsertResponse>(query);

  if (res.errors) {
    console.log(JSON.stringify(res));
    return {
      statusCode: 500,
      body: JSON.stringify(res),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ id: res.data?.upsertPostRinneScenario.id }),
  };
};
