import { useState } from "react";

function App() {
  const [hours, setHours] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const predict = async () => {
    setResult("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ study_hours: hours })
      });

      const data = await res.json();

      if (data.error) setError(data.error);
      else setResult("Predicted Score: " + data.predicted_score);
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Student Performance Predictor</h2>

      <input
        type="number"
        placeholder="Enter study hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <br /><br />

      <button onClick={predict}>Predict</button>

      <p>{result}</p>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}

export default App;
