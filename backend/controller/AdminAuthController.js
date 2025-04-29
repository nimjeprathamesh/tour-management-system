import bcrypt from "bcryptjs";
import db from "../db/db.js";
import jwt from "jsonwebtoken";

export const AdminRegister = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, message: err || "An error occurred" });
        }

        const checkEmailQuery = "SELECT * FROM admin WHERE email = ?";
        db.query(checkEmailQuery, [email], (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: err || "An error occurred" });
            }

            if (results.length > 0) {
                return res.status(400).json({ success: false, message: "Email is already registered" });
            }

            const query = "INSERT INTO admin (email, password) VALUES (?, ?)";
            db.query(query, [email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err || "An error occurred" });
                }
                res.status(200).json({ success: true, message: "Registration successful" });
            });
        });
    });
};

export const AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailPattern.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const query = "SELECT * FROM admin WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: "An error occurred" });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const admin = results[0];

        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ success: false, error: "An error occurred" });
            }

            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Invalid email or password" });
            }

            const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
                expiresIn: '2h',
            });

            res.status(200).json({
                success: true,
                message: "Login successful",
                token: token,
                id: admin.id,
            });
        });
    });
};