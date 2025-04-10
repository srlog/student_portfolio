const { adminMiddleware } = require("../middleware/adminMiddleware");
const { Admin } = require("../models/index");


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body; 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already exists" });
        }    

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Error in admin registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email, user not found" });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }    

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in admin login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}