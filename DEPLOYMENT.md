# Vercel Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub
1. Push your project to GitHub repository
2. Make sure all files are committed

### Step 2: Deploy Frontend to Vercel
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Set Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `REACT_APP_API_URL` = `your_backend_api_url`

## Backend Deployment Options

### Option 1: Railway
1. Go to https://railway.app
2. Connect GitHub repository
3. Deploy backend folder
4. Add environment variables (MONGODB_URI, JWT_SECRET)

### Option 2: Render
1. Go to https://render.com
2. Connect GitHub repository
3. Create new Web Service
4. Set root directory to `backend`
5. Add environment variables

### Option 3: Heroku
1. Install Heroku CLI
2. Create new Heroku app
3. Deploy backend folder
4. Add environment variables

## Important Notes
- Deploy backend first to get API URL
- Update REACT_APP_API_URL in Vercel with backend URL
- Ensure CORS is configured in backend for your frontend domain