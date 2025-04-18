import os
"""
This Flask application serves as a backend for predicting employee attrition risk.
It uses a pre-trained logistic regression model to predict the likelihood of an employee leaving
based on various input features. The application provides endpoints for rendering a home page
and for making predictions.

Modules:
- os: Provides functions for interacting with the operating system.
- joblib: Used for loading pre-trained models and other serialized objects.
- numpy: Used for numerical operations.
- pandas: Used for data manipulation and analysis.
- flask: Provides the web framework for building the application.
- flask_cors: Enables Cross-Origin Resource Sharing (CORS) for the application.
- random: Used for generating random default values for input features.

Functions:
- get_random_defaults(): Generates random default values for employee attributes.

Routes:
- `/`: Renders the home page (index.html).
- `/predict`: Accepts POST requests with JSON data, processes the input, and returns a prediction
    of whether the employee is likely to leave or not.

Global Variables:
- BASE_DIR: The base directory of the application.
- MODEL_DIR: The directory where the pre-trained models are stored.
- classifier: The pre-trained logistic regression model loaded using joblib.
- scaler: The scaler object used for feature scaling, loaded using joblib.
- feature_names: The list of feature names expected by the model, loaded using joblib.

Usage:
1. Start the Flask application by running the script.
2. Access the home page at `http://localhost:5000/`.
3. Send a POST request to `/predict` with JSON data containing employee attributes to get a prediction.

Error Handling:
- If an exception occurs during the prediction process, the `/predict` endpoint returns a JSON
    response with an error message.

Note:
- The `get_random_defaults()` function is used to generate random default values for missing input
    fields. This can be replaced with static default values by commenting out the function call and
    uncommenting the static `default_values` dictionary.
"""
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

import random

#function to generate random values for the default values
def get_random_defaults():
    return {
        "Age": random.randint(20, 60),
        "DailyRate": random.randint(200, 1500),
        "DistanceFromHome": random.randint(1, 30),
        "Education": random.choice([1, 2, 3, 4, 5]),
        "EnvironmentSatisfaction": random.choice([1, 2, 3, 4]),
        "HourlyRate": random.randint(30, 100),
        "JobInvolvement": random.choice([1, 2, 3, 4]),
        "JobLevel": random.randint(1, 5),
        "JobSatisfaction": random.choice([1, 2, 3, 4]),
        "MonthlyIncome": random.randint(1000, 20000),
        "MonthlyRate": random.randint(10000, 30000),
        "NumCompaniesWorked": random.randint(0, 10),
        "OverTime": random.choice(["Yes", "No"]),
        "PercentSalaryHike": random.randint(10, 25),
        "PerformanceRating": random.choice([1, 2, 3, 4]),
        "RelationshipSatisfaction": random.choice([1, 2, 3, 4]),
        "StockOptionLevel": random.randint(0, 3),
        "TotalWorkingYears": random.randint(0, 40),
        "TrainingTimesLastYear": random.randint(0, 6),
        "WorkLifeBalance": random.choice([1, 2, 3, 4]),
        "YearsAtCompany": random.randint(0, 40),
        "YearsInCurrentRole": random.randint(0, 20),
        "YearsSinceLastPromotion": random.randint(0, 15),
        "YearsWithCurrManager": random.randint(0, 20),
        "BusinessTravel": random.choice(["Non-Travel", "Travel_Rarely", "Travel_Frequently"]),
        "Department": random.choice(["Research & Development", "Sales", "Human Resources"]),
        "EducationField": random.choice(["Life Sciences", "Medical", "Marketing", "Technical Degree", "Human Resources", "Other"]),
        "Gender": random.choice(["Male", "Female"]),
        "JobRole": random.choice([
            "Sales Executive", "Research Scientist", "Laboratory Technician",
            "Manufacturing Director", "Healthcare Representative", "Manager",
            "Sales Representative", "Research Director", "Human Resources"
        ]),
        "MaritalStatus": random.choice(["Single", "Married", "Divorced"]),
    }

# # Default fallback values
# default_values = {
#     "Age": 30,
#     "BusinessTravel": "Travel_Rarely",
#     "DailyRate": 800,
#     "DistanceFromHome": 5,
#     "Department": "Research & Development",
#     "Education": 3,
#     "EducationField": "Life Sciences",
#     "EnvironmentSatisfaction": 3,
#     "Gender": "Male",
#     "HourlyRate": 60,
#     "JobInvolvement": 3,
#     "JobLevel": 2,
#     "JobRole": "Sales Executive",
#     # "JobSatisfaction": 3,
#     "JobSatisfaction": 1,
#     "MaritalStatus": "Single",
#     "MonthlyIncome": 5000,
#     "MonthlyRate": 20000,
#     "NumCompaniesWorked": 2,
#     # "OverTime": "No",
#     "OverTime": "Yes",
#     "PercentSalaryHike": 12,
#     "PerformanceRating": 3,
#     "RelationshipSatisfaction": 3,
#     "StockOptionLevel": 1,
#     # "TotalWorkingYears": 5,
#     "TotalWorkingYears": 1,
#     "TrainingTimesLastYear": 2,
#     "WorkLifeBalance": 2,
#     "YearsAtCompany": 3,
#     "YearsInCurrentRole": 2,
#     # "YearsSinceLastPromotion": 1,
#     "YearsSinceLastPromotion": 5,
#     "YearsWithCurrManager": 2,
# }

# Setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

classifier = joblib.load(os.path.join(MODEL_DIR, "logistic_regression_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
feature_names = joblib.load(os.path.join(MODEL_DIR, "feature_names.pkl"))

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        default_values = get_random_defaults() # Generate random default values, comment to use static ones
        combined_data = default_values.copy()
        combined_data.update(data)

        # Only use relevant fields for prediction
        prediction_fields = list(default_values.keys())
        cleaned_data = {k: combined_data[k] for k in prediction_fields}

        # Create DataFrame
        df_input = pd.DataFrame([cleaned_data])

        # One-hot encode categorical features
        categorical_cols = [
            "BusinessTravel", "Department", "EducationField", "Gender",
            "JobRole", "MaritalStatus", "OverTime"
        ]
        df_encoded = pd.get_dummies(df_input, columns=categorical_cols)

        # Ensure the input aligns with the trained model's features
        input_features = []
        for col in feature_names:
            if col in df_encoded.columns:
                input_features.append(float(df_encoded[col].values[0]))
            else:
                input_features.append(0.0)

        print("📊 Encoded Columns:", list(df_encoded.columns))
        print("📥 Final Input Before Scaling:", input_features)

        # Scale input
        input_scaled = scaler.transform([input_features])
        print("📈 Final Scaled Input:", input_scaled[0])

        # Predict
        risk_score = classifier.predict_proba(input_scaled)[0][1]
        prediction = "Yes" if risk_score > 0.5 else "No"

        return jsonify({
            'risk_score': round(risk_score, 4),
            'employee_leaving': prediction
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
