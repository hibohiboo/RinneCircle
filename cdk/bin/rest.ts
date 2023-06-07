#!/usr/bin/env node
/* eslint-disable turbo/no-undeclared-env-vars */
import "source-map-support/register";
import * as dotenv from "dotenv";
import * as cdk from "aws-cdk-lib";
import { RineCircleRESTAPIStack } from "../lib/RinneRestStack";

dotenv.config();
const envList = [
  "PROJECT_ID",
  "SSM_PARAM_KEY_LAYER_VERSIONS_ARN",
  "HASURA_GRAPHQL_ENDPOINT",
  "HASURA_GRAPHQL_SECRET",
] as const;
for (const key of envList) {
  if (!process.env[key]) throw new Error(`please add ${key} to .env`);
}
const processEnv = process.env as Record<(typeof envList)[number], string>;

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new RineCircleRESTAPIStack(
  app,
  `${processEnv.PROJECT_ID}-RineCircleRESTAPIStack`,
  {
    ssmKey: `${processEnv.SSM_PARAM_KEY_LAYER_VERSIONS_ARN}-${processEnv.PROJECT_ID}`,
    env,
    graphqlEndpoint: processEnv.HASURA_GRAPHQL_ENDPOINT,
    graphqlSecret: processEnv.HASURA_GRAPHQL_SECRET,
    projectId: processEnv.PROJECT_ID,
  },
);
