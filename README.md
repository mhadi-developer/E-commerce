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

## 👨‍💻 Author

Hadi Full Stack JavaScript Developer (MERN)