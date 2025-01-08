const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static Signup Function    // encryptimg the password
userSchema.statics.signup = async (email, password) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw Error("Email already exits!");
  }
  const salt = await bcrypt.genSalt(10); // here genSalt method is like adding random num or text to our passwor to "encrypt"
  const hash = await bcrypt.hash(password, salt); //hash mmethod is like hashing password durging the enter

  const user = await User.create({ email, password: hash });
  return user;
};

// Static Login Function
userSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw Error("Email incorrect!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password!");
  }
  return user;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;