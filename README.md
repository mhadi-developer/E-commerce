# MultiShop E-Commerce Platform

A full-stack multi-panel e-commerce platform built using a monorepo architecture. It includes a customer-facing frontend, an admin dashboard, a backend API, and CI/CD workflows for automated deployment.

---

## Repository Structure

The repository follows a monorepo structure with the following organization:

- frontend: Customer-facing React application  
- backend: Node.js and Express API  
- admin: Admin dashboard built with React  
- .github/workflows: CI/CD pipelines using GitHub Actions  
- README.md: Project documentation  

---

## Tech Stack

- Frontend: React.js  
- Admin Panel: React.js  
- Backend: Node.js and Express.js  
- CI/CD: GitHub Actions  
- Architecture: Monorepo  

---

## Features

- Authentication and authorization using JWT  
- Role-based access control for users and admins  
- Product management with full CRUD operations  
- Category management  
- Shopping cart functionality  
- Order placement and management  
- Stripe payment integration in test mode  
- Real-time order notifications in the admin panel using WebSockets (Socket.IO)  
- Admin dashboard for monitoring users, products, and orders  
- RESTful API architecture  
- Automated CI/CD workflows using GitHub Actions  
- Modular monorepo structure for scalable development  

---

## Docker Configuration (Ports)

- Frontend (Client): http://localhost:5174  
- Admin Panel: http://localhost:5173  
- Backend API: http://localhost:7000  

---

## Getting Started

Clone the repository from GitHub and navigate into it.  

---

## Backend Setup

Navigate to the backend folder and install dependencies.  

Create a `.env` file and define the following variables:

- PORT=7000  
- MONGO_URI=your_mongodb_connection_string  
- JWT_SECRET=your_secret_key  

Run the backend server in development mode.  

---

## Frontend Setup (Client)

Navigate to the frontend folder, install dependencies, and run the application.  

The frontend runs at http://localhost:5174  

---

## Admin Panel Setup

Navigate to the admin folder, install dependencies, and run the application.  

The admin panel runs at http://localhost:5173  

---

## Backend API

The backend API runs at http://localhost:7000  

---

## Environment Variables

The backend requires the following environment variables:

- PORT  
- MONGO_URI  
- JWT_SECRET  

---

## CI/CD Pipeline

GitHub Actions workflows are located in `.github/workflows/`.  

These workflows handle:

- Automated builds  
- Deployment triggers on push to the main branch  
- Consistent pipeline execution  

---

## Deployment Strategy

- Frontend: Vercel or Netlify  
- Admin Panel: Vercel or Netlify  
- Backend: Render, Railway, or VPS  
- CI/CD: GitHub Actions  
- Containerization: Docker  

---

## Scripts

Backend:

- npm run dev – Development server  
- npm start – Production server  

Frontend and Admin:

- npm start – Development  
- npm run build – Production build  

---

## Security Practices

- Environment variables for sensitive data  
- JWT-based authentication  
- Protected API routes  
- Input validation and sanitization  
- Restricted CORS in production  
- No secrets committed to GitHub  

---

## Future Enhancements

- Additional payment gateways such as PayPal and Stripe live mode  
- Redis caching implementation  
- Kubernetes orchestration  
- Transition to microservices architecture  
- Advanced search and filtering features  
- Docker Compose for multi-service orchestration  

---

## Deployment Challenges and Solutions

During deployment of the MERN e-commerce application, several issues were encountered across frontend, backend, and CI/CD pipelines.

### 1. Netlify Deployment Failing (Error Not Found)

Problem: Deployment failed with an error indicating "Not Found".  
Root Cause: Incorrect NETLIFY_SITE_ID was used. The site name was used instead of the actual site ID.  
Solution: Retrieved the correct Site ID from the Netlify dashboard and verified using Netlify API. Updated GitHub Secrets with correct values.

### 2. Empty Deployment (No Files Uploaded)

Problem: Deployment succeeded but website showed no content.  
Root Cause: Incorrect build output directory; used build instead of Vite default dist.  
Solution: Updated CI/CD configuration to point to the correct dist directory.

### 3. Jobs Not Triggering in GitHub Actions

Problem: Certain jobs were skipped unexpectedly.  
Root Cause: Conditional execution logic based on file paths prevented triggering.  
Solution: Removed change detection logic; implemented a full deployment pipeline for every push.

### 4. Node.js Version Mismatch

Problem: Local environment used a different Node.js version than CI.  
Solution: Updated GitHub Actions to use the same Node.js version as local development.

### 5. Netlify Authentication Issues

Problem: Deployment failed due to authentication errors.  
Root Cause: Invalid token or token not belonging to the correct account.  
Solution: Generated new personal access token from the correct Netlify account and updated environment variables.

### 6. Backend Deployment Automation Issues (Render)

Problem: Backend was not auto-deploying.  
Root Cause: Missing or incorrect Render deploy hook URL.  
Solution: Generated a deploy hook from Render dashboard and integrated it into CI/CD pipeline.

---

## Final Outcome

- Fully automated CI/CD pipeline  
- Parallel deployment of frontend, admin panel, and backend  
- Production-ready architecture  
- No manual deployment steps required  

---

## Key Learnings

- Environment consistency is critical (Node.js versions)  
- Many CI/CD issues are configuration-related, not code-related  
- External service credentials should be verified independently  
- Understanding build tool differences is important  
- Simpler pipelines reduce failure risk  

---

## Author

Muhammad Hadi  
Full Stack JavaScript Developer and DevOps Learner