const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ships = require("../schema/ships");

router.get("/:id", (req, res) => {
    const {id} = req.params
    Ships.find({'ID': id}, (err, doc) => {
        if (err) {
            res.json({
                success: false,
            });
        }
        else {
            res.json(doc)
        }
    })
})

router.post("/suggest/", (req, res) => {
    const q = req.query;
    if (q.name){
      Ships
      .aggregate([
          {
            $search: {
              "autocomplete": {
                "path": "name",
                "query": q.name
              }
            }
          },
          { $group: {_id: null, name: {$addToSet: "$name"}}},
          { $unwind: "$name" },
          { $project: { _id: 0 }},
          {
            $limit: 3
          },
          {
            $project: {
              "_id": 0,
              "name": 1,
            }
          }
      ])
      .exec((err, docs) => {
            if (err) {
                res.json({
                    success: false,
                });
            }
            else {
                res.json(docs)
            }
      })
   }
})

router.post("/search/", async (req, res) => {
    const q = req.query;
    let sortParam = {};
    let searchfilter = {};

    if (q.sortBy && q.sortType) {
        sortParam = {
            [q.sortBy]: [q.sortType],
        }
    }

    if (q.ID){searchfilter.ID=q.ID}
    // if (q.name){var regex = new RegExp(["^", q.name, "$"].join(""), "i"); searchfilter['$or']=[ {otherNames: regex}, {name: regex}]}
    if (q.name){var regex = new RegExp(["^", q.name, "$"].join(""), "i"); searchfilter.name=regex}
    if (q.othername){var regex = new RegExp(["^", q.othername, "$"].join(""), "i"); searchfilter.otherNames=regex}
    if (q.yearInf && q.yearInt){searchfilter["yearIn"]={$gte : q.yearInf, $lte : q.yearInt}}
    if (q.yearOutf && q.yearOutt){searchfilter["yearOut"]={$gte : q.yearOutf, $lte : q.yearOutt}}
    if (q.lastf && q.lastt){searchfilter["last"]={$gte : q.lastf, $lte : q.lastt}}
    if (q.yearInf && !q.yearInt){searchfilter["yearIn"]={$gte : q.yearInf}}
    if (q.yearInt && !q.yearInf){searchfilter["yearIn"]={$lte : q.yearInt}}
    if (q.yearOutf && !q.yearOutt){searchfilter["yearOut"]={$gte : q.yearOutf}}
    if (q.yearOutt && !q.yearOutf){searchfilter["yearOut"]={$lte : q.yearOutt}}
    if (q.lastf && !q.lastt){searchfilter["last"]={$lte : q.lastf}}
    if (q.lastt && !q.lastf){searchfilter["last"]={$lte : q.lastt}}

    try {
        Ships
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
					Ships
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
        Ships.find({})
            .limit(100)
            .sort(sortParam)
            .skip(q.page*100)
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