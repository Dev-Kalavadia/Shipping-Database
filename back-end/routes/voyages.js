const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            `https://my.api.mockaroo.com/mealhub.json?key=2f898fd0`
        );
        res.json(response.data);
    } catch (err) {
        res.json({
            success: false,
        });
    }
});

module.exports = router;