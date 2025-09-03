const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  async sendEmail(to, subject, html, text) {
    try {
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@primefocususa.com',
        to,
        subject,
        html,
        text
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  async sendVerificationEmail(email, firstName, verificationToken) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Email - Prime Focus C.A.F.E.</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e3a8a;">Prime Focus C.A.F.E.</h1>
            </div>
            
            <h2>Welcome ${firstName}!</h2>
            
            <p>Thank you for signing up for Prime Focus C.A.F.E. To complete your registration, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #f59e0b; color: #1e3a8a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            
            <p>This verification link will expire in 24 hours.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666;">
              If you didn't create an account with Prime Focus C.A.F.E., please ignore this email.
            </p>
          </div>
        </body>
      </html>
    `;

    const text = `
      Welcome ${firstName}!
      
      Thank you for signing up for Prime Focus C.A.F.E. To complete your registration, please verify your email address by visiting this link:
      
      ${verificationUrl}
      
      This verification link will expire in 24 hours.
      
      If you didn't create an account with Prime Focus C.A.F.E., please ignore this email.
    `;

    return this.sendEmail(email, 'Verify Your Email - Prime Focus C.A.F.E.', html, text);
  }

  async sendPasswordResetEmail(email, firstName, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password - Prime Focus C.A.F.E.</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e3a8a;">Prime Focus C.A.F.E.</h1>
            </div>
            
            <h2>Password Reset Request</h2>
            
            <p>Hello ${firstName},</p>
            
            <p>We received a request to reset your password for your Prime Focus C.A.F.E. account. Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #f59e0b; color: #1e3a8a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            
            <p>This password reset link will expire in 10 minutes.</p>
            
            <p><strong>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</strong></p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666;">
              For security reasons, this link will expire in 10 minutes.
            </p>
          </div>
        </body>
      </html>
    `;

    const text = `
      Password Reset Request
      
      Hello ${firstName},
      
      We received a request to reset your password for your Prime Focus C.A.F.E. account. Visit this link to reset your password:
      
      ${resetUrl}
      
      This password reset link will expire in 10 minutes.
      
      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
    `;

    return this.sendEmail(email, 'Reset Your Password - Prime Focus C.A.F.E.', html, text);
  }

  async sendWelcomeEmail(email, firstName) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Prime Focus C.A.F.E.</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e3a8a;">Prime Focus C.A.F.E.</h1>
            </div>
            
            <h2>Welcome to Prime Focus C.A.F.E., ${firstName}!</h2>
            
            <p>Your email has been successfully verified. You're now part of the Prime Focus C.A.F.E. community!</p>
            
            <p>Get ready to unlock your cognitive potential with our scientifically-formulated nootropics designed for modern professionals.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}" 
                 style="background-color: #f59e0b; color: #1e3a8a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Explore Prime Focus C.A.F.E.
              </a>
            </div>
            
            <p>Thank you for joining us on this journey to enhanced focus, sustained energy, and mental clarity.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666;">
              Prime Focus C.A.F.E. - Unlock Your Cognitive Potential
            </p>
          </div>
        </body>
      </html>
    `;

    const text = `
      Welcome to Prime Focus C.A.F.E., ${firstName}!
      
      Your email has been successfully verified. You're now part of the Prime Focus C.A.F.E. community!
      
      Get ready to unlock your cognitive potential with our scientifically-formulated nootropics designed for modern professionals.
      
      Visit ${process.env.FRONTEND_URL} to explore our products.
      
      Thank you for joining us on this journey to enhanced focus, sustained energy, and mental clarity.
    `;

    return this.sendEmail(email, 'Welcome to Prime Focus C.A.F.E.!', html, text);
  }
}

module.exports = new EmailService();
