const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
    const { study_hours } = req.body;

    if (study_hours === undefined) {
        return res.status(400).json({ error: "study_hours is required" });
    }

    const python = spawn("python", ["predict.py", study_hours]);

    let data = "";

    python.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });

    python.on("close", () => {
        try {
            const result = JSON.parse(data);
            res.json(result);
        } catch {
            res.status(500).json({ error: "Invalid JSON from Python" });
        }
    });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
