import pandas as pd

# Load the re-uploaded dataset
df = pd.read_csv("../uploads/WA_Fn-UseC_-HR-Employee-Attrition(1).csv")

# Get unique values from each column
unique_values = {col: df[col].unique().tolist() for col in df.columns}

# Display unique values summary (showing first few values if the list is long)
unique_summary = {col: values if len(values) <= 10 else values[:10] + ["..."] for col, values in unique_values.items()}
print(unique_summary)
