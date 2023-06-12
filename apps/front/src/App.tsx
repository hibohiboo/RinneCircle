import { RinneBuilderTop } from "@rinne-circle/components";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import type { Auth } from "firebase/auth";
import type { ReportCallback } from "web-vitals";
import { useEffect } from "react";
import reportWebVitals from "./reportWebVitals";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APP_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_APP_FIREBASE_PROJECT_ID}`,
  appId: `${import.meta.env.VITE_APP_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let auth: Auth | null = null;
const getFirebaseAuth = () => {
  if (auth) return auth;
  auth = getAuth(app);
  return auth;
};
const sendToGoogleAnalytics: ReportCallback = ({ name, delta, id }) => {
  logEvent(analytics, "web_vitals", {
    eventCategory: "Web Vitals",
    eventAction: name,
    eventLabel: id,
    eventValue: Math.round(name === "CLS" ? delta * 1000 : delta),
    nonInteraction: true,
    transport: "beacon",
  });
};

// 開発環境ではログに。本番環境ではグーグル アナリティクスに出力。
const isDevevelopServe = import.meta.env.MODE === "development"; // import.meta.env.DEV

const reportTo = isDevevelopServe ? console.log : sendToGoogleAnalytics;

reportWebVitals(reportTo);
const init = async () => {
  const auth = getFirebaseAuth();
  const response = await signInAnonymously(auth);
  console.log(response);
  console.log("user", response.user);
  console.log("uid", response.user.uid);
};
void init();
function App() {
  useEffect(() => {}, []);
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
    </div>
  );
}

export default App;
