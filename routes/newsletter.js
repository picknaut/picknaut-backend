const express = require("express");
const router = express.Router();

const firebaseService = require("../firebase/firebaseService");
const { sendWelcomeEmail } = require("../services/mailService");

router.post("/subscribe", async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const already = await firebaseService.isAlreadySubscribed(email);

    if (already) {
      return res.status(200).json({ message: "Already subscribed." });
    }

    await sendWelcomeEmail(email);
    await firebaseService.addSubscriber(email);
    await firebaseService.incrementListCount();

    return res.status(200).json({ message: "Subscription successful!" });
  } catch (err) {
    console.error("Error during subscription:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email." });
  }

  try {
    await firebaseService.removeSubscriber(email);
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

// Get subscriber count
router.get("/count", async (req, res) => {
  try {
    const ref = firebaseService.db.ref("List");
    const snapshot = await ref.once("value");
    const count = snapshot.val() || 0;
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    res.status(500).json({ error: "Failed to fetch count" });
  }
});

module.exports = router;
