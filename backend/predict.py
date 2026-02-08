import sys
import json
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib
import os

MODEL_FILE = "model.pkl"

# Train model if not exists
if not os.path.exists(MODEL_FILE):
    X = np.array([[1],[2],[3],[4],[5],[6],[7]])
    y = np.array([35,40,50,60,70,80,90])

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, MODEL_FILE)

# Load model
model = joblib.load(MODEL_FILE)

# Read input
try:
    hours = float(sys.argv[1])
except:
    print(json.dumps({"error": "Invalid or missing input"}))
    sys.exit(1)

# Predict
prediction = model.predict([[hours]])[0]

# Output JSON
print(json.dumps({
    "study_hours": hours,
    "predicted_score": round(prediction, 2)
}))
