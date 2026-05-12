import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transporter } from "../configs/nodemailer.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadTemplate = (templateName, variables = {}) => {
    const filePath = path.join(__dirname, '../emails/templates', `${templateName}.html`);
    let html = fs.readFileSync(filePath, 'utf-8');

    Object.entries(variables).forEach(([key, value]) => {
        html = html.replaceAll(`{{${key}}}`, value);
    });

    return html;
};

export const sendVerifyEmail = async ({ email, verify_token }) => {
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verify Your Email Address',
        html: loadTemplate('verify-email', {
            verifyURL: `http://localhost:5000/api/v1/auth/accounts/verify/email?token=${verify_token}`,
        }),
    })
}

export const sendAccountCreatedEmail = async ({ email }) => {
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Account Created Successfully',
        html: loadTemplate('account-created'),
    })
}

export const sendLoginEmail = async ({ email, userAgent, ip }) => {
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        subject: 'New account activity',
        to: email,
        html: loadTemplate('login-activity', {
            userAgent,
            ip
        }),
    })
}

export const sendAccountedDeletedEmail = async ({ email }) => {
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: '📛 Request for account deletion',
        html: loadTemplate('account-deleted'),
    })
}