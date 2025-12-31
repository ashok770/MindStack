import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from "./firebase";

function App() {
  const testFirebase = async () => {
    try {
      const auth = getAuth(app);
      const result = await signInAnonymously(auth);
      console.log("Firebase connected! User ID:", result.user.uid);
      alert("Firebase is connected successfully!");
    } catch (error) {
      console.error("Firebase connection error:", error);
      alert("Firebase connection failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Firebase Connection Test</h1>
      <button onClick={testFirebase}>Test Firebase Connection</button>
    </div>
  );
}

export default App;
