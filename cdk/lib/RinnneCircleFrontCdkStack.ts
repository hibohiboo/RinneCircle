import * as cdk from "aws-cdk-lib";
import { Fn } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  CachePolicy,
  FunctionCode,
  OriginAccessIdentity,
  Function,
  AllowedMethods,
  ViewerProtocolPolicy,
  CacheHeaderBehavior,
  Distribution,
  PriceClass,
  FunctionEventType,
  ResponseHeadersPolicy,
  HeadersFrameOption,
  HeadersReferrerPolicy,
  IDistribution,
} from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin, S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  CanonicalUserPrincipal,
  Effect,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import {
  ARecord,
  AaaaRecord,
  IHostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket, IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

type SubDirectoryPath = {
  builder: string;
};
interface Props extends cdk.StackProps {
  bucketName: string;
  identityName: string;
  defaultCachePolicyName: string;
  functionName: string;
  distributionName: string;
  rootDomain: string;
  deployDomain: string;
  projectNameTag: string;
  subDirectoryPath: SubDirectoryPath;
  zone: IHostedZone;
  cert: Certificate;
  ssmAPIGWUrlKey: string;
  apiVersion: string;
  xApiKey: string;
}
export class RinnneCircleFrontCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    // CloudFront オリジン用のS3バケットを作成
    const bucket = this.createS3(props.bucketName);

    // CloudFront で設定する オリジンアクセスアイデンティティ を作成
    const identity = this.createIdentity(bucket, props.identityName);

    // S3バケットポリシーで、CloudFrontのオリジンアクセスアイデンティティを許可
    this.createPolicy(bucket, identity);

    // CloudFrontディストリビューションを作成
    const distribution = this.createCloudFront(
      bucket,
      identity,
      props.cert,
      props,
    );
    // // 指定したディレクトリをデプロイ
    this.deployS3(
      bucket,
      distribution,
      "../apps/front/dist",
      props.bucketName,
      props.subDirectoryPath.builder,
    );

    // route53 の CloudFrontに紐づくレコード作成
    this.addRoute53Records(props.zone, props.deployDomain, distribution);

    // 確認用にCloudFrontのURLに整形して出力
    new cdk.CfnOutput(this, `${props.distributionName}-top-url`, {
      value: `https://${distribution.distributionDomainName}/${props.subDirectoryPath.builder}`,
    });

    cdk.Tags.of(this).add("Project", props.projectNameTag);
  }
  private createS3(bucketName: string) {
    const bucket = new Bucket(this, bucketName, {
      bucketName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      // デフォルト = accessControl: BucketAccessControl.PRIVATE,
    });
    return bucket;
  }

  private createIdentity(bucket: Bucket, identityName: string) {
    const identity = new OriginAccessIdentity(this, identityName, {
      comment: `${bucket.bucketName} access identity`,
    });
    return identity;
  }
  private createPolicy(bucket: Bucket, identity: OriginAccessIdentity) {
    const myBucketPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject", "s3:ListBucket"],
      principals: [
        new CanonicalUserPrincipal(
          identity.cloudFrontOriginAccessIdentityS3CanonicalUserId,
        ),
      ],
      resources: [bucket.bucketArn + "/*", bucket.bucketArn],
    });
    bucket.addToResourcePolicy(myBucketPolicy);
  }
  private createCloudFront(
    bucket: Bucket,
    identity: OriginAccessIdentity,
    cert: Certificate,
    props: Props,
  ) {
    const { defaultCachePolicyName, distributionName, deployDomain } = props;
    const defaultPolicyOption = {
      cachePolicyName: defaultCachePolicyName,
      comment: "輪廻サークルポリシー",
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    };
    const myCachePolicy = new CachePolicy(
      this,
      defaultCachePolicyName,
      defaultPolicyOption,
    );

    const origin = new S3Origin(bucket, {
      originAccessIdentity: identity,
    });
    const spaRoutingFunction = new Function(this, "SpaRoutingFunction", {
      functionName: `rinne-circle-SpaRoutingFunction`,
      // 拡張子が含まれないURLはSPAファイルにリダイレクト
      code: FunctionCode.fromInline(`
      function handler(event) {
        var request = event.request;
        if(request.uri.includes('.')){
          return request;
        }
        if (request.uri.startsWith('/${props.subDirectoryPath.builder}')) {
          request.uri = '/${props.subDirectoryPath.builder}/index.html';
        } else {
          request.uri = '/rinne-circle/index.html';
        } 
        return request;
      }
      `),
    });
    cdk.Tags.of(spaRoutingFunction).add("Service", "Cloud Front Function");

    const responseHeadersPolicy = this.createResponseHeadersPolicy();
    const restApiUrl = StringParameter.valueForStringParameter(
      this,
      props.ssmAPIGWUrlKey,
    );
    const apiEndPointUrlWithoutProtocol = Fn.select(
      1,
      Fn.split("://", restApiUrl),
    );
    const apiEndPointDomainName = Fn.select(
      0,
      Fn.split("/", apiEndPointUrlWithoutProtocol),
    );
    const additionalBehaviors = {
      [`${props.apiVersion}/*`]: {
        origin: new HttpOrigin(apiEndPointDomainName, {
          customHeaders: { "x-api-key": props.xApiKey },
        }),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: new CachePolicy(
          this,
          `${distributionName}-rest-api-cache-policy`,
          {
            cachePolicyName: `${distributionName}-rest-api-cache-policy`,
            comment: "CloudFront + ApiGateway用ポリシー",
            headerBehavior: CacheHeaderBehavior.allowList(
              "x-api-key",
              "content-type",
            ),
          },
        ),
      },
      "data/*": {
        origin,
        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: new CachePolicy(
          this,
          `${distributionName}-data-cache-policy`,
          {
            cachePolicyName: `${distributionName}-data-cache-cache-policy`,
            comment: "CloudFront データ部用ポリシー",
            defaultTtl: cdk.Duration.seconds(0),
            maxTtl: cdk.Duration.seconds(10),
            headerBehavior: CacheHeaderBehavior.allowList("content-type"),
          },
        ),
      },
    };

    const distribution = new Distribution(this, distributionName, {
      comment: "RinneCircle",
      defaultRootObject: "/index.html",
      priceClass: PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        origin,
        cachePolicy: myCachePolicy,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        responseHeadersPolicy,
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: spaRoutingFunction,
          },
        ],
      },
      additionalBehaviors,
      certificate: cert,
      domainNames: [deployDomain],
    });
    cdk.Tags.of(distribution).add("Service", "Cloud Front");

    return distribution;
  }

  private createResponseHeadersPolicy() {
    const responseHeadersPolicy = new ResponseHeadersPolicy(
      this,
      "ResponseHeadersPolicy",
      {
        securityHeadersBehavior: {
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: HeadersFrameOption.DENY,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy: HeadersReferrerPolicy.SAME_ORIGIN,
            override: true,
          },
          strictTransportSecurity: {
            accessControlMaxAge: cdk.Duration.seconds(63072000),
            includeSubdomains: true,
            preload: true,
            override: true,
          },
          xssProtection: {
            protection: true,
            modeBlock: true,
            override: true,
          },
        },
        customHeadersBehavior: {
          customHeaders: [
            {
              header: "Cache-Control",
              value: "no-cache",
              override: true,
            },
            {
              header: "pragma",
              value: "no-cache",
              override: true,
            },
            {
              header: "server",
              value: "",
              override: true,
            },
          ],
        },
      },
    );
    return responseHeadersPolicy;
  }

  private addRoute53Records(
    zone: IHostedZone,
    deployDomain: string,
    cf: Distribution,
  ) {
    const propsForRoute53Records = {
      zone,
      recordName: deployDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(cf)),
    };
    new ARecord(this, "ARecord", propsForRoute53Records);
    new AaaaRecord(this, "AaaaRecord", propsForRoute53Records);
  }
  private deployS3(
    siteBucket: IBucket,
    distribution: IDistribution,
    sourcePath: string,
    bucketName: string,
    basepath: string,
  ) {
    new BucketDeployment(this, `${bucketName}-deploy-with-invalidation`, {
      sources: [Source.asset(sourcePath)],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: [`/${basepath}/*`],
      destinationKeyPrefix: basepath,
    });
  }
}
