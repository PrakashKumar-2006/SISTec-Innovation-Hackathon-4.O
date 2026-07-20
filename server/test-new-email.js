const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
  tls: { rejectUnauthorized: false }
});

const sendConfirmationEmail = async (leaderEmail, leaderName, teamName, registrationId) => {
  const mailOptions = {
    from: `"SIH 4.0 Hackathon" <${process.env.EMAIL_USER}>`,
    to: leaderEmail,
    subject: `SIH 4.0 Registration Successful! - Team ${teamName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.1); border: 1px solid #eaeaea;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 30px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">SISTec-R Innovation Hackathon 4.0</h1>
        </div>
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #2a5298; margin-top: 0; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">🎉</span> Registration Received!
          </h2>
          <p style="font-size: 16px; color: #444; line-height: 1.6;">
            Hello <strong>${leaderName}</strong>,<br><br>
            Thank you for registering for the <strong>SISTec-R Innovation Hackathon 4.0</strong>. We are thrilled to have you and your team on board for this exciting journey of innovation and problem-solving!
          </p>
          <!-- Team Details Card -->
          <div style="margin: 35px 0; background-color: #f8faff; border: 1px solid #dce5f9; border-radius: 10px; padding: 25px;">
            <h3 style="margin-top: 0; color: #1e3c72; border-bottom: 2px solid #dce5f9; padding-bottom: 10px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Team Details Card</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Team Name:</strong></td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${teamName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Leader:</strong></td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${leaderName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Registration ID:</strong></td>
                <td style="padding: 8px 0; color: #d8ab55; font-family: monospace; font-size: 16px; font-weight: bold;">${registrationId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Status:</strong></td>
                <td style="padding: 8px 0; color: #28a745; font-weight: 600;">Successful ✅</td>
              </tr>
            </table>
          </div>
          <!-- Important Dates -->
          <div style="margin: 35px 0;">
            <h3 style="color: #1e3c72; border-bottom: 2px solid #eee; padding-bottom: 10px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Important Dates</h3>
            <ul style="list-style-type: none; padding: 0; color: #555;">
              <li style="padding: 8px 0; border-bottom: 1px dashed #eee;">📅 <strong>Registration Closes:</strong> To be announced</li>
              <li style="padding: 8px 0; border-bottom: 1px dashed #eee;">🎯 <strong>Shortlisting:</strong> To be announced</li>
              <li style="padding: 8px 0;">🚀 <strong>Hackathon Day:</strong> To be announced</li>
            </ul>
          </div>
        </div>
        <!-- Footer -->
        <div style="background-color: #1a1a1a; color: #ffffff; padding: 30px; text-align: center;">
          <h4 style="margin: 0 0 15px 0; color: #d8ab55; font-size: 16px;">Contact Us</h4>
          <p style="margin: 5px 0; font-size: 14px; color: #ccc;">📧 <a href="mailto:sistecr.hodcs@sistec.ac.in" style="color: #ccc; text-decoration: none;">sistecr.hodcs@sistec.ac.in</a></p>
          <p style="margin: 5px 0 15px 0; font-size: 14px; color: #ccc;">📞 +91 9303164688</p>
          <div style="margin: 20px 0; padding-top: 20px; border-top: 1px solid #333;">
            <p style="margin: 0; font-size: 14px; color: #999;">
              <a href="https://www.sistecr.ac.in/" style="color: #d8ab55; text-decoration: none; margin-right: 10px;">Website</a> | 
              <a href="https://www.instagram.com/sistecratibad?igsh=cXd4ZHZmOHF0ZmRm" style="color: #d8ab55; text-decoration: none; margin: 0 10px;">Instagram</a> | 
              <a href="https://www.linkedin.com/school/sagar-institute-of-science-technology-research-sistec-r/" style="color: #d8ab55; text-decoration: none; margin-left: 10px;">LinkedIn</a>
            </p>
          </div>
          <p style="margin: 20px 0 0 0; font-size: 12px; color: #666;">&copy; 2026 SISTec-R Innovation Hackathon (SIH 4.0). All rights reserved.</p>
        </div>
      </div>
    `
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Success! MessageId: ${info.messageId}`);
  } catch (err) {
    console.error(`Error:`, err.message);
  }
};

sendConfirmationEmail('shivanshmehra1646@gmail.com', 'Test Leader', 'Test Team', 'HACK-00124');
