import os
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

# Default values for features
default_values = {
    "Age": 30,
    "BusinessTravel": "Travel_Rarely",
    "DailyRate": 800,
    "DistanceFromHome": 5,
    "Education": 3,
    "EducationField": "Life Sciences",
    "EnvironmentSatisfaction": 3,
    "Gender": "Male",
    "HourlyRate": 60,
    "JobInvolvement": 3,
    "JobLevel": 2,
    "JobRole": "Sales Executive",
    "JobSatisfaction": 3,
    "MaritalStatus": "Single",
    "MonthlyIncome": 5000,
    "MonthlyRate": 20000,
    "NumCompaniesWorked": 2,
    "OverTime": "No",
    "PercentSalaryHike": 12,
    "PerformanceRating": 3,
    "RelationshipSatisfaction": 3,
    "StockOptionLevel": 1,
    "TotalWorkingYears": 5,
    "TrainingTimesLastYear": 2,
    "WorkLifeBalance": 2,
    "YearsAtCompany": 3,
    "YearsInCurrentRole": 2,
    "YearsSinceLastPromotion": 1,
    "YearsWithCurrManager": 2
}

# Set paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

# Load trained model and preprocessing objects
classifier = joblib.load(os.path.join(MODEL_DIR, "logistic_regression_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
feature_names = joblib.load(os.path.join(MODEL_DIR, "feature_names.pkl"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()

        # Combine user input with defaults
        data = default_values.copy()
        data.update(input_data)

        # Create a single-row DataFrame
        df_input = pd.DataFrame([data])

        # One-hot encode the input to match training format
        df_encoded = pd.get_dummies(df_input)

        # Add missing columns from training time (ensure same structure)
        for col in feature_names:
            if col not in df_encoded.columns:
                df_encoded[col] = 0  # Add missing dummy columns as 0

        # Reorder columns to match the training feature order
        df_encoded = df_encoded[feature_names]

        # Scale input data
        input_scaled = scaler.transform(df_encoded)

        # Predict attrition risk
        risk_score = classifier.predict_proba(input_scaled)[0][1]
        prediction = "Yes" if risk_score > 0.5 else "No"

        print("Final Input for Prediction:", df_encoded.iloc[0].to_dict())

        return jsonify({
            'risk_score': round(risk_score, 4),
            'employee_leaving': prediction
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
