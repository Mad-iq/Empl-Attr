# flask_backend/scripts/Logistic.py

import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Base setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(BASE_DIR)
MODEL_DIR = os.path.join(PROJECT_DIR, "models")
os.makedirs(MODEL_DIR, exist_ok=True)

# Load dataset
DATA_PATH = os.path.join(PROJECT_DIR, "uploads", "WA_Fn-UseC_-HR-Employee-Attrition(1).csv")
df = pd.read_csv(DATA_PATH)

# Drop irrelevant columns
df.drop(columns=["EmployeeNumber", "EmployeeCount", "Over18", "StandardHours"], inplace=True)

# Encode Target column
df["Attrition"] = df["Attrition"].map({"Yes": 1, "No": 0})

# Encode categorical variables (retain all dummies)
categorical_cols = [
    "BusinessTravel", "Department", "EducationField", "Gender",
    "JobRole", "MaritalStatus", "OverTime"
]
df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=False)

# Split features and target
X = df_encoded.drop(columns=["Attrition"])
y = df_encoded["Attrition"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Train logistic regression
model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, y_train)

# Save
joblib.dump(model, os.path.join(MODEL_DIR, "logistic_regression_model.pkl"))
joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
joblib.dump(list(X.columns), os.path.join(MODEL_DIR, "feature_names.pkl"))

print("✅ Logistic model, scaler, and feature names saved successfully!")
