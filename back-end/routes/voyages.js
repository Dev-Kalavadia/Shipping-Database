const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Voyages = require("../schema/voyages");

router.get("/", async (req, res) => {
    const q = req.query;
    try {
        Voyages.find({})
            .limit(100)
			.exec((err, docs) => {
				if (err) {
					res.json({
						success: false,
					});
				} else {
					Voyages.find({})
						.countDocuments((err, count) => {
							res.json({
								docs,
								count,
							});
						});
				}
			});
    } catch (err) {
        res.json({
            success: false,
        });
    }
});

module.exports = router;