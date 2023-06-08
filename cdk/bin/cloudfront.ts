#!/usr/bin/env node
/* eslint-disable turbo/no-undeclared-env-vars */
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv";
import { RinnneCircleFrontCdkStack } from "../lib/RinnneCircleFrontCdkStack";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

dotenv.config();
const envList = [
  "PROJECT_ID",
  "ROOT_DOMAIN",
  "DEPLOY_DOMAIN",
  "TAG_PROJECT_NAME",
  "BUCKET_NAME",
  "SUB_DIR_PATH_BUILDER",
  "SSM_PARAM_KEY_API_URL",
  "REST_API_VERSION",
  "REST_API_X_API_KEY",
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
const domainName = processEnv.ROOT_DOMAIN;

// 証明書はus-east-1リージョンで作成する必要がある
const usStack = new cdk.Stack(app, `${processEnv.PROJECT_ID}-FrontCdkUsStack`, {
  env: { ...env, region: "us-east-1" },
  crossRegionReferences: true,
});

const zone = HostedZone.fromLookup(usStack, `${domainName}-hosted-zone`, {
  domainName: processEnv.ROOT_DOMAIN,
});
const cert = new Certificate(usStack, `${domainName}-certificate`, {
  domainName: processEnv.DEPLOY_DOMAIN,
  validation: CertificateValidation.fromDns(zone),
});
new RinnneCircleFrontCdkStack(app, `${processEnv.PROJECT_ID}-FrontCdkStack`, {
  bucketName: processEnv.BUCKET_NAME,
  identityName: `${processEnv.PROJECT_ID}-origin-access-identity-to-s3-bucket`,
  defaultCachePolicyName: `${processEnv.PROJECT_ID}-cache-policy-default`,
  functionName: `${processEnv.PROJECT_ID}-lambda-edge-ogp`,
  distributionName: `${processEnv.PROJECT_ID}-distribution-cloudfront`,
  rootDomain: processEnv.ROOT_DOMAIN,
  deployDomain: processEnv.DEPLOY_DOMAIN,
  projectNameTag: processEnv.TAG_PROJECT_NAME,
  subDirectoryPath: {
    builder: processEnv.SUB_DIR_PATH_BUILDER,
  },
  env,
  crossRegionReferences: true,
  zone,
  cert,
  ssmAPIGWUrlKey: `${processEnv.SSM_PARAM_KEY_API_URL}-${processEnv.PROJECT_ID}`,
  apiVersion: processEnv.REST_API_VERSION,
  xApiKey: processEnv.REST_API_X_API_KEY,
});