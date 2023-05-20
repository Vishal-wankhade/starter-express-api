const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  // Create a transporter using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vdwamt04@gmail.com",
      pass: "mnbvcxz@1234",
    },
  });

  // Configure the email options
  const mailOptions = {
    from: "vdwamt04@gmail.com",
    to: "vwankhade120@gmail.com",
    subject: "New Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Mobile: ${mobile}
      Subject: ${subject}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred while sending the email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Form submission successful!");
    }
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
