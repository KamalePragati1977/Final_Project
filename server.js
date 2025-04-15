const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // In-memory storage

// Signup route
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ email, password });
    res.json({ message: "Signup successful" });
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
app.use(express.json()); // already likely added
const cors = require("cors");
app.use(cors());

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Dummy in-memory user database for demo
let users = [
  { email: "test@example.com", password: "123456" }
];

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Check if email exists
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.json({ message: "If this email is registered, a reset link has been sent." });
  }

  // Setup Nodemailer transport (using Gmail here)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',       // replace with your email
      pass: 'your-email-password-or-app-password' // use an app password if 2FA is on
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset - Ayurniti',
    text: 'Here is your password reset link or code. (You can enhance this with a real token system!)'
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send reset email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
