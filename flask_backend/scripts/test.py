import requests

url = "http://127.0.0.1:5000/predict"
data = {"Age": 30, "EstimatedSalary": 60000}

response = requests.post(url, json=data)
print(response.json())
