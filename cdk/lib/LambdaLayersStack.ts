import { Aspects, Stack, StackProps, Tag, Tags } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { NODE_LAMBDA_LAYER_DIR } from "./process/setup";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

interface LambdaLayersStackProps extends StackProps {
  ssmKey: string;
}

export class LambdaLayersStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaLayersStackProps) {
    super(scope, id, props);
    const nodeModulesLayer = new lambda.LayerVersion(this, "NodeModulesLayer", {
      code: lambda.AssetCode.fromAsset(NODE_LAMBDA_LAYER_DIR),
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
    });

    // Lambda Layer参照用にarnを保存
    const layerArnParameter = new StringParameter(this, "ssm-layer-version", {
      parameterName: props.ssmKey,
      stringValue: nodeModulesLayer.layerVersionArn,
      description: "layer version arn for lambda",
    });
    Tags.of(layerArnParameter).add("Name", "ssm-layer-version");

    Aspects.of(this).add(new Tag("Stack", id));
  }
}
