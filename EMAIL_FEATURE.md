# 📧 Email Notification Feature

## Overview
The email notification system automatically sends emails to **Job Seekers** at key moments in the application process.

## Email Recipients: JOB SEEKERS ONLY

### When Emails Are Sent:

#### 1. Application Confirmation Email ✅
**Trigger:** When a Job Seeker applies for a job  
**Recipient:** Job Seeker (applicant)  
**Content:**
- Subject: `Application Received: [Job Title]`
- Message: Confirmation that application was received
- Details: Job title, Company name

**Example:**
```
Subject: Application Received: Software Engineer

Hi John Doe,

Your application for Software Engineer at Google has been received successfully.
```

#### 2. Application Status Update Email ✅
**Trigger:** When Admin changes application status  
**Recipient:** Job Seeker (applicant)  
**Content:**
- Subject: `Application Status Updated: [Job Title]`
- Message: Status change notification
- New Status: Pending/Reviewed/Accepted/Rejected

**Example:**
```
Subject: Application Status Updated: Software Engineer

Hi John Doe,

The status of your application for Software Engineer at Google has been updated to: Accepted
```

## How It Works:

### For Job Seekers:
1. **Apply for a job** → Receive confirmation email immediately
2. **Wait for admin review** → Receive email when status changes
3. **Check email** → Stay updated on application progress

### For Admins:
1. **View applications** in Admin Dashboard → Applications tab
2. **Change status** using dropdown (Pending/Reviewed/Accepted/Rejected)
3. **Email sent automatically** to the job seeker

## Email Configuration:

### Backend Setup (Already Configured):
```env
EMAIL_USER=princeturkar1@gmail.com
EMAIL_PASS=yzjhnzvypnwmwmmc (Gmail App Password)
```

### Email Service: Gmail (Nodemailer)
- Uses Gmail SMTP
- Requires App Password (not regular password)
- Configured in `backend/utils/email.js`

## Code Implementation:

### Application Email (backend/routes/jobs.js):
```javascript
// When job seeker applies
await sendEmail(
  user.email,
  `Application Received: ${job.title}`,
  `Hi ${user.name}, you have successfully applied for ${job.title} at ${job.company}.`,
  `<h1>Application Confirmation</h1>...`
);
```

### Status Update Email (backend/routes/jobs.js):
```javascript
// When admin updates status
await sendEmail(
  application.applicantEmail,
  `Application Status Updated: ${application.jobTitle}`,
  `Your application status has been updated to: ${newStatus}`,
  `<h1>Status Update</h1>...`
);
```

## Testing the Email Feature:

### Test Application Email:
1. Register as Job Seeker
2. Login as Job Seeker
3. Browse jobs and click "Apply Now"
4. Check your email inbox
5. You should receive confirmation email

### Test Status Update Email:
1. Login as Admin
2. Go to "All Applications" tab
3. Change application status using dropdown
4. Job seeker receives email notification

## Email Flow Diagram:

```
Job Seeker                Backend                  Email Service
    |                        |                          |
    |--Apply for Job-------->|                          |
    |                        |--Send Confirmation------>|
    |<-----------------------|<------Email Sent---------|
    |                        |                          |
    
Admin                     Backend                  Email Service
    |                        |                          |
    |--Update Status-------->|                          |
    |                        |--Send Status Update----->|
    |                        |                          |
Job Seeker                  |                          |
    |<-----------------------|<------Email Sent---------|
```

## Important Notes:

✅ **Emails are sent to Job Seekers only**  
✅ **Admins do NOT receive emails** (they manage applications in dashboard)  
✅ **Automatic** - No manual action needed  
✅ **Real-time** - Sent immediately when action occurs  
✅ **HTML formatted** - Professional looking emails  

## Email Types Summary:

| Event | Recipient | Trigger | Sent By |
|-------|-----------|---------|---------|
| Application Confirmation | Job Seeker | Apply for job | System (automatic) |
| Status Update | Job Seeker | Admin changes status | System (automatic) |

## Troubleshooting:

If emails are not being sent:
1. Check Gmail App Password is correct (no spaces)
2. Verify EMAIL_USER and EMAIL_PASS in .env
3. Check backend console for email errors
4. Ensure 2-Step Verification is enabled on Gmail
5. Verify App Password is generated correctly

## Current Status: ✅ WORKING

The email feature is fully functional and configured!