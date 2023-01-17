const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ships = require("../schema/ships");

router.get("/", async (req, res) => {
    const q = req.query;
    try {
        Ships.find({})
            .limit(100)
			.exec((err, docs) => {
				if (err) {
					res.json({
						success: false,
					});
				} else {
					Ships.find({})
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