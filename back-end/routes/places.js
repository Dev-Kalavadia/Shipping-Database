const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Places = require("../schema/places");

router.post("/search/", async (req, res) => {
    const q = req.query;
    let sortParam = {};
    let searchfilter = {};

    if (q.sortBy && q.sortType) {
        sortParam = {
            [q.sortBy]: [q.sortType],
        }
    }

    if (q.Name){var regex = new RegExp(["^", q.Name, "$"].join(""), "i"); searchfilter.Name=regex}
    if (q.modernName){var regex = new RegExp(["^", q.modernName, "$"].join(""), "i"); searchfilter.modernName=regex}
    if (q.codef && q.codet){searchfilter["code"]={$gte : q.codef, $lte : q.codet}}
    if (q.codef && !q.codet){searchfilter["code"]={$gte : q.codef}}
    if (q.codet && !q.codef){searchfilter["code"]={$lt : q.codet}}

    try {
        Places
            .find(searchfilter)
            .limit(100)
            .sort(sortParam)
            .skip(q.page*100)
			.exec((err, docs) => {
				if (err) {
					res.json({
						success: false,
					});
				} else {
					Places
                        .find(searchfilter)
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

router.get("/", async (req, res) => {
    const q = req.query;
    let sortParam = {};

    if (q.sortBy && q.sortType) {
        sortParam = {
            [q.sortBy]: [q.sortType],
        }
    }

    try {
        Places.find({})
            .limit(100)
            .sort(sortParam)
            .skip(q.page*100)
			.exec((err, docs) => {
				if (err) {
					res.json({
						success: false,
					});
				} else {
					Places.find({})
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