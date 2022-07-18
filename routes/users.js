var express = require("express");
const { ensureSameUser } = require("../middleware/guards");
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "database",
  multipleStatements: true,
  charset: "utf8mb4",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

function joinToJson(results) {
  let row0 = results.data[0];

  // Create skills array
  let skills = results.data.map((row) => ({
    id: row.skillId,
    s_role: row.s_role,
    skill_name: row.skill_name,
  }));

  // Create user obj
  let user = {
    id: row0.userId,
    given_name: row0.given_name,
    family_name: row0.family_name,
    bio: row0.bio,
    email: row0.email,
    picture: row0.picture,
    u_role: row0.u_role,
    skills,
  };

  return user;
}

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
  let sql = `SELECT * FROM users WHERE id = ${userId} `;

  try {
    let results = await db(sql);
    let user = results.data[0];
    if (user.length === 0) {
      res.status(404).send({ error: "User not found" });
    } else {
      let sql = `
          SELECT u.*, s.*, u.id AS userId, s.id AS skillId
          FROM users AS u
          LEFT JOIN users_skills AS us ON u.id = us.userId
          LEFT JOIN skills AS s ON us.skillId = s.id
          WHERE u.id = ${user.id}
      `;
      let results = await db(sql);
      console.log("reessss", results);
      // Convert DB results into "sensible" JSON
      user = joinToJson(results);

      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});

// POST a new user
router.post("/", async (req, res) => {
  let items = req.body;

  let sql = "INSERT INTO `users_skills` (userId, skillId) VALUES ?";
  con.query(
    sql,
    [items.map((item) => [item.userId, item.skillId])],
    function (err) {
      if (err) throw err;
    }
  );
});

// EDIT USER PROFILE
router.put("/:userId", async (req, res, next) => {
  let { userId } = req.params;
  let { bio, u_role } = req.body;

  let sql = `SELECT * FROM users WHERE id = ${userId} `;
  let update = `UPDATE users SET bio = '${bio}', u_role = '${u_role}' WHERE id = ${userId}`;

  try {
    await db(update);
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
