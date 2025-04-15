const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-login-email", async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP config
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password", // for Gmail use an App Password
    },
  });

  const mailOptions = {
    from: "your_email@gmail.com",
    to: email,
    subject: "Thank you for logging in!",
    text: "Hi there!\n\nThank you for logging in to Ayurniti. We're glad to have you!\n\n– Team Ayurniti",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Thank you email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
