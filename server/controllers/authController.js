import User from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // validation
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    // Check the existence
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }

    // Encrypt password
    const hashedPaswword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      fullName,
      email,
      password: hashedPaswword,
    });

    return res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check the existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    //  Password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }

    // Generate token
    const tokenData = {
      userId: user?._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Login success
    res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        fullName: user?.fullName,
        email: user?.email,
        _id: user?._id,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully!", success: true });
  } catch (error) {
    console.log(error);
  }
};
