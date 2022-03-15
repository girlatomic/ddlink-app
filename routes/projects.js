var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all projects
router.get("/", async (req, res) => {
  try {
    let results = await db("SELECT * FROM projects");
    console.log("****", results);
    let projects = results.data;
    res.send(projects);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET project by Id
router.get("/:id", async (req, res) => {
  let projectId = req.params.id;

  try {
    let results = await db(`SELECT * FROM projects WHERE id = ${projectId}`);
    let projects = results.data;
    if (projects.length === 0) {
      res.status(404).send({ error: "Project not found" });
    } else {
      res.send(projects[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
