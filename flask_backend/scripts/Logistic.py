import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Get base directory (scripts folder)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(BASE_DIR)  # Go one level up
MODEL_DIR = os.path.join(PROJECT_DIR, "models")  
os.makedirs(MODEL_DIR, exist_ok=True)

# Corrected file path
DATA_PATH = os.path.join(PROJECT_DIR, "uploads", "WA_Fn-UseC_-HR-Employee-Attrition(1).csv")

# Check if file exists
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"❌ CSV file not found at {DATA_PATH}")

df = pd.read_csv(DATA_PATH)

# Define features and target variable
X = df.drop(columns=["Leaving"])  # Ensure "Leaving" is the correct column name
y = df["Leaving"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Logistic Regression model
classifier = LogisticRegression()
classifier.fit(X_train_scaled, y_train)

# Save trained model, scaler, and feature names
joblib.dump(classifier, os.path.join(MODEL_DIR, "logistic_regression_model.pkl"))
joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
joblib.dump(list(X.columns), os.path.join(MODEL_DIR, "feature_names.pkl"))

print("✅ Model, scaler, and feature names saved successfully!")
