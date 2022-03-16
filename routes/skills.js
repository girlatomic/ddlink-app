var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all skills
router.get("/", async (req, res) => {
  try {
    let results = await db("SELECT * FROM skills");
    let skills = results.data;
    res.send(skills);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET skill by Id
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

// POST new skill
router.post("/", async (req, res) => {
  let { s_role, skill_name } = req.body;

  let sql = `
      INSERT INTO skills (s_role, skill_name)
      VALUES ('${s_role}', '${skill_name}')
  `;

  try {
    await db(sql);
    let result = await db("SELECT * FROM skills");
    let skills = result.data;
    res.status(201).send(skills);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
