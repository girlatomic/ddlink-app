var express = require("express");
const { ensureSameUser } = require("../middleware/guards");
var router = express.Router();
const db = require("../model/helper");

// async function ensureUserExists(req, res, next) {
//   try {
//       let results = await db(`SELECT * FROM users WHERE id = ${req.params.id}`);
//       if (results.data.length === 1) {
//           // Project was found; save it in response obj for the route function to use
//           res.locals.project = results.data[0];
//           // Let next middleware function run
//           next();
//       } else {
//           res.status(404).send({ error: 'User not found' });
//       }
//   } catch (err) {
//       res.status(500).send({ error: err.message });
//   }
// }

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
    s_role: row0.s_role,
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
  let sql = "SELECT * FROM users WHERE id = " + userId;

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
      console.log("sql", sql);
      let results = await db(sql);
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
  let { userId, skillId } = req.body;

  let sql = `
      INSERT INTO users_skills (userId, skillId)
      VALUES ('${userId}', '${skillId}')
  `;

  try {
    await db(sql);
    let result = await db("SELECT * FROM users_skills");
    let users = result.data;
    res.status(201).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// EDIT USER PROFILE
router.put("/:userId", async (req, res, next) => {
  let { userId } = req.params;
  let { s_role, bio } = req.body;

  let sql = `SELECT * FROM users WHERE id = ${userId} `;
  let update = `UPDATE users SET bio = '${bio}', s_role = '${s_role}' WHERE id = ${userId}`;

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
