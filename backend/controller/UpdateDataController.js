import db from "../db/db.js";

export const UpdateDestination = async (req, res) => {
    const { id } = req.query;
    const { date, name, duration, details, image } = req.body;
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : null;

    if (!formattedDate || isNaN(new Date(date))) {
        return res.status(400).json({ message: "Invalid or missing date", success: false });
    }

    if (!formattedDate || !name || !duration || !details || !image) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query(
            "UPDATE destinations SET date = ?, name = ?, duration = ?, details = ?, image = ? WHERE id = ?",
            [formattedDate, name, duration, details, image, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while updating destination", success: false });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Destination not found", success: false });
                }
                return res.status(200).json({ message: "Destination updated successfully", success: true });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const UpdatePackage = async (req, res) => {
    const { id } = req.query;
    const { title, location, duration, details, price, image } = req.body;

    if (!title || !location || !duration || !details || !price || !image) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query(
            "UPDATE packages SET image = ?, title = ?, location = ?, duration = ?, price = ?, details = ? WHERE id = ?",
            [image, title, location, duration, price, details, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while updating package", success: false });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Package not found", success: false });
                }
                return res.status(200).json({ message: "Package updated successfully", success: true });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const UpdateTestimonial = async (req, res) => {
    const { id } = req.query;
    const { image, feedback, name, designation } = req.body;

    if (!image || !feedback || !name || !designation) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query(
            "UPDATE testimonials SET image = ?, feedback = ?, name = ?, designation = ? WHERE id = ?",
            [image, feedback, name, designation, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while updating testimonial", success: false });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Testimonial not found", success: false });
                }
                return res.status(200).json({ message: "Testimonial updated successfully", success: true });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const UpdateMembership = async (req, res) => {
    const { id } = req.query;
    const { image, type, location, price } = req.body;

    if (!image || !type || !location || !price) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query(
            "UPDATE memberships SET image = ?, type = ?, location = ?, price = ? WHERE id = ?",
            [image, type, location, price, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while updating membership", success: false });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Membership not found", success: false });
                }
                return res.status(200).json({ message: "Membership updated successfully", success: true });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};