require('dotenv').config();
const nodemailer = require('nodemailer');

async function testMail() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  console.log("Sending test email to shsoshmehra@gmail.com...");
  try {
    const info = await transporter.sendMail({
      from: `"SIH 4.0 Hackathon" <${process.env.EMAIL_USER}>`,
      to: 'shsoshmehra@gmail.com',
      subject: `SIH 4.0 Registration Successful! - Team TestMail`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fdfdfd;">
          <h2 style="color: #161619;">Smart India Hackathon 4.0</h2>
          <p>Dear <strong>Test Leader</strong>,</p>
          <p>Congratulations! Your team <strong>"Test Team"</strong> has successfully registered for the <strong>Smart India Hackathon 4.0 (SIH 4.0)</strong>.</p>
          <p>Your Unique Registration ID is: <strong style="color: #D8AB55;">SIH4-TEST123</strong></p>
          <p>This is a test email sent by your assistant to confirm that the mail system is working perfectly!</p>
        </div>
      `
    });
    console.log("Success! Message ID:", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

testMail();
