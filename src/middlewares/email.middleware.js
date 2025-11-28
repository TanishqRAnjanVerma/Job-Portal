import nodemailer from "nodemailer";
import "dotenv/config";

// Function to send email notifications
export const sendEmailNotification = async (to, subject, text) => {
  try {
    // Creating transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: '"Job Portal" <' + process.env.GMAIL_USER + ">",
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
