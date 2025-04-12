import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Base directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(BASE_DIR)
MODEL_DIR = os.path.join(PROJECT_DIR, "models")
os.makedirs(MODEL_DIR, exist_ok=True)

# Dataset path
DATA_PATH = os.path.join(PROJECT_DIR, "uploads", "WA_Fn-UseC_-HR-Employee-Attrition(1).csv")
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"❌ CSV file not found at {DATA_PATH}")

# Load dataset
df = pd.read_csv(DATA_PATH)

# Fix target column name if needed
df.rename(columns={"Attrition": "Leaving"}, inplace=True)

# Drop unnecessary columns
drop_cols = ["EmployeeNumber", "EmployeeCount", "Over18", "StandardHours"]
df = df.drop(columns=drop_cols)

# Encode target column
df["Leaving"] = df["Leaving"].apply(lambda x: 1 if x == "Yes" else 0)

# Categorical columns to encode
categorical_cols = [
    "BusinessTravel", "Department", "EducationField", "Gender",
    "JobRole", "MaritalStatus", "OverTime"
]

# One-hot encode categorical columns
df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

# Split into features and target
X = df_encoded.drop(columns=["Leaving"])
y = df_encoded["Leaving"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the model
classifier = LogisticRegression()
classifier.fit(X_train_scaled, y_train)

# Save the model, scaler, and feature names
joblib.dump(classifier, os.path.join(MODEL_DIR, "logistic_regression_model.pkl"))
joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
joblib.dump(list(X.columns), os.path.join(MODEL_DIR, "feature_names.pkl"))

print("✅ Model, scaler, and feature names saved successfully!")
