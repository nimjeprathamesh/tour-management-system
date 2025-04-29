import db from "../db/db.js";

export const AddSubscription =async (req, res) => {
    const { subscribe } = req.body;

    if (!subscribe) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query("SELECT * FROM subscription WHERE mail = ?", [subscribe], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", success: false });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: "This email is already subscribed.", success: false });
            } else {
                db.query("INSERT INTO subscription (mail) VALUES (?)", [subscribe], (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Error while subscribing you", success: false });
                    }
                    return res.status(200).json({
                        message: "You subscribe our website successfully.",
                        success: true
                    });
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const AddFeedback = async (req, res) => {
    const { name, email, subject, message } = req.body;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query("INSERT INTO contactinfo (name, email, subject, message) VALUES (?, ?, ?, ?)",
            [name, email, subject, message], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while sending feedback", success: false });
                }
                return res.status(200).json({
                    message: "Feedback sent successfully.",
                    success: true
                });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const AddDestination = async (req, res) => {
    const { date, name, duration, details, image } = req.body;

    if (!date || !name || !duration || !details || !image) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query("INSERT INTO destinations (date, name, duration, details, image) VALUES (?, ?, ?, ?, ?)",
            [date, name, duration, details, image], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while adding destination", success: false });
                }
                return res.status(200).json({
                    message: "Destination added successfully.",
                    success: true
                });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const AddPackage = async (req, res) => {
    const { title, location, duration, details, price, image } = req.body;

    if (!title || !location || !duration || !details || !price || !image) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query("INSERT INTO packages (image, title, location, duration, price, details) VALUES (?, ?, ?, ?, ?, ?)",
            [image, title, location, duration, price, details], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while adding packages", success: false });
                }
                return res.status(200).json({
                    message: "Package added successfully.",
                    success: true
                });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const AddTestimonial = async (req, res) => {
    const { name, designation, image, feedback } = req.body;

    if (!name || !designation || !image || !feedback) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query("INSERT INTO testimonials (image, feedback, name, designation) VALUES (?, ?, ?, ?)",
            [image, feedback, name, designation ], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while adding testimonial", success: false });
                }
                return res.status(200).json({
                    message: "Testimonial added successfully.",
                    success: true
                });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const AddMembership = async (req, res) => {
    const { type, location, image, price } = req.body;

    if (!type || !location || !image || !price) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query("INSERT INTO memberships (image, type, location, price) VALUES (?, ?, ?, ?)",
            [image, type, location, price ], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while adding membership", success: false });
                }
                return res.status(200).json({
                    message: "Membership added successfully.",
                    success: true
                });
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};