const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
mongoose.connect(
  "-----mongodb-----connection_url",
);

const User = mongoose.model("pichhiUser", {
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.json({ message: "User already exists" });
  }
  const user = new User({ name: username, email: email, password: password });
  user.save();
  res.json({
    msg: "User created successfully",
  });
});

app.listen(3000);
