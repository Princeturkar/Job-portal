# 📄 Resume Storage & Viewing Guide

## Where is the Resume Stored?

### 1. **Cloud Storage: Cloudinary** ☁️
**Physical Storage Location:**
- Your resume file is uploaded to **Cloudinary** (cloud storage service)
- Stored in folder: `resumes/`
- Cloudinary Account: `dnsdlk4pq`
- Accessible via secure URL

**Example URL:**
```
https://res.cloudinary.com/dnsdlk4pq/raw/upload/v1234567890/resumes/abc123.pdf
```

### 2. **Database: MongoDB** 🗄️
**What's Stored:**
- Resume URL (link to Cloudinary file)
- Stored in: User Profile
- Database: MongoDB Atlas
- Collection: `users`
- Field: `profile.resumeUrl`

**Database Structure:**
```json
{
  "_id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "profile": {
    "resumeUrl": "https://res.cloudinary.com/.../resume.pdf",
    "skills": ["JavaScript", "React"],
    "socialLinks": {...}
  }
}
```

## Where Can You SEE/VIEW the Resume?

### For Job Seekers:

#### 1. **Profile Page** (After Upload)
**Location:** Profile → Resume Management section
**What You See:**
- "Current Resume: [View Resume]" link
- Click link → Opens resume in new tab
- Can download from there

**How to Access:**
```
Login as Job Seeker → Click Profile Tab → See "Current Resume" link
```

#### 2. **Cloudinary Dashboard** (Admin Access)
**Location:** https://cloudinary.com/console
**Login with:**
- Cloud name: `dnsdlk4pq`
- Your Cloudinary credentials

**What You See:**
- All uploaded resumes
- File details, size, format
- Can download, delete, manage

### For Admins:

#### 1. **All Applications Tab**
**Location:** Admin Dashboard → All Applications
**What You See:**
- List of all job applications
- Applicant name, email, job title
- **Resume URL** (if applicant uploaded resume)

**Current Implementation:**
The resume URL is stored in the application record but not displayed in the UI yet.

#### 2. **Database (MongoDB Atlas)**
**Location:** MongoDB Atlas Dashboard
**What You See:**
- All user profiles with resume URLs
- All applications with resume URLs
- Raw data

## How to View Resume (Step by Step):

### As Job Seeker:
```
1. Login to Job Portal
2. Click "Profile" in navigation
3. Scroll to "Resume Management" section
4. Click "View Resume" link
5. Resume opens in new browser tab
6. Can download from there
```

### As Admin (To View Applicant Resume):
```
Option 1: Through Application Record
1. Login as Admin
2. Go to "All Applications" tab
3. Find the application
4. Copy resume URL from application data
5. Paste in browser to view

Option 2: Through Cloudinary
1. Login to Cloudinary dashboard
2. Go to Media Library
3. Navigate to "resumes" folder
4. View/download any resume
```

## Resume Flow Diagram:

```
Job Seeker                Cloudinary              MongoDB              Admin
    |                         |                      |                    |
    |--Upload Resume--------->|                      |                    |
    |                         |--Store File--------->|                    |
    |                         |--Return URL--------->|                    |
    |                         |                      |--Save URL--------->|
    |                         |                      |                    |
    |--Apply for Job--------->|                      |                    |
    |                         |                      |--Get Resume URL--->|
    |                         |                      |--Save in App------>|
    |                         |                      |                    |
    |                         |                      |<--View Apps--------|
    |                         |                      |   (with Resume)    |
    |                         |<---------------------|--Access Resume-----|
```

## Where Resume Data Exists:

### 1. **Cloudinary (File Storage)**
- **What:** Actual PDF/DOC/DOCX file
- **Where:** Cloud servers
- **Access:** Via URL
- **Example:** `https://res.cloudinary.com/dnsdlk4pq/raw/upload/v1234/resumes/file.pdf`

### 2. **MongoDB - User Profile**
- **What:** Resume URL
- **Where:** `users` collection → `profile.resumeUrl`
- **Purpose:** Link user to their resume
- **Example:** `"resumeUrl": "https://cloudinary.com/.../resume.pdf"`

### 3. **MongoDB - Application Record**
- **What:** Resume URL (copied from user profile)
- **Where:** `applications` collection → `resumeUrl`
- **Purpose:** Link application to resume
- **Example:** Application includes applicant's resume URL

## How to Check if Resume is Uploaded:

### Method 1: Profile Page
```
1. Login as Job Seeker
2. Go to Profile
3. Look for "Current Resume: View Resume" text
4. If you see this, resume is uploaded
5. If not, upload section shows only upload button
```

### Method 2: Browser Console
```javascript
// Open browser console (F12)
// Check localStorage
const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

// Then fetch profile
fetch('http://localhost:5000/api/users/profile', {
  headers: { 
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(data => console.log('Resume URL:', data.profile?.resumeUrl));
```

### Method 3: MongoDB Compass
```
1. Open MongoDB Compass
2. Connect to your database
3. Go to 'users' collection
4. Find your user document
5. Check 'profile.resumeUrl' field
```

## Resume URL Format:

**Cloudinary URL Structure:**
```
https://res.cloudinary.com/[cloud_name]/[resource_type]/upload/[version]/[folder]/[filename]

Example:
https://res.cloudinary.com/dnsdlk4pq/raw/upload/v1234567890/resumes/resume_abc123.pdf
```

**Parts Explained:**
- `res.cloudinary.com` - Cloudinary CDN
- `dnsdlk4pq` - Your cloud name
- `raw` - Resource type (for non-image files)
- `upload` - Upload type
- `v1234567890` - Version/timestamp
- `resumes` - Folder name
- `resume_abc123.pdf` - File name

## Viewing Resume in Different Ways:

### 1. **Direct Browser View**
- Copy resume URL
- Paste in browser address bar
- Press Enter
- Resume opens/downloads

### 2. **Profile Page Link**
- Click "View Resume" link
- Opens in new tab automatically

### 3. **Cloudinary Dashboard**
- Login to Cloudinary
- Browse Media Library
- Click on resume file
- View/download options available

### 4. **MongoDB Atlas**
- View URL in database
- Copy URL
- Open in browser

## Important Notes:

✅ **Resume is stored in Cloudinary** (not on your computer or server)  
✅ **URL is saved in MongoDB** (for quick access)  
✅ **Accessible via secure HTTPS link**  
✅ **Can be viewed anytime** from Profile page  
✅ **Automatically included** when applying for jobs  
✅ **Admin can access** through application records  

## Troubleshooting:

**Q: I uploaded resume but can't see it**
- Refresh the page
- Check browser console for errors
- Verify Cloudinary credentials in .env

**Q: Resume link doesn't work**
- Check if Cloudinary account is active
- Verify URL is complete
- Check file permissions in Cloudinary

**Q: Where can admin see resumes?**
- Currently stored in application data
- Can be displayed in Admin Dashboard (future enhancement)
- Can access via Cloudinary dashboard

## Summary:

**Storage:** Cloudinary (cloud) + MongoDB (URL)  
**View as Job Seeker:** Profile page → "View Resume" link  
**View as Admin:** Application records (URL) or Cloudinary dashboard  
**Access:** Anytime via secure URL  
**Format:** PDF, DOC, DOCX supported  

Your resume is safely stored in the cloud and accessible whenever needed! 🎉