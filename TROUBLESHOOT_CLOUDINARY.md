# 🔧 Troubleshooting: Resume Not Showing in Cloudinary

## Quick Checks:

### 1. Check Backend Console
When you upload a resume, check the backend terminal for:
```
✅ Success: File uploaded
❌ Error: Check error message
```

### 2. Check Browser Console (F12)
Look for errors when uploading:
```javascript
// Press F12 → Console tab
// Upload resume and watch for errors
```

### 3. Verify Cloudinary Credentials

**Your Current Config:**
```
CLOUDINARY_CLOUD_NAME=dnsdlk4pq
CLOUDINARY_API_KEY=782885455193798
CLOUDINARY_API_SECRET=782885455193798
```

**⚠️ ISSUE FOUND:** API_KEY and API_SECRET are the same!
This is likely incorrect. They should be different values.

## How to Fix:

### Step 1: Get Correct Cloudinary Credentials

1. **Login to Cloudinary:**
   - Go to: https://cloudinary.com/users/login
   - Login with your account

2. **Go to Dashboard:**
   - After login, you'll see the Dashboard
   - Look for "Account Details" or "API Keys" section

3. **Copy Correct Values:**
   ```
   Cloud Name: dnsdlk4pq (✅ This is correct)
   API Key: [16-digit number]
   API Secret: [Different long string with letters and numbers]
   ```

### Step 2: Update .env File

Open `backend/.env` and update:
```env
CLOUDINARY_CLOUD_NAME=dnsdlk4pq
CLOUDINARY_API_KEY=[your_actual_api_key]
CLOUDINARY_API_SECRET=[your_actual_api_secret]
```

**Important:** API_KEY and API_SECRET should be DIFFERENT!

### Step 3: Restart Backend Server

```bash
# Stop the backend (Ctrl+C)
# Start again
cd backend
npm run dev
```

### Step 4: Test Upload Again

1. Go to Profile page
2. Upload a resume
3. Check backend console for success/error
4. Check Cloudinary dashboard

## Alternative: Test Cloudinary Connection

Create a test file to verify credentials:

**File: `backend/test-cloudinary.js`**
```javascript
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing Cloudinary connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);

// Test by listing resources
cloudinary.api.resources({ max_results: 1 })
  .then(result => {
    console.log('✅ Cloudinary connection successful!');
    console.log('Account has', result.resources.length, 'resources');
  })
  .catch(error => {
    console.log('❌ Cloudinary connection failed!');
    console.log('Error:', error.message);
  });
```

**Run test:**
```bash
cd backend
node test-cloudinary.js
```

## Common Issues & Solutions:

### Issue 1: Wrong API Credentials
**Symptom:** Upload fails, error in console
**Solution:** Get correct API Key and Secret from Cloudinary dashboard

### Issue 2: API Secret Same as API Key
**Symptom:** Authentication fails
**Solution:** API Secret should be different from API Key

### Issue 3: Cloudinary Account Not Active
**Symptom:** Connection fails
**Solution:** Verify account is active, not suspended

### Issue 4: Wrong Folder Name
**Symptom:** Files upload but can't find them
**Solution:** Check folder is "resumes" (lowercase)

### Issue 5: File Format Not Supported
**Symptom:** Upload rejected
**Solution:** Only PDF, DOC, DOCX allowed

## How to Get Correct Cloudinary Credentials:

### Method 1: Cloudinary Dashboard
```
1. Login: https://cloudinary.com/users/login
2. Dashboard → Account Details
3. Copy:
   - Cloud Name
   - API Key (16 digits)
   - API Secret (long alphanumeric string)
```

### Method 2: Cloudinary Console
```
1. Go to: https://console.cloudinary.com
2. Settings → Account
3. Copy API credentials
```

## Verify Upload is Working:

### Check 1: Backend Logs
```bash
# When you upload, you should see:
POST /api/users/upload-resume 200
File uploaded successfully
```

### Check 2: Database
```javascript
// Check MongoDB for resume URL
// User profile should have resumeUrl field
```

### Check 3: Profile Page
```
// After upload, should see:
"Current Resume: View Resume" link
```

### Check 4: Cloudinary Dashboard
```
Media Library → resumes folder → Files should appear
```

## Debug Steps:

### 1. Check if Backend is Running
```bash
# Backend should be running on port 5000
# Check terminal for: "Server running on port 5000"
```

### 2. Check File Upload Request
```javascript
// Open browser console (F12)
// Network tab → Upload resume
// Check request status: Should be 200 OK
```

### 3. Check Response
```javascript
// In Network tab, click the upload request
// Response should have: { resumeUrl: "https://..." }
```

### 4. Test with Postman
```
POST http://localhost:5000/api/users/upload-resume
Headers:
  Authorization: Bearer [your_token]
Body:
  form-data
  Key: resume
  Type: File
  Value: [select a PDF file]
```

## Expected Behavior:

### Successful Upload:
```
1. Choose file → Click Upload
2. Backend receives file
3. Multer processes file
4. Cloudinary stores file
5. Returns URL
6. URL saved in MongoDB
7. Success message appears
8. "View Resume" link shows
9. File visible in Cloudinary
```

## If Still Not Working:

### Option 1: Regenerate API Credentials
```
1. Cloudinary Dashboard → Settings
2. Security → Regenerate API Secret
3. Copy new credentials
4. Update .env file
5. Restart backend
```

### Option 2: Create New Cloudinary Account
```
1. Sign up: https://cloudinary.com/users/register/free
2. Get new credentials
3. Update .env file
4. Test upload
```

### Option 3: Check Cloudinary Plan
```
1. Verify free tier limits not exceeded
2. Check storage quota
3. Check monthly transformations
```

## Summary:

**Most Likely Issue:** API_KEY and API_SECRET are the same (782885455193798)

**Solution:**
1. Login to Cloudinary
2. Get correct API Secret (should be different from API Key)
3. Update backend/.env
4. Restart backend server
5. Try upload again

**Correct Format:**
```env
CLOUDINARY_API_KEY=123456789012345 (16 digits)
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456 (long string)
```

After fixing credentials, resumes should appear in Cloudinary! 🎉