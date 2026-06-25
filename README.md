# JobNest - AI Powered Freelancing Platform

JobNest is a modern full-stack freelancing platform designed to connect **clients** and **freelancers** through an intelligent hiring ecosystem. Clients can post projects, manage applicants, and discover skilled professionals, while freelancers can create professional profiles, apply for jobs, upload resumes, and leverage AI-powered tools to improve their chances of getting hired.

The platform is built using the MERN Stack with **React**, **Node.js**, **Express**, and **MongoDB Atlas**. It integrates **Google Gemini AI** for intelligent job descriptions, proposal generation, and resume analysis. The frontend is deployed on **Vercel**, the backend on **Render**, and resumes are securely stored using **Cloudinary**.

---

# Live Demo

### Frontend

**https://job-nest-freelancing-web.vercel.app/**

### Backend API

**https://jobnest-freelancing-web.onrender.com/**

### GitHub Repository

**https://github.com/Yashmali39/JobNest_Freelancing_web**

---

# Features

## Authentication & Authorization

* Secure User Registration & Login
* JWT Authentication using HTTP-only Cookies
* Protected Routes
* Role-Based Access Control
* Dynamic Role Switching

## Freelancer Features

* Create and Manage Professional Profile
* Upload Resume
* Resume Text Extraction
* Portfolio Management
* Browse Available Jobs
* Search & Filter Jobs
* Apply for Jobs
* Withdraw Applications
* Track Application Status

## Client Features

* Create and Manage Company Profile
* Post New Jobs
* Update Existing Jobs
* Delete Jobs
* View Applicants
* Accept / Reject Applications
* Browse Freelancer Directory
* View Detailed Freelancer Profiles

## AI Features

* AI Job Description Generator
* AI Proposal Generator
* AI Resume Match Analysis
* Skill Match Recommendations

## User Experience

* Responsive Design
* Mobile Friendly
* Modern Dark UI
* Search & Filtering
* Pagination
* Toast Notifications
* Loading States
* Empty States

---

# Tech Stack & Architecture

JobNest follows a client-server architecture with separate frontend and backend deployments.

## Frontend

Framework

* React.js (Vite)

Libraries Used

* Tailwind CSS
* React Router DOM
* React Hook Form
* Axios
* React Hot Toast
* Zod

## Backend

Runtime

* Node.js

Framework

* Express.js

Key Features

* RESTful API Architecture
* JWT Authentication
* Cookie-Based Authentication
* MongoDB Integration using Mongoose
* Resume Upload & Processing
* Cloudinary Integration
* Google Gemini AI Integration

## Database

Database

* MongoDB Atlas

Stores

* Users
* Freelancer Profiles
* Client Profiles
* Jobs
* Applications

## AI Services

Google Gemini API provides

* Job Description Generation
* Resume Match Analysis
* Proposal Generation

## Cloud Storage

* Cloudinary (Resume Storage)

## Deployment

Frontend

* Vercel

Backend

* Render

Database

* MongoDB Atlas

---

# Project Structure

```bash
JobNest_Freelancing_web
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── utils
│   │   ├── validations
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── modules
│   │   ├── middleware
│   │   ├── routes
│   │   ├── config
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

# Getting Started

To get a local copy up and running, follow these simple steps.

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB Atlas Account (or Local MongoDB)
* Cloudinary Account
* Google Gemini API Key
* Git

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Yashmali39/JobNest_Freelancing_web.git

cd JobNest_Freelancing_web
```

---

## Backend Setup

Navigate to backend directory

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

MONGO_URI=

NODE_ENV=development

JWT_SECRET=

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

GEMINI_API_KEY=
```

Run the backend

```bash
npm run dev
```

Backend runs on

```bash
http://localhost:3000
```

---

## Frontend Setup

Navigate to frontend directory

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:3000/api
```

Run the frontend

```bash
npm run dev
```

Frontend runs on

```bash
http://localhost:5173
```

---

# Project Workflow

## User Authentication

* Register and Login securely using JWT Authentication.
* Protected routes ensure only authenticated users can access the platform.

## Profile Management

* Users can create either a Freelancer or Client profile.
* Users with both profiles can seamlessly switch between roles.

## Job Marketplace

* Clients can create, update, and manage job postings.
* Freelancers can browse, search, and apply for available jobs.

## Application Management

* Freelancers can track their submitted applications.
* Clients can review applicants and accept or reject applications.

## AI Assistance

* Generate professional job descriptions using AI.
* Generate personalized job proposals.
* Analyze resumes against job requirements using AI.

## Freelancer Directory

* Browse available freelancers.
* Search freelancers by name, skills, or title.
* View complete freelancer profiles including skills, portfolio, and resume.

---

# Future Improvements

* Real-Time Chat using Socket.IO
* Payment Gateway Integration
* Ratings & Reviews
* Saved Jobs
* Email Notifications
* Interview Scheduling
* Admin Dashboard
* Analytics Dashboard
* Recommendation Engine
* Multi-language Support

---

# Project Highlights

This project demonstrates practical experience in building and deploying a production-ready full-stack web application, including:

- Full-Stack MERN Application Development
- JWT Authentication with HTTP-only Cookies
- Role-Based Access Control
- AI Integration using Google Gemini API
- Resume Upload & Cloudinary Integration
- RESTful API Design
- Responsive UI Development with React & Tailwind CSS
- MongoDB Database Design & Mongoose ODM
- Deployment using Vercel and Render
- Production Configuration (CORS, Cookies, Environment Variables)

# Author

### Yash Mali

Computer Engineering Student | Full Stack Developer

GitHub: https://github.com/Yashmali39

LinkedIn: https://www.linkedin.com/in/yash-mali-399b61283/
