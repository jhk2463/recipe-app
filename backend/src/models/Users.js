const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

module.exports = mongoose.model("users", UserSchema);
