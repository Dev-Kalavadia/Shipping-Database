const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Voyages = require("../schema/voyages");

router.post("/search/", async (req, res) => {
    const q = req.query;
    let sortParam = {};
    let searchfilter = {};

    if (q.sortBy && q.sortType) {
        sortParam = {
            [q.sortBy]: [q.sortType],
        }
    }

    // formatting for dates
    if (q.arrivalmFrom<10){q.arrivalmFrom='0'+q.arrivalmFrom}
    if (q.arrivalmTo<10){q.arrivalmTo='0'+q.arrivalmTo}

    if (q.arrivalyFrom<10){q.arrivalyFrom='000'+q.arrivalyFrom}
    if (q.arrivalyTo<10){q.arrivalyTo='000'+q.arrivalyTo}
    if (q.arrivalyFrom<100 && q.arrivalyFrom>=10){q.arrivalyFrom='00'+q.arrivalyFrom}
    if (q.arrivalyTo<100 && q.arrivalyTo>=10){q.arrivalyTo='00'+q.arrivalyTo}
    if (q.arrivalyFrom<1000 && q.arrivalyFrom>=100){q.arrivalyFrom='0'+q.arrivalyFrom}
    if (q.arrivalyTo<1000 && q.arrivalyTo>=100){q.arrivalyTo='0'+q.arrivalyTo}

    if (q.depamFrom<10){q.depamFrom='0'+q.depamFrom}
    if (q.depamTo<10){q.depamTo='0'+q.depamTo}

    if (q.depayFrom<10){q.depayFrom='000'+q.depayFrom}
    if (q.depayTo<10){q.depayTo='000'+q.depayTo}
    if (q.depayFrom<100 && q.depayFrom>=10){q.depayFrom='00'+q.depayFrom}
    if (q.depayTo<100 && q.depayTo>=10){q.depayTo='00'+q.depayTo}
    if (q.depayFrom<1000 && q.depayFrom>=100){q.depayFrom='0'+q.depayFrom}
    if (q.depayTo<1000 && q.depayTo>=100){q.depayTo='0'+q.depayTo}

    if (q._id){searchfilter._id=q._id}
    if (q.arrivalPlace){var regex = new RegExp(["^", q.arrivalPlace, "$"].join(""), "i"); searchfilter.arrivalPlace=regex}
    if (q.departurePlace){var regex = new RegExp(["^", q.departurePlace, "$"].join(""), "i"); searchfilter.departurePlace=regex}
    if (q.ID){searchfilter.ID=q.ID}
    if (q.shipName){var regex = new RegExp(["^", q.shipName, "$"].join(""), "i"); searchfilter.shipName=regex}

    // nothing is missing
    if (q.arrivalyFrom && q.arrivalyTo && q.arrivalmFrom && q.arrivalmTo){searchfilter["arrivalDate"]={$gte : new Date(q.arrivalyFrom+"-"+q.arrivalmFrom+"-01T00:00:00.000Z"), $lte : new Date(q.arrivalyTo+"-"+q.arrivalmTo+"-"+getDaysInMonth(q.arrivalmTo, q.arrivalyTo)+"T00:00:00.000Z")}}
    // both months from and to are missing
    if (q.arrivalyFrom && q.arrivalyTo && !q.arrivalmFrom && !q.arrivalmTo){searchfilter["arrivalDate"]={$gte : new Date(q.arrivalyFrom+"-01-01T00:00:00.000Z"), $lte : new Date(q.arrivalyTo+"-12-31T00:00:00.000Z")}}
    // month to is missing but years are available
    if (q.arrivalyFrom && q.arrivalyTo && q.arrivalmFrom && !q.arrivalmTo){searchfilter["arrivalDate"]={$gte : new Date(q.arrivalyFrom+"-01-01T00:00:00.000Z"), $lte : new Date(q.arrivalyTo+"-12-31T00:00:00.000Z")}}
    // month from is missing but years are available
    if (q.arrivalyFrom && q.arrivalyTo && !q.arrivalmFrom && q.arrivalmTo){searchfilter["arrivalDate"]={$gte : new Date(q.arrivalyFrom+"-01-01T00:00:00.000Z"), $lte : new Date(q.arrivalyTo+"-12-31T00:00:00.000Z")}}
    // month from and year from are missing
    if (!q.arrivalyFrom && q.arrivalyTo && !q.arrivalmFrom && q.arrivalmTo){searchfilter["arrivalDate"]={$gte : new Date("0001-01-01T00:00:00.000Z"), $lte : new Date(q.arrivalyTo+"-"+q.arrivalmTo+"-"+getDaysInMonth(q.arrivalmTo, q.arrivalyTo)+"T00:00:00.000Z")}}
    // month to and year to are missing
    if (q.arrivalyFrom && !q.arrivalyTo && q.arrivalmFrom && !q.arrivalmTo){searchfilter["arrivalDate"]={$gte : new Date(q.arrivalyFrom+"-"+q.arrivalmFrom+"-"+getDaysInMonth(q.arrivalmFrom, q.arrivalyFrom)+"T00:00:00.000Z"), $lte : new Date("9999-12-31T00:00:00.000Z")}}
    // both months and year to are missing
    if (q.arrivalyFrom && !q.arrivalyTo && !q.arrivalmFrom && !q.arrivalmTo){searchfilter["arrivalDate"]={$gte : new Date(q.arrivalyFrom+"-01-01T00:00:00.000Z")}}
    // both months and year from are missing
    if (!q.arrivalyFrom && q.arrivalyTo && !q.arrivalmFrom && !q.arrivalmTo){searchfilter["arrivalDate"]={$lte : new Date(q.arrivalyTo+"-12-31T00:00:00.000Z")}}

    // nothing is missing
    if (q.depayFrom && q.depayTo && q.depamFrom && q.depamTo){searchfilter["departureDate"]={$gte : new Date(q.depayFrom+"-"+q.depamFrom+"-01T00:00:00.000Z"), $lte : new Date(q.depayTo+"-"+q.depamTo+"-"+getDaysInMonth(q.depamTo, q.depayTo)+"T00:00:00.000Z")}}
    // both months from and to are missing
    if (q.depayFrom && q.depayTo && !q.depamFrom && !q.depamTo){searchfilter["departureDate"]={$gte : new Date(q.depayFrom+"-01-01T00:00:00.000Z"), $lte : new Date(q.depayTo+"-12-31T00:00:00.000Z")}}
    // month to is missing but years are available
    if (q.depayFrom && q.depayTo && q.depamFrom && !q.depamTo){searchfilter["departureDate"]={$gte : new Date(q.depayFrom+"-01-01T00:00:00.000Z"), $lte : new Date(q.depayTo+"-12-31T00:00:00.000Z")}}
    // month from is missing but years are available
    if (q.depayFrom && q.depayTo && !q.depamFrom && q.depamTo){searchfilter["departureDate"]={$gte : new Date(q.depayFrom+"-01-01T00:00:00.000Z"), $lte : new Date(q.depayTo+"-12-31T00:00:00.000Z")}}
    // month from and year from are missing
    if (!q.depayFrom && q.depayTo && !q.depamFrom && q.depamTo){searchfilter["departureDate"]={$gte : new Date("0001-01-01T00:00:00.000Z"), $lte : new Date(q.depayTo+"-"+q.depamTo+"-"+getDaysInMonth(q.depamTo, q.depayTo)+"T00:00:00.000Z")}}
    // month to and year to are missing
    if (q.depayFrom && !q.depayTo && q.depamFrom && !q.depamTo){searchfilter["departureDate"]={$gte : new Date(q.depayFrom+"-"+q.depamFrom+"-"+getDaysInMonth(q.depamFrom, q.depayFrom)+"T00:00:00.000Z"), $lte : new Date("9999-12-31T00:00:00.000Z")}}
    // both months and year to are missing
    if (q.depayFrom && !q.depayTo && !q.depamFrom && !q.depamTo){searchfilter["departureDate"]={$gte : new Date(q.depayFrom+"-01-01T00:00:00.000Z")}}
    // both months and year from are missing
    if (!q.depayFrom && q.depayTo && !q.depamFrom && !q.depamTo){searchfilter["departureDate"]={$lte : new Date(q.depayTo+"-12-31T00:00:00.000Z")}}
    
    if (q.depFrom && q.depTo){searchfilter["depCode"]={$gte : q.depFrom, $lte: q.depTo}}
    if (q.depFrom && !q.depTo){searchfilter["depCode"]={$gte : q.depFrom}}
    if (!q.depFrom && q.depTo){searchfilter["depCode"]={$lte : q.depTo}}

    if (q.arrFrom && q.arrTo){searchfilter["arrCode"]={$gte : q.arrFrom, $lte : q.arrTo}}
    if (q.arrFrom && !q.arrTo){searchfilter["arrCode"]={$gte : q.arrFrom}}
    if (!q.arrFrom && q.arrTo){searchfilter["arrCode"]={$lte : q.arrTo}}

    try {
        Voyages
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
					Voyages
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
        Voyages.find({})
            .limit(100)
            .sort(sortParam)
            .skip(q.page*100)
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