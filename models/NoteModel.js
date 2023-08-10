const mongoose = require("mongoose");
require("stream");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, require: true },
    user: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note",noteSchema);

module.exports = { NoteModel};
 
