# 📁 How to View Resumes in Cloudinary

## Accessing Cloudinary Dashboard

### Step 1: Login to Cloudinary
1. Go to: **https://cloudinary.com/users/login**
2. Enter your credentials:
   - **Cloud Name:** `dnsdlk4pq`
   - **Email:** Your Cloudinary account email
   - **Password:** Your Cloudinary password

### Step 2: Navigate to Media Library
After login, you'll see the Cloudinary Console:
```
Dashboard → Media Library (left sidebar)
```

### Step 3: Find Resumes Folder
In Media Library:
```
1. Look for "resumes" folder
2. Click on "resumes" folder
3. All uploaded resumes will be here
```

## What You'll See in Cloudinary:

### Resume Files Display:
```
📁 resumes/
   📄 resume_abc123.pdf
   📄 resume_xyz456.pdf
   📄 resume_def789.docx
```

### File Information:
- **File Name:** resume_[unique_id].pdf
- **Format:** PDF, DOC, DOCX
- **Size:** File size in KB/MB
- **Upload Date:** When it was uploaded
- **Public ID:** Unique identifier
- **URL:** Direct link to file

## How to View/Download Resume:

### Method 1: Click on File
```
1. Click on any resume file
2. Preview opens (if supported)
3. Click "Download" button to save
```

### Method 2: Copy URL
```
1. Right-click on file
2. Select "Copy URL"
3. Paste in browser to view/download
```

### Method 3: Use Actions Menu
```
1. Hover over file
2. Click three dots (⋮) menu
3. Select "View" or "Download"
```

## Cloudinary Dashboard Layout:

```
┌─────────────────────────────────────────┐
│  Cloudinary Console                     │
├─────────────────────────────────────────┤
│ ☰ Menu                                  │
│   📊 Dashboard                          │
│   📁 Media Library  ← Click here        │
│   ⚙️  Settings                          │
│   📈 Reports                            │
└─────────────────────────────────────────┘

Media Library View:
┌─────────────────────────────────────────┐
│  📁 Folders                             │
│    📁 resumes  ← Your resumes here      │
│    📁 images                            │
│    📁 videos                            │
├─────────────────────────────────────────┤
│  Files in "resumes" folder:             │
│  📄 resume_abc123.pdf    2.5 MB         │
│  📄 resume_xyz456.pdf    1.8 MB         │
│  📄 resume_def789.docx   3.2 MB         │
└─────────────────────────────────────────┘
```

## Alternative: Direct URL Access

If you have the resume URL from your database:

### URL Format:
```
https://res.cloudinary.com/dnsdlk4pq/raw/upload/v1234567890/resumes/resume_abc123.pdf
```

### Access Methods:
1. **Copy URL from Profile page** → Paste in browser
2. **Copy URL from MongoDB** → Paste in browser
3. **Copy URL from Application record** → Paste in browser

## Finding Specific Resume:

### By Upload Date:
```
Media Library → resumes folder → Sort by "Date" → Find recent uploads
```

### By File Name:
```
Media Library → resumes folder → Search box → Type file name
```

### By User (Manual):
```
1. Get resume URL from user profile in MongoDB
2. Extract file name from URL
3. Search in Cloudinary Media Library
```

## Cloudinary Account Details:

**Your Configuration:**
- **Cloud Name:** `dnsdlk4pq`
- **Folder:** `resumes/`
- **Resource Type:** `raw` (for non-image files)
- **Allowed Formats:** PDF, DOC, DOCX

## Quick Access Steps:

### For Admins:
```
1. Login to Cloudinary
2. Media Library → resumes folder
3. View all uploaded resumes
4. Click to preview/download
```

### For Developers:
```
1. Check MongoDB for resume URL
2. Copy URL
3. Open in browser
4. Or login to Cloudinary to manage files
```

## Managing Resumes in Cloudinary:

### View Resume:
- Click on file → Preview opens

### Download Resume:
- Click file → Download button

### Delete Resume:
- Click file → Delete option
- (Note: This won't update database)

### Get URL:
- Right-click → Copy URL
- Or click file → Copy URL button

## Troubleshooting:

### Q: Can't find resumes folder
**A:** 
- Check if any resumes have been uploaded
- Folder only appears after first upload
- Try refreshing the page

### Q: Resume not showing in Cloudinary
**A:**
- Check if upload was successful
- Verify Cloudinary credentials in .env
- Check backend console for errors

### Q: Can't download resume
**A:**
- Check file permissions
- Verify URL is correct
- Try copying URL and opening in new tab

### Q: How to delete old resumes?
**A:**
- Login to Cloudinary
- Navigate to resumes folder
- Select file → Delete
- Note: Database URL won't be updated automatically

## Security Note:

⚠️ **Important:**
- Cloudinary URLs are public by default
- Anyone with URL can access the file
- For sensitive data, configure access restrictions in Cloudinary settings
- Consider using signed URLs for private files

## Summary:

**To View Resumes in Cloudinary:**

1. **Login:** https://cloudinary.com/users/login
2. **Navigate:** Media Library → resumes folder
3. **View:** Click on any resume file
4. **Download:** Use download button or copy URL

**Your Cloudinary Account:**
- Cloud Name: `dnsdlk4pq`
- Folder: `resumes/`
- All uploaded resumes stored here

**Quick Access:**
- Dashboard: https://console.cloudinary.com
- Media Library: https://console.cloudinary.com/console/media_library

All resumes uploaded through your job portal are stored in the `resumes/` folder in your Cloudinary account! 📁✅