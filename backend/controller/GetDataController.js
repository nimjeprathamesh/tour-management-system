import db from "../db/db.js";

export const GetDestinations = (req, res) => {
    const query = "SELECT * FROM destinations";

    db.query(query, (err, results) => {
        try {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "An error occurred" });
            }
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: "No destinations found." });
            }
            res.status(200).json({ success: true, data: results });
        } catch (error) {
            console.error("Unexpected error:", error);
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
    });
};

export const GetPackages = (req, res) => {
    const query = "SELECT * FROM packages";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No packages found." });
        }
        res.status(200).json({ success: true, data: results });
    });
};

export const GetTestimonials = (req, res) => {
    const query = "SELECT * FROM testimonials";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No testimonials found." });
        }
        res.status(200).json({ success: true, data: results });
    });
};

export const GetMemberships = (req, res) => {
    const query = "SELECT * FROM memberships";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No membership found." });
        }
        res.status(200).json({ success: true, data: results });
    });
};

export const GetContactInfo = (req, res) => {
    const query = "SELECT * FROM contactinfo";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No contactinfo found." });
        }
        res.status(200).json({ success: true, data: results });
    });
};

export const GetSubscription = (req, res) => {
    const query = "SELECT * FROM subscription";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No subscriptions found." });
        }
        res.status(200).json({ success: true, data: results });
    });
};