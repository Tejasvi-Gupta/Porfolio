# Email me — V2.7
The contact form uses the address `tejasvi.work08@gmail.com` from `content/profile.mjs`. Without EmailJS configuration it opens a prefilled mailto draft; it does not send automatically. The copy-email control uses the same address. The supplied résumé PDF is unchanged.

## Enable direct delivery
1. Sign in to https://dashboard.emailjs.com/ and add a Gmail email service. Authorize your Gmail account yourself.
2. Create an email template. Set the **To Email** field to the fixed recipient `tejasvi.work08@gmail.com`, use the connected service's default From address, set Reply To to `{{reply_to}}`, and Subject to `{{subject}}`. Use the following content (plain text or escaped template variables):

```
Name: {{from_name}}
Email: {{reply_to}}

{{message}}
```

3. Copy the service ID, template ID and account **public** key into NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in the build environment. The optional emailjs values in content/profile.mjs supply defaults for the offline preview.
4. Restrict allowed origins in EmailJS to your deployed portfolio and any local development origin you need. Do not expose private keys or Gmail passwords. Configure provider-side anti-abuse controls before publishing. Client-side validation and cooldown are not security boundaries; if CAPTCHA is enabled, additional integration is required.
5. Run `npm run preview` and `npm run build:static` (or `npm install && npm run build` for Next.js). Deploy and send a test message from the allowed origin. Confirm the actual message arrives in Gmail.

REST API reference: https://www.emailjs.com/docs/rest-api/send/ . The contact form uses fetch and requires no new npm dependencies. Live delivery is unverified until account configuration and an end-to-end test. Mock success tests confirm UI logic, not delivery.
