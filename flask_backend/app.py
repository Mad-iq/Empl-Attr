import os
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

# Set paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

# Load trained model and scaler
classifier = joblib.load(os.path.join(MODEL_DIR, "logistic_regression_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
feature_names = joblib.load(os.path.join(MODEL_DIR, "feature_names.pkl"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Uploads directory
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        input_features = np.zeros(len(feature_names))

        # Assign values based on received JSON data
        for feature, value in data.items():
            if feature in feature_names:
                input_features[feature_names.index(feature)] = float(value)

        # Scale input data
        input_scaled = scaler.transform([input_features])

        # Predict probability of employee leaving
        risk_score = classifier.predict_proba(input_scaled)[0][1]
        prediction = "Yes" if risk_score > 0.5 else "No"

        return jsonify({'risk_score': round(risk_score, 4), 'employee_leaving': prediction})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
