import nodemailer from "nodemailer";

export async function sendEmail({email, subject, message}){

 const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
     // secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
      }
 });

 const mailOptions = {
  from : process.env.SMTP_MAIL,
  to : email,
  subject : subject,
  html : message
 };
 
await transporter.sendMail(mailOptions);


}
export default sendEmail;