require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors()); // TAKE THIS OUT IN YOUR REAL APP

app.use(bodyParser.json()); // for parsing application/json

// Initialize Authy stuff
const Client = require("authy-client").Client;
const authy = new Client({ key: process.env.AUTHY_API_KEY });
const enums = require("authy-client").enums;

app.post("/submit/phone", function(req, res) {
  const { phoneNumber, countryCode } = req.body;
  console.log("Phone number received: " + phoneNumber);
  console.log("Country: " + countryCode);

  authy
    .startPhoneVerification({
      countryCode,
      locale: "en",
      phone: phoneNumber,
      via: enums.verificationVia.SMS,
    })
    .then(authyResponse => {
      console.log("Phone is valid", authyResponse);
      res.status(200).json({ phoneNumber, countryCode });
    })
    .catch(err => {
      const { violation } = err.errors.phone[0];
      res.status(err.code).send(violation);
    });
});

app.post("/submit/verify", function(req, res) {
  const { code, phoneNumber, countryCode } = req.body;
  console.log("Verification code received: " + code);
  console.log("Phone number received: " + phoneNumber);
  console.log("Country: " + countryCode);

  authy
    .verifyPhone({
      countryCode,
      phone: phoneNumber,
      token: code,
    })
    .then(authyResponse => {
      console.log("Verification code is correct", authyResponse);
      res.status(200).json({ code, phoneNumber, countryCode });
    })
    .catch(err => res.status(err.code).send(err.body));
});

app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});
