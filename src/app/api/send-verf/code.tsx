import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Here is where you configure the transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.your-email-provider.com', // Replace with your SMTP provider's host
    port: 587, // 465 for secure, 587 for TLS
    secure: false, // true for port 465, false for port 587
    auth: {
      user: 'your-email@example.com', // Replace with your email address
      pass: 'your-email-password', // Replace with your email password or an app-specific password
    },
    logger: true,   // Enable detailed logging
    debug: true,    // Enable debug mode
  });

  const mailOptions = {
    from: '"Your App Name" <your-email@example.com>', // Sender address
    to: email, // List of receivers
    subject: 'Your Verification Code', // Subject line
    text: `Your verification code is: ${verificationCode}`, // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId); // Log the message ID
    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message); // Log the error message
      res.status(500).json({ error: 'Failed to send verification code', details: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Failed to send verification code', details: 'Unexpected error occurred' });
    }
  }
}
