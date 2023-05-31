import { RinneBuilderTop } from "@rinne-circle/components";
import { useEffect } from "react";
import { Auth } from "@aws-amplify/auth";
import {
  CognitoIdentityClient,
  GetIdCommand,
} from "@aws-sdk/client-cognito-identity";
const region = import.meta.env.VITE_APP_AUTH_REGION;
Auth.configure({
  region,
  userPoolId: import.meta.env.VITE_APP_AUTH_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
  authenticationFlowType: "USER_SRP_AUTH",
});
const cognitoClient = new CognitoIdentityClient({ region: region });
function App() {
  useEffect(() => {
    const init = async () => {
      const res = await cognitoClient.send(
        new GetIdCommand({
          IdentityPoolId: import.meta.env.VITE_APP_COGNITO_IDENTITYPOOLID,
        }),
      );
      console.log(res);
      try {
        const result = await Auth.currentAuthenticatedUser();
        console.log("auth", result);
      } catch (e) {
        console.log(e);
        try {
          const credentials = await Auth.currentCredentials();
          console.log("credentials", credentials);
        } catch (e) {
          console.log("credential error", e);
        }
      }
    };
    void init();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
      }}
    >
      <RinneBuilderTop />
      <a href="https://github.com/hibohiboo/RinneCircle">♾</a>
    </div>
  );
}

export default App;
