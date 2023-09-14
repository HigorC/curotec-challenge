
import mongoose from "mongoose"
import validator from "validator"

const todoSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please provide the todo title"] },
  done: { type: Boolean, required: true },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email addres'],
    unique: [true, 'This email addres already exist'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  todos: [todoSchema],
}, {
  collection: "users",
  timestamps: true
});

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

export default UserModel;