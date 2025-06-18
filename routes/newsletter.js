const express = require("express");
const router = express.Router();

const {
  isAlreadySubscribed,
  addSubscriber,
  removeSubscriber,
} = require("../firebase/firebaseService");

const { sendWelcomeEmail } = require("../services/mailService");

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email." });
  }

  try {
    const alreadySubscribed = await isAlreadySubscribed(email);

    if (alreadySubscribed) {
      return res
        .status(200)
        .json({ success: true, message: "You're already subscribed!" });
    }

    await addSubscriber(email);
    await sendWelcomeEmail(email); // this uses subscribe@picknaut.com

    return res
      .status(200)
      .json({ success: true, message: "Subscription successful. Welcome email sent!" });
  } catch (err) {
    console.error("Subscribe Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
});

router.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email." });
  }

  try {
    await removeSubscriber(email);
    return res
      .status(200)
      .json({ success: true, message: "You've been unsubscribed." });
  } catch (err) {
    console.error("Unsubscribe Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Try again." });
  }
});

module.exports = router;
