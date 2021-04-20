const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

// port will be 5000 for testing
const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();
// cors
app.use(cors({ origin: "*" }));
// make public static
app.use("/public", express.static(process.cwd() + "/public")); //make public static

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "joshnussbaum89@gmail.com",
    pass: "Slamti1me",
  },
});

// verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log(transporter.options.host);
    console.log("Error: ", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, (err, fields) => {
    console.log(fields);
    Object.keys(fields).forEach((property) => {
      data[property] = fields[property].toString();
    });

    const mail = {
      from: data.name,
      to: "joshnussbaum89@gmail.com",
      subject: data.subject,
      text: `From: ${data.name}, <${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).json({ status: "success" });
      }
    });
  });
});

// make the contact page the first page on the app
app.route("/").get((req, res) => {
  res.sendFile(`${process.cwd()}/public/index.html`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
