import * as core from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";
import { LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

interface Props extends core.StackProps {
  projectId: string;
  ssmLambdaLayerKey: string;
  ssmAPIGWUrlKey: string;
  apiVersion: string;
  graphqlEndpoint: string;
  graphqlSecret: string;
}
export class RineCircleRESTAPIStack extends core.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    // APIGateway作成
    const restApi = this.createRestAPIGateway(props);

    const apiRoot = restApi.root.addResource("api");

    // シナリオ永続化
    const persistantScnearioLambda = this.createLambda({
      entry: `../packages/backend/src/hadlers/api/persistantScnearioLambda.ts`,
      name: "persistantScnearioLambda",
      descritption: "輪廻サークルのシナリオをRDSに永続化",
      ssmKeyForLambdaLayerArn: props.ssmLambdaLayerKey,
      environment: {
        GRAPHQL_ENDPOINT: props.graphqlEndpoint,
        GRAPHQL_SECRET: props.graphqlSecret,
      },
      timeoutSec: 30, // 外部エンドポイントを経由してJSONを処理するため3秒では足りない
    });
    apiRoot
      .addResource("scenario")
      .addMethod(
        "PUT",
        new apigateway.LambdaIntegration(persistantScnearioLambda),
      );
  }
  private createRestAPIGateway(props: Props) {
    const restApiName = `${props.projectId}-rest-api`;
    0;
    const restApi = new apigateway.RestApi(this, restApiName, {
      description: "輪廻サークルバックエンドRESTAPI",
      restApiName,
      endpointTypes: [apigateway.EndpointType.REGIONAL],
      deployOptions: {
        stageName: props.apiVersion,
      },
    });
    this.createUsagePlan(restApi, restApiName);

    // APIGatewayのURLをSSMに保存
    const layerArnParameter = new StringParameter(this, "ssm-layer-version", {
      parameterName: props.ssmAPIGWUrlKey,
      stringValue: restApi.url,
      description: "api gateway url for cloudfront",
    });
    core.Tags.of(layerArnParameter).add("Name", "ssm-layer-version");
    new core.CfnOutput(this, "APIGatewayURL", {
      value: `${restApi.domainName}`,
    });

    return restApi;
  }

  private createUsagePlan(restApi: apigateway.RestApi, apiName: string) {
    // apiKeyを設定
    const apiKey = restApi.addApiKey("defaultKeys");
    const usagePlan = restApi.addUsagePlan(`${apiName}-usage-plan`, {
      quota: { limit: 2000, period: apigateway.Period.DAY },
      throttle: { burstLimit: 2, rateLimit: 1 },
    });
    usagePlan.addApiKey(apiKey);
    usagePlan.addApiStage({ stage: restApi.deploymentStage });
    // ------------------------------------------------------------
    // APIキーのIDを出力
    new core.CfnOutput(this, "APIKey", {
      value: apiKey.keyId,
    });
  }
  private createLambda(props: {
    name: string;
    descritption: string;
    entry: string;
    ssmKeyForLambdaLayerArn: string;
    environment?: Record<string, string>;
    initialPolicy?: iam.PolicyStatement[];
    timeoutSec?: number;
  }) {
    const bundling = {
      externalModules: [
        "aws-sdk", // Use the 'aws-sdk' available in the Lambda runtime
        "date-fns", // Layrerに入れておきたいモジュール
      ],
    };
    const lambdaLayerArn = StringParameter.valueForStringParameter(
      this,
      props.ssmKeyForLambdaLayerArn,
    );
    const layers = [
      LayerVersion.fromLayerVersionArn(
        this,
        "node_modules-layer",
        lambdaLayerArn,
      ),
    ];
    const func = new NodejsFunction(this, props.name, {
      runtime: Runtime.NODEJS_18_X,
      entry: props.entry,
      functionName: props.name,
      description: props.descritption,
      layers,
      bundling: bundling,
      environment: props.environment,
      initialPolicy: props.initialPolicy,
      timeout: props.timeoutSec
        ? core.Duration.seconds(props.timeoutSec)
        : undefined,
    });
    core.Tags.of(func).add("Name", props.name);
    return func;
  }
}
