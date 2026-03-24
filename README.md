# 🛒 MultiShop E-Commerce Platform

A full-stack **multi-panel e-commerce platform** built using a monorepo architecture. It includes a customer-facing frontend, an admin dashboard, a backend API, and CI/CD workflows for automated deployment.

---

## 📁 Repository Structure

root/
├── frontend/        # Customer-facing React application
├── backend/         # Node.js + Express API
├── admin/           # Admin dashboard (React)
│
├── .github/
│   └── workflows/   # CI/CD pipelines (GitHub Actions)
│
└── README.md

---

## ⚙️ Tech Stack

- Frontend: React.js  
- Admin Panel: React.js  
- Backend: Node.js, Express.js  
- CI/CD: GitHub Actions  
- Architecture: Monorepo  

---

## ✨ Features

- Authentication & authorization (JWT-based)  
- Role-based access (User / Admin)  
- Product management (CRUD)  
- Category management  
- Cart functionality  
- Order placement & management  
- Stripe payment integration (test mode)  
- Real-time order notifications in admin panel using WebSockets (Socket.IO)  
- Admin dashboard for monitoring users, products, and orders  
- RESTful API architecture  
- Automated CI/CD workflows via GitHub Actions  
- Monorepo structure for modular development  

---

## 🐳 Docker Configuration (Ports)

- Frontend (Client): http://localhost:5174  
- Admin Panel: http://localhost:5173  
- Backend API: http://localhost:7000  

---

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/multishop.git  
cd multishop  

---

## ⚙️ Backend Setup

cd backend  
npm install  

Create a `.env` file:

PORT=7000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

Run backend:

npm run dev  

---

## 🎨 Frontend Setup (Client)

cd frontend  
npm install  
npm start  

Runs on: http://localhost:5174  

---

## 🧑‍💼 Admin Panel Setup

cd admin  
npm install  
npm start  

Runs on: http://localhost:5173  

---

## 🔗 Backend API

Runs on: http://localhost:7000  

---

## 🔐 Environment Variables

Required backend variables:

- PORT  
- MONGO_URI  
- JWT_SECRET  

---

## 🔄 CI/CD Pipeline

GitHub Actions workflows are located in:

.github/workflows/

These workflows handle:
- Automated builds  
- Deployment triggers on push to main branch  
- Consistent pipeline execution  

---

## 🚀 Deployment Strategy

- Frontend: Vercel / Netlify  
- Admin Panel: Vercel / Netlify  
- Backend: Render / Railway / VPS  
- CI/CD: GitHub Actions  
- Containerization: Docker (ports mapped above)  

---

## 🧪 Scripts

Backend:
npm run dev     # Development server  
npm start       # Production server  

Frontend / Admin:
npm start       # Development  
npm run build   # Production build  

---

## 🛡️ Security Practices

- Environment variables for sensitive data  
- JWT-based authentication  
- Protected API routes  
- Input validation & sanitization  
- Restricted CORS in production  
- No secrets committed to GitHub  

---

## 📌 Future Enhancements

- Payment gateway expansion (PayPal, Stripe live mode)  
- Redis caching  
- Kubernetes orchestration  
- Microservices architecture  
- Advanced search & filtering  
- Docker Compose multi-service setup  

---

# 🚀 Deployment Challenges & Solutions

During the deployment of this **MERN E-Commerce Application** (Frontend, Admin Panel, Backend), several real-world CI/CD and infrastructure issues were encountered. Below is a transparent breakdown of the problems and their resolutions.

---

## 🔴 1. Netlify Deployment Failing (`Error: Not Found`)

### 📌 Problem

While deploying Frontend and Admin using Netlify via CI/CD, the deployment failed with:

```
Error: Not Found
```

### 🔍 Root Cause

* Incorrect `NETLIFY_SITE_ID`
* Site name used instead of actual Site ID
* Netlify API returned HTTP 404

### ✅ Solution

* Retrieved correct Site ID from Netlify Dashboard:

  ```
  Site Settings → General → Site Details
  ```
* Verified using Netlify API:

  ```bash
  curl -H "Authorization: Bearer <TOKEN>" \
  https://api.netlify.com/api/v1/sites/<SITE_ID>
  ```
* Updated GitHub Secrets:

  * `FRONTEND_NETLIFY_SITE_ID`
  * `ADMIN_NETLIFY_SITE_ID`

---

## 🔴 2. Empty Deployment (No Files Uploaded)

### 📌 Problem

Deployment succeeded but website showed blank / no content.

### 🔍 Root Cause

* Incorrect build output directory
* Used `build/` instead of Vite default `dist/`

### ✅ Solution

* Updated CI/CD configuration:

  ```yaml
  publish-dir: ./Frontend/dist
  publish-dir: ./Admin/dist
  ```

---

## 🔴 3. Jobs Not Triggering in GitHub Actions

### 📌 Problem

Some deployment jobs were skipped unexpectedly.

### 🔍 Root Cause

* Conditional execution using `paths-filter`
* No matching file changes detected

### ✅ Solution

* Removed change detection logic
* Implemented **full deployment pipeline**:

  * Every push triggers all services

---

## 🔴 4. Node.js Version Mismatch

### 📌 Problem

Local environment used Node.js v22, but CI used Node.js v18.

### 🔍 Root Cause

* Environment inconsistency between local and CI

### ✅ Solution

* Updated GitHub Actions:

  ```yaml
  node-version: 22
  ```
* Ensured consistent runtime across environments

---

## 🔴 5. Netlify Authentication Issues

### 📌 Problem

Deployment failed due to authentication errors.

### 🔍 Root Cause

* Invalid or mismatched Netlify token
* Token did not belong to the same account as the site

### ✅ Solution

* Generated new Personal Access Token from Netlify
* Ensured token ownership matched site ownership
* Updated:

  ```env
  NETLIFY_AUTH_TOKEN
  ```

---

## 🔴 6. Backend Deployment Automation (Render)

### 📌 Problem

Backend was not auto-deploying.

### 🔍 Root Cause

* Missing or incorrect Render Deploy Hook URL

### ✅ Solution

* Generated Deploy Hook from Render Dashboard
* Integrated into GitHub Actions:

  ```bash
  curl -X POST $RENDER_DEPLOY_HOOK_URL
  ```

---

## 🟢 Final Outcome

* ✅ Fully automated CI/CD pipeline
* ✅ Parallel deployment of:

  * Frontend (Netlify)
  * Admin Panel (Netlify)
  * Backend (Render)
* ✅ Production-ready architecture
* ✅ Zero manual deployment steps

---

## 💡 Key Learnings

* Environment parity is critical (Node.js versions)
* CI/CD failures are often configuration-related, not code-related
* Always verify API credentials independently (via curl)
* Understand build tools (Vite vs CRA differences)
* Simplicity in pipelines reduces failure surface

---

## 👨‍💻 Author

## Muhammad Hadi
Full Stack JavaScript Developer | DevOps Learner 🚀



