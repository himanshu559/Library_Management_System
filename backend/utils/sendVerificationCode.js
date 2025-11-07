import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res){
  
    try {
      // Simulate sending email by logging to the console
      const message = generateVerificationOtpEmailTemplate(verificationCode);
      console.log(`Sending verification code ${verificationCode} to email: ${email}`);
      await sendEmail({
        email: email,
        subject: "Your Verification Code",
        message: message
      });

      return res.status(200).json({
        success: true,
        message: `Verification code sent to ${email}`
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification code"
      })
    }
  
}

export default sendVerificationCode;