import userModel from "../models/Usermodel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be strong (min 8 chars, mix of letters, numbers, symbols)"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name:name,
      email:email,
      password: hashedPassword,
      cartCount: {}
    });

    const user = await newUser.save();
    const token = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export { loginUser, registerUser };
