 // Email Templates
   export function generateVerificationOtpEmailTemplate(otpCode) {
  return `
  <div style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #f9f9f9;
  ">
    <h2 style="color: #fff; background: #007bff; padding: 12px; border-radius: 8px 8px 0 0; text-align: center;">
      Verify Your Email Address
    </h2>

    <p style="font-size: 16px; color: #333;">Dear User,</p>

    <p style="font-size: 16px; color: #333;">
      To complete your registration or login, please use the following One-Time Password (OTP):
    </p>

    <div style="text-align: center; margin: 20px 0;">
      <span style="
        display: inline-block;
        font-size: 28px;
        font-weight: bold;
        color: #000;
        padding: 12px 24px;
        border: 2px dashed #007bff;
        border-radius: 8px;
        background: #fff;
      ">
        ${otpCode}
      </span>
    </div>

    <p style="font-size: 16px; color: #666;">
      This code is valid for 15 minutes. Please do not share this code with anyone.
    </p>
    <p style="font-size: 16px; color: #666;">
      If you did not request this email, please ignore it.
    </p>

    <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
      <p>Thank you,<br><strong>BookWorm Team</strong></p>
      <p style="font-size: 12px; color: #555;">
        This is an automated message. Please do not reply to this email.
      </p>
    </footer>
  </div>
  `;
}
  
// Forgot Password Email Template
export function generateForgotPasswordEmailTemplate(resetUrl) {
  return `
  <div style="  
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #f9f9f9;
  ">
    <h2 style="color: #fff; background: #dc3545; padding: 12px; border-radius: 8px 8px 0 0; text-align: center;">
      Password Reset Request
    </h2> 
    <p style="font-size: 16px; color: #333;">Dear User,</p>
    <p style="font-size: 16px; color: #333;">
      We received a request to reset your password. Click the button below to reset it:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetUrl}" style=" 
        display: inline-block;
        padding: 12px 24px;
        font-size: 16px;
        color: #fff;
        background: #007bff;
        border-radius: 8px;
        text-decoration: none;
      ">
        Reset Password
      </a>
    </div>
  </div>
    <p style="font-size: 16px; color: #666;">If you did not request a password reset, please ignore this email or reply to let us know.
    </p>
    <p style="font-size: 16px; color: #666;">This password reset link is valid for 30 minutes.</p>
    <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
      <p>Thank you,<br><strong>BookWorm Team</strong></p> 
      <p style="font-size: 12px; color: #555;"></p>
        This is an automated message. Please do not reply to this email.
      </p>
    </footer>
  </div>
  `;
}