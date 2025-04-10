const { Master } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const MasterRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || !reg_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingMaster = await Master.findOne({ where: { email } });
    if (existingMaster) {
      return res.status(400).json({ message: "Email already exists" });
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Master.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "Master registered successfully", student });
  } catch (error) {
    console.error("Error in Master registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const MasterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Master = await Master.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ message: "Invalid email, user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, Master.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: Master.id,  role: "Master" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in Master login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



