import * as cognito from "aws-cdk-lib/aws-cognito";

import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
  Tags,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  IdentityPool,
  UserPoolAuthenticationProvider,
} from "@aws-cdk/aws-cognito-identitypool-alpha";

interface Props extends StackProps {
  projectNameTag: string;
  domainPrefix: string;
  callbackUrls: string[];
  logoutUrls: string[];
}
export class RinneCognitoStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(
      this,
      `${props.projectNameTag}-userPool`,
      {
        selfSignUpEnabled: false,
        standardAttributes: {
          // mutable falseにすると、サインイン方法はユーザープール作成時にのみ設定でき後から変更することが出来ない https://qiita.com/shinnoki/items/aa1424128b1cc9b05dac
          email: { required: true, mutable: true },
          phoneNumber: { required: false },
        },
        signInCaseSensitive: true,
        autoVerify: { email: true },
        signInAliases: { email: true },
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    );
    userPool.addDomain(`${props.projectNameTag}-userPool-domain`, {
      cognitoDomain: { domainPrefix: props.domainPrefix },
    });
    const userPoolClient = userPool.addClient("client", {
      oAuth: {
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: props.callbackUrls,
        logoutUrls: props.logoutUrls,
        flows: { authorizationCodeGrant: true },
      },
      // amazon-cognito-identity-jsではクライアントシークレットをサポートしないので false に設定
      // https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js#configuration
      generateSecret: false,
      idTokenValidity: Duration.minutes(5),
    });
    const identityPool = new IdentityPool(
      this,
      `${props.projectNameTag}-IdentityPool`,
      {
        allowUnauthenticatedIdentities: true,
        authenticationProviders: {
          userPools: [
            new UserPoolAuthenticationProvider({
              userPool: userPool,
              userPoolClient: userPoolClient,
            }),
          ],
        },
      },
    );
    new CfnOutput(this, "UserPoolId", { value: userPool.userPoolId });
    new CfnOutput(this, "OutputClientId", {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "IdentityPoolId", {
      value: identityPool.identityPoolId,
    });
    Tags.of(this).add("Project", props.projectNameTag);
  }
}
