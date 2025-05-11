import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilepic: { type: String ,default:""}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = mongoose.model("registers", userSchema);