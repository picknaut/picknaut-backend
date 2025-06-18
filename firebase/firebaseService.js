const db = require('./firebaseConfig');

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
