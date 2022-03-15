var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all users
router.get("/", async (req, res) => {
  try {
    let results = await db("SELECT * FROM users");
    let users = results.data;
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET user by Id
router.get("/:id", async (req, res) => {
  let userId = req.params.id;

  try {
    let results = await db(`SELECT * FROM users WHERE id = ${userId}`);
    let users = results.data;
    if (users.length === 0) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.send(users[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  let { first_name, last_name, bio } = req.body;

  let sql = `
      INSERT INTO users (first_name, last_name, bio)
      VALUES ('${first_name}', '${last_name}', '${bio}')
  `;

  try {
    await db(sql);
    let result = await db("SELECT * FROM users");
    let users = result.data;
    res.status(201).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
