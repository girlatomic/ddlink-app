var express = require("express");
const { ensureSameUser } = require("../middleware/guards");
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
router.get("/:userId", ensureSameUser, async (req, res, next) => {
  let { userId } = req.params;
  let sql = 'SELECT * FROM users WHERE id = ' + userId;

  try {
    let results = await db(sql);
    let user = results.data[0];
    if (user.length === 0) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
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

router.delete("/:id", async (req, res, next) => {
  let userId = req.params.id;

  try {
    let result = await db(`SELECT * FROM users WHERE id = ${userId}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Student not found" });
    } else {
      await db(`DELETE FROM users WHERE id = ${userId}`);
      let result = await db("SELECT * FROM users");
      res.send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
