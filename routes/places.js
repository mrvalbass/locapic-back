const express = require("express");
const router = express.Router();
const Marker = require("../models/markers");

router.get("/:nickname", async (req, res) => {
  try {
    const places = await Marker.find({ nickname: req.params.nickname });
    res.json({ result: true, places });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    await new Marker({
      nickname: req.body.nickname,
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    }).save();
    res.json({ result: true });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Marker.deleteOne({
      nickname: req.body.nickname,
      name: req.body.name,
    });
    res.json({ result: true });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

module.exports = router;
