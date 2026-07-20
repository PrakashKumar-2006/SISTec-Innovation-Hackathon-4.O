const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const sendConfirmationEmail = async (leaderEmail, leaderName, teamName, registrationId) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: SMTP email configurations not set in .env. Skipping email dispatch.');
    return true;
  }

  const transporter = createTransporter();
  const mailOptions = {
    from: `"SIH 4.0 Hackathon" <${process.env.EMAIL_USER}>`,
    to: leaderEmail,
    subject: `SIH 4.0 Registration Successful! - Team ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fdfdfd;">
        <div style="text-align: center; border-bottom: 2px solid #D8AB55; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #161619; margin: 0;">Smart India Hackathon 4.0</h2>
          <p style="color: #D8AB55; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; letter-spacing: 1px;">SISTec Innovation Hackathon</p>
        </div>
        
        <div style="color: #333333; line-height: 1.6;">
          <p>Dear <strong>${leaderName}</strong>,</p>
          
          <p>Congratulations! Your team <strong>"${teamName}"</strong> has successfully registered for the <strong>Smart India Hackathon 4.0 (SIH 4.0)</strong> at Sagar Institute of Science & Technology (SISTec-R).</p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #D8AB55; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #666666;">Your Unique Registration ID is:</p>
            <h3 style="margin: 5px 0 0 0; color: #D8AB55; font-family: monospace; font-size: 22px; letter-spacing: 2px;">${registrationId}</h3>
          </div>
          
          <p>Please keep this Registration ID safe. You will need it to reference your nomination, check results, and upload future project milestone guidelines.</p>
          
          <p><strong>Next Steps:</strong></p>
          <ul style="padding-left: 20px;">
            <li>Abstract guidelines and submission templates will be sent to this email address shortly.</li>
            <li>Ensure your team members are notified of the success.</li>
          </ul>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
            This is an automated notification. Please do not reply directly to this email. For any queries, contact the hackathon organization committee.
          </p>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Confirmation email successfully sent to ${leaderEmail}. MessageId: ${info.messageId}`);
  return true;
};

const sendSelectionEmail = async (teamData, isShortlisted) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: SMTP email configurations not set in .env. Skipping selection email dispatch.');
    return true;
  }

  const transporter = createTransporter();
  const { leaderEmail, leaderName, teamName, registrationId, evaluationRound, psTitle, theme } = teamData;

  let subject = '';
  let htmlContent = '';

  if (isShortlisted) {
    subject = `SIH 4.0 Selection Update: Congratulations Team ${teamName}!`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fdfdfd;">
        <div style="text-align: center; border-bottom: 2px solid #D8AB55; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #161619; margin: 0;">Smart India Hackathon 4.0</h2>
          <p style="color: #D8AB55; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; letter-spacing: 1px;">Selection Notification</p>
        </div>
        
        <div style="color: #333333; line-height: 1.6;">
          <p>Dear <strong>${leaderName}</strong>,</p>
          <p>Congratulations! We are thrilled to inform you that your team <strong>"${teamName}"</strong> has been <strong style="color: #2e7d32;">Shortlisted</strong> for the <strong>${evaluationRound}</strong>.</p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #D8AB55; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>Registration ID:</strong> ${registrationId}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>Theme:</strong> ${theme}</p>
            <p style="margin: 0; font-size: 14px; color: #666666;"><strong>Problem Statement:</strong> ${psTitle}</p>
          </div>
          
          <p>Your team's submission stood out among many excellent entries. Please prepare for the next round of evaluation. Further instructions and logistics will be communicated to you shortly.</p>
          <p>Keep up the great work and best of luck in the next phase!</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
            This is an automated notification. Please do not reply directly to this email. For any queries, contact the hackathon organization committee.
          </p>
        </div>
      </div>
    `;
  } else {
    subject = `SIH 4.0 Selection Update: Team ${teamName}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fdfdfd;">
        <div style="text-align: center; border-bottom: 2px solid #D8AB55; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #161619; margin: 0;">Smart India Hackathon 4.0</h2>
          <p style="color: #D8AB55; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; letter-spacing: 1px;">Selection Notification</p>
        </div>
        
        <div style="color: #333333; line-height: 1.6;">
          <p>Dear <strong>${leaderName}</strong>,</p>
          <p>Thank you for participating in SIH 4.0. After careful evaluation, your team <strong>"${teamName}"</strong> has not been shortlisted for the next round.</p>
          
          <p>The competition this year was incredibly strong, and unfortunately, we could only move forward with a limited number of teams. We sincerely appreciate the effort, time, and creativity you and your team put into your submission.</p>
          
          <p>We encourage you to continue developing your ideas and participate in future editions of our hackathon and other innovation challenges.</p>
          <p>Wishing you the very best in your future endeavors.</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
            This is an automated notification. Please do not reply directly to this email. For any queries, contact the hackathon organization committee.
          </p>
        </div>
      </div>
    `;
  }

  const mailOptions = {
    from: `"SIH 4.0 Hackathon" <${process.env.EMAIL_USER}>`,
    to: leaderEmail,
    subject: subject,
    html: htmlContent
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Selection email (${isShortlisted ? 'Shortlisted' : 'Not Shortlisted'}) sent to ${leaderEmail}. MessageId: ${info.messageId}`);
  return true;
};

const sendSupportAckEmail = async (leaderEmail, leaderName, payload) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: SMTP email configurations not set in .env. Skipping support ack email dispatch.');
    return true;
  }

  const transporter = createTransporter();
  
  const { category, referenceId, teamName, subject, message } = payload;
  const submissionDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const mailOptions = {
    from: `"SIH 4.0 Support" <${process.env.EMAIL_USER}>`,
    to: leaderEmail,
    subject: `Support Request Received: ${category} - [Ref: ${referenceId}]`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fdfdfd;">
        <div style="text-align: center; border-bottom: 2px solid #D8AB55; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #161619; margin: 0;">Smart India Hackathon 4.0</h2>
          <p style="color: #D8AB55; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; letter-spacing: 1px;">Help & Support Center</p>
        </div>
        
        <div style="color: #333333; line-height: 1.6;">
          <p>Dear <strong>${leaderName}</strong>,</p>
          <p>This is to confirm that we have successfully received your support request.</p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #D8AB55; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>Reference ID:</strong> <span style="font-family: monospace;">${referenceId}</span></p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>Category:</strong> ${category}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>Submission Date:</strong> ${submissionDate}</p>
            ${teamName ? `<p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>Team Name:</strong> ${teamName}</p>` : ''}
          </div>
          
          <p><strong>Expected Response Time:</strong> Our support team typically responds within 24–48 business hours.</p>
          <p><em>Please do not submit duplicate requests for the same issue, as this may delay the resolution process.</em></p>
          
          <p>If you need to provide additional information, you can reply directly to this email or contact us at <a href="mailto:support@sistec.ac.in" style="color: #D8AB55;">support@sistec.ac.in</a>.</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
            &copy; ${new Date().getFullYear()} SIH 4.0 Organizing Committee | Sagar Institute of Science & Technology
          </p>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Support Ack email sent to ${leaderEmail}. MessageId: ${info.messageId}`);
  return true;
};

const sendChangeRequestEmail = async (leaderEmail, leaderName, payload, isApproved) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: SMTP email configurations not set in .env. Skipping change request email dispatch.');
    return true;
  }

  const transporter = createTransporter();
  const { teamName, requestedPsid, requestedPsTitle, adminRemarks } = payload;
  const statusStr = isApproved ? 'Approved' : 'Rejected';
  const statusColor = isApproved ? '#2e7d32' : '#d32f2f';

  const mailOptions = {
    from: `"SIH 4.0 Support" <${process.env.EMAIL_USER}>`,
    to: leaderEmail,
    subject: `Problem Statement Change Request ${statusStr} - Team ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fdfdfd;">
        <div style="text-align: center; border-bottom: 2px solid #D8AB55; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #161619; margin: 0;">Smart India Hackathon 4.0</h2>
          <p style="color: #D8AB55; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; letter-spacing: 1px;">Change Request Update</p>
        </div>
        
        <div style="color: #333333; line-height: 1.6;">
          <p>Dear <strong>${leaderName}</strong>,</p>
          <p>Your request to change your team's problem statement has been <strong style="color: ${statusColor};">${statusStr}</strong>.</p>
          
          ${isApproved ? `
          <div style="background-color: #f9f9f9; border-left: 4px solid #2e7d32; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>New Problem Statement:</strong></p>
            <p style="margin: 0; font-size: 16px; color: #161619;"><strong>${requestedPsid}</strong> - ${requestedPsTitle}</p>
          </div>
          ` : ''}
          
          ${adminRemarks ? `
          <div style="background-color: #fff8e1; border-left: 4px solid #fbc02d; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>Admin Remarks:</strong></p>
            <p style="margin: 0; font-size: 14px; color: #333333;">${adminRemarks}</p>
          </div>
          ` : ''}
          
          <p>If you have any further questions, please contact our support team at <a href="mailto:support@sistec.ac.in" style="color: #D8AB55;">support@sistec.ac.in</a>.</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
            &copy; ${new Date().getFullYear()} SIH 4.0 Organizing Committee | Sagar Institute of Science & Technology
          </p>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Change Request email sent to ${leaderEmail}. MessageId: ${info.messageId}`);
  return true;
};

module.exports = {
  sendConfirmationEmail,
  sendSelectionEmail,
  sendSupportAckEmail,
  sendChangeRequestEmail
};
