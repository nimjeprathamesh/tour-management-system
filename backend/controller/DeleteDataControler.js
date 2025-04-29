import db from "../db/db.js";

export const DeleteDestination = (req, res) => {
    const { id } = req.query;
    const query = "DELETE FROM destinations WHERE id = ?";

    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Destination not found." });
        }
        res.status(200).json({ success: true, message: "Destination deleted successfully" });
    });
};

export const DeletePackage = (req, res) => {
    const { id } = req.query;
    const query = "DELETE FROM packages WHERE id = ?";

    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Package not found." });
        }
        res.status(200).json({ success: true, message: "Package deleted successfully" });
    });
};

export const DeleteTestimonial = (req, res) => {
    const { id } = req.query;
    const query = "DELETE FROM testimonials WHERE id = ?";

    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Testimonial not found." });
        }
        res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
    });
};

export const DeleteMembership = (req, res) => {
    const { id } = req.query;
    const query = "DELETE FROM memberships WHERE id = ?";

    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Membership not found." });
        }
        res.status(200).json({ success: true, message: "Membership deleted successfully" });
    });
};

export const DeleteContactInfo = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM contactinfo WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Contact info not found." });
        }
        res.status(200).json({ success: true, message: "Contact info deleted successfully" });
    });
};

export const DeleteSubscription = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM subscription WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Subscription not found." });
        }
        res.status(200).json({ success: true, message: "Subscription deleted successfully" });
    });
};