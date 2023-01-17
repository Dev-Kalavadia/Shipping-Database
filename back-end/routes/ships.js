const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ships = require("../schema/ships");

router.get("/", async (req, res) => {
    const q = req.query;
    let sortParam = {};

    if (q.sortBy && q.sortType) {
        sortParam = {
            [q.sortBy]: [q.sortType],
        }
    }

    try {
        Ships.find({})
            .limit(100)
            .sort(sortParam)
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