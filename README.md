# MERN Stack Job Portal

A minimal job portal application built with MongoDB, Express.js, React, and Node.js.

## Features

### Backend
- User authentication (JWT)
- User roles (Job Seeker, Employer)
- Job CRUD operations
- Job application system

### Frontend
- User registration/login
- Job listings
- Job application functionality
- Role-based access control

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update `.env` file with your MongoDB URI and JWT secret

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```

### Usage
1. Register as either a Job Seeker or Employer
2. Employers can post jobs
3. Job Seekers can view and apply for jobs
4. Authentication is required for posting jobs and applying

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Jobs
- GET `/api/jobs` - Get all jobs
- POST `/api/jobs` - Create job (employers only)
- POST `/api/jobs/:id/apply` - Apply for job (job seekers only)

## Default Ports
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## User Roles

The application supports two user roles:

- **Job Seekers**: Can view and apply for jobs
- **Employers**: Can post and manage jobs

Both terminals need to stay running for the full application to work.