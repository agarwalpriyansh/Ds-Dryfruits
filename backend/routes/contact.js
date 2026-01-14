const router = require('express').Router();
const nodemailer = require('nodemailer');

// Create transporter - using Gmail SMTP
// Note: You'll need to set up environment variables for email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

router.route('/').post(async (req, res) => {
  try {
    const { name, mobile, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !mobile || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Log environment variables (masked for security)
    console.log('Email User:', process.env.EMAIL_USER ? 'Set' : 'Not Set');
    console.log('Email Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dryfruits.ds@gmail.com',
      subject: subject || `Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    console.log('Message ID:', info.messageId);

    res.json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email detail:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.',
      error: error.message // Return error message to client for debugging
    });
  }
});

module.exports = router;

