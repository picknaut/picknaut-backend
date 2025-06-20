const db = require('./firebaseConfig');

exports.db = db; // ← ADD THIS if it's missing

// Blog Posts
exports.getAllPosts = async () => {
  const ref = db.ref("posts");
  const snapshot = await ref.once("value");
  return snapshot.val();
};

exports.savePost = async (slug, data) => {
  const ref = db.ref("posts/" + slug);
  await ref.set(data);
};

// Newsletter
exports.addSubscriber = async (email) => {
  const ref = db.ref("subscribers");
  await ref.push({ email, subscribedAt: new Date().toISOString() });
};

exports.removeSubscriber = async (email) => {
  const ref = db.ref("subscribers");
  const snapshot = await ref.once("value");
  snapshot.forEach(child => {
    if (child.val().email === email) {
      child.ref.remove();
    }
  });
};

// Check if email exists in subscribers
exports.isAlreadySubscribed = async (email) => {
  const ref = db.ref("subscribers");
  const snapshot = await ref.once("value");

  let exists = false;
  snapshot.forEach((child) => {
    if (child.val().email === email) {
      exists = true;
    }
  });

  return exists;
};

// Add new email
exports.subscribeEmail = async (email) => {
  const ref = db.ref("newsletter");
  await ref.push({ email, subscribedAt: new Date().toISOString() });
};

exports.incrementListCount = async () => {
  const ref = db.ref("List");
  const snapshot = await ref.once("value");
  const current = snapshot.val() || 0;
  await ref.set(current + 1);
};
