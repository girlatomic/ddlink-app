var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all skills

router.get("/", async (req, res) => {
  console.log("INSIDE SKILLS");
  try {
    let results = await db("SELECT * FROM skills");
    let skills = results.data;
    res.send(skills);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET skills by Id

router.get("/:id", async (req, res) => {
  let skillsId = req.params.id;

  try {
    let results = await db(`SELECT * FROM skills WHERE id = ${skillsId}`);
    let skills = results.data;
    if (skills.length === 0) {
      res.status(404).send({ error: "Skills not found" });
    } else {
      res.send(skills[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
