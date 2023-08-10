const mongoose = require("mongoose");
require("stream");

const usrSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", usrSchema);

module.exports = {
  UserModel,
};
