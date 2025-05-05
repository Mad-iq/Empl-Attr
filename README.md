# 🧑‍💼 Employee Management & Attrition Platform

A modern, full-stack platform designed to **manage employee data**, streamline **HR operations**, and leverage **AI/ML models** for **employee attrition prediction**. Built with scalability, real-time performance, and user-centric design in mind.

---

## 🚀 Features

### 🧩 Core Functionalities
- 👥 Employee CRUD (Create, Read, Update, Delete)
- 🔐 Authentication (Login/Signup using Supabase)
- 📊 Employee Directory with Filters
- 📝 Role-Based Access Control (Admin/User)
- 📥 Add/Edit/Delete Employee Forms
- 🌐 Fully Responsive UI

### 🧠 ML & Analytics
- 📉 Attrition Prediction using employee attributes (age, salary, job satisfaction, etc.)
- 📈 HR Dashboard with visual insights
- ⚠️ Attrition Risk Flagging (High/Moderate/Low)
- ⏰ Future: Workload-Stress Forecasting (AI Model)

---

## 🖼️ UI/UX & Design Language

A clean and professional **enterprise-grade layout** using **soft gradients**, **material design components**, and **minimalist form inputs** — optimized for both desktop and mobile users.

| Dashboard | Add Employee | Edit Employee | Prediction |
|-----------|---------------|----------------|-------------|
| ![Dashboard](./screenshots/dashboard.png) | ![Add](./screenshots/add.png) | ![Edit](./screenshots/edit.png) | ![Prediction](./screenshots/predict.png) |

> *(Ensure actual screenshots are placed in the `/screenshots/` folder)*

---

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | Next.js (App Router, TypeScript), TailwindCSS, shadcn/ui |
| **Backend** | Supabase (Auth + Realtime PostgreSQL), Next.js API Routes |
| **ML Prediction** | Python (Flask API using scikit-learn or TensorFlow) |
| **Design** | Figma (component-driven UI) |
| **Deployment** | Vercel (Frontend), Render/Railway (Python API) |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/employee-management-attrition.git
cd employee-management-attrition
```
### 2. Setup Environment Variables
Create a .env.local file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ML_API_URL=http://localhost:5000/predict
```
### 3. Install Frontend Dependencies
```bash
npm install
```
### 4. Run the Dev Server
```bash
npm run dev
```
Go to http://localhost:3000

## ⚙️ Backend ML API Setup
Navigate to the ML backend folder (e.g., /ml-api)

Install dependencies:

```bash
pip install -r requirements.txt
```
Run the Flask API:

```bash
python app.py
```
Make sure it runs on the port defined in ML_API_URL.

## 🧪 Testing
✅ Create test employees via form

✅ Edit, update, or delete employees

✅ Check auth behavior (only logged-in users can perform operations)

✅ Use Postman to test ML prediction API

## 📊 ML Model — Attrition Prediction
The ML model takes input features like:

- Age

- Department

- Years at company

- Salary

- Job role

- Work-life balance

- Job satisfaction
...and predicts whether the employee is at risk of attrition.

### Model trained using:

✅ Logistic Regression

✅ Decision Tree / Random Forest (baseline)

🔜 Deep Learning enhancement (TensorFlow/Keras)

## 📈 Roadmap
 - Employee CRUD with Supabase

 - Realtime Dashboard Integration

 - ML Model Deployment to Production

 - Email Alerts for High Attrition Risk

 - Department-Wise Attrition Heatmaps

 - Admin Approval Workflow for Edits

## 🤝 Contributing
We love contributions! To contribute:

- Fork the repository

- Create a feature branch: feature/your-idea

- Push changes & open a Pull Request

## 💡 Learnings
"Building this platform taught us real-world backend integration using Supabase and how ML can empower HR teams with actionable insights. From routing to prediction models — we aimed to deliver a tech-first HR solution."

## 📬 Contact
Developed by Debashrita Mandal, Akshat Jain, Anika Mariam, Bhawani Shankar Mandal, Ayushi Bhattacharyya

Reach us at akjain2904@gmail.com














