import mongoose from "mongoose";
import { uuid } from "uuidv4";

const User = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

User.statics.findByUserEmail = function (email) {
  return this.find({ email: email }, "_id firstname");
};

export default mongoose.model("User", User);
