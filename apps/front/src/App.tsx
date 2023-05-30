import { RinneBuilderTop } from "@rinne-circle/components";
import { useEffect } from "react";
import { Auth } from "@aws-amplify/auth";
Auth.configure({
  region: import.meta.env.VITE_APP_AUTH_REGION,
  userPoolId: import.meta.env.VITE_APP_AUTH_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
  authenticationFlowType: "USER_SRP_AUTH",
});
function App() {
  useEffect(() => {
    const init = async () => {
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
