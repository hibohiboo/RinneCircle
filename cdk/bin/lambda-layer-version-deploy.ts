#!/usr/bin/env node
/* eslint-disable turbo/no-undeclared-env-vars */
import "source-map-support/register";
import * as dotenv from "dotenv";
import * as cdk from "aws-cdk-lib";
import { LambdaLayersStack } from "../lib/LambdaLayersStack";
import { bundleNpm } from "../lib/process/setup";

dotenv.config();
const envList = ["SSM_PARAM_KEY_LAYER_VERSIONS_ARN", "PROJECT_ID"] as const;
for (const key of envList) {
  if (!process.env[key]) throw new Error(`please add ${key} to .env`);
}
const processEnv = process.env as Record<(typeof envList)[number], string>;

bundleNpm();

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new LambdaLayersStack(app, `${processEnv.PROJECT_ID}-LambdaLayersStack`, {
  ssmKey: `${processEnv.SSM_PARAM_KEY_LAYER_VERSIONS_ARN}-${processEnv.PROJECT_ID}`,
  env,
});
