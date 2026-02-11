# Email Configuration Guide

## Gmail App Password Setup

### Step 1: Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com
2. Click on **Security** (left sidebar)
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable it (if not already enabled)

### Step 2: Generate App Password
1. Go back to **Security** settings
2. Under "Signing in to Google", click **App passwords**
3. You may need to sign in again
4. Select app: **Mail**
5. Select device: **Other (Custom name)**
6. Enter name: "Job Portal App"
7. Click **Generate**
8. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)

### Step 3: Update .env File
Open `backend/.env` and update:
```
EMAIL_USER=your_actual_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### Important Notes:
- Use the App Password, NOT your regular Gmail password
- Remove spaces from the 16-character password
- Keep this password secure and never share it
- The App Password is specific to this application

### Example .env Configuration:
```
EMAIL_USER=johndoe@gmail.com
EMAIL_PASS=abcdabcdabcdabcd
```

## Testing Email Configuration
After setup, test by sending a test email through your application.

## Troubleshooting:
- If "App passwords" option is not visible, ensure 2-Step Verification is enabled
- If emails aren't sending, check that "Less secure app access" is not blocking it
- Verify the email and password are correct in your .env file