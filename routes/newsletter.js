const express = require("express");
const router = express.Router();
const { addSubscriber, removeSubscriber } = require("../firebase/firebaseService");
const { sendWelcomeEmail } = require("../services/mailService");

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  await addSubscriber(email);
  await sendWelcomeEmail(email);
  res.json({ success: true, message: "Subscribed!" });
});

router.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;
  await removeSubscriber(email);
  res.json({ success: true, message: "Unsubscribed!" });
});

module.exports = router;
