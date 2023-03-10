const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Places = require("../schema/places");

router.get("/:id", (req, res) => {
  const {id} = req.params
  Places.find({Name:id}, (err, doc) => {
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
    if (q.Name){
      Places
      .aggregate([
          {
            $search: {
              "autocomplete": {
                "path": "Name",
                "query": q.Name
              }
            }
          },
          { $group: {_id: null, Name: {$addToSet: "$Name"}}},
          { $unwind: "$Name" },
          { $project: { _id: 0 }},
          {
            $limit: 5
          },
          {
            $project: {
              "_id": 0,
              "Name": 1,
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
    if (q.modernName){
        Places
        .aggregate([
            {
              $search: {
                "autocomplete": {
                  "path": "modernName",
                  "query": q.modernName
                }
              }
            },
            { $group: {_id: null, modernName: {$addToSet: "$modernName"}}},
            { $unwind: "$modernName" },
            { $project: { _id: 0 }},
            {
              $limit: 5
            },
            {
              $project: {
                "_id": 0,
                "modernName": 1,
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