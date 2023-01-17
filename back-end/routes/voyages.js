const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Voyages = require("../schema/voyages");

router.get("/", async (req, res) => {
    const q = req.query;
    let sortParam = {};

    if (q.sortBy && q.sortType) {
        sortParam = {
            [q.sortBy]: [q.sortType],
        }
    }

    try {
        Voyages.find({})
            .limit(100)
            .sort(sortParam)
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