#!/usr/bin/env node
/* eslint-disable turbo/no-undeclared-env-vars */
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv";
import { RinneCognitoStack } from "../lib/RinneCognitoStack";

dotenv.config();
const envList = [
  "PROJECT_ID",
  "TAG_PROJECT_NAME",
  "CALLBACK_URLS",
  "LOGOUT_URLS",
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

new RinneCognitoStack(app, `${processEnv.PROJECT_ID}-CognitoStack`, {
  projectNameTag: processEnv.TAG_PROJECT_NAME,
  domainPrefix: processEnv.PROJECT_ID,
  callbackUrls: processEnv.CALLBACK_URLS.split(","),
  logoutUrls: processEnv.LOGOUT_URLS.split(","),
  env,
});
