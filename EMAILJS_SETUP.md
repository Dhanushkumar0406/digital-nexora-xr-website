# EmailJS Setup Guide

Follow these steps to set up email functionality for the Book Project form:

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Create Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the steps to connect your email

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:

```
Subject: New Project Booking: {{project_name}}

Project Details:
---------------
Project Name: {{project_name}}
Website Type: {{website_type}}
Purpose: {{purpose}}
Duration: {{duration}}
Estimated Fees: {{estimated_fees}}
Payment Type: {{payment_type}}

Client Information:
-----------------
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Additional Information:
---------------------
{{additional_info}}
```

4. **Get Credentials**
   - Go to "Account" > "API Keys"
   - Copy your Public Key
   - From Email Services, copy your Service ID
   - From Email Templates, copy your Template ID

5. **Update Environment Variables**
   - Open `.env` file in the project root
   - Update these values:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_DEVELOPER_EMAIL=digitalnexorawebtech0401@gmail.com
   ```

6. **Test the Configuration**
   - The form is currently in TEST_MODE
   - Check browser console when submitting the form
   - Verify all credentials are present
   - Set TEST_MODE to false in BookProject.tsx when everything is configured

If you're still having issues:
1. Check if all environment variables are properly set
2. Verify the email template variables match the code
3. Make sure your EmailJS account is verified
4. Check browser console for specific error messages