var express = require("express");
var router = express.Router();
const db = require("../model/helper");


/**
 * Guards
 **/


 async function ensureSkillExists(req, res, next) {
  try {
      let results = await db(`SELECT * FROM skills WHERE id = ${req.params.id}`);
      if (results.data.length === 1) {
          // Skill was found; save it in response obj for the route function to use
          res.locals.skill = results.data[0];
          // Let next middleware function run
          next();
      } else {
          res.status(404).send({ error: 'Skill not found' });
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
}

/**
 * Helpers
 **/


 async function sendAllSkills(res) {
  // We don't need try/catch here because we're always called from within one
  let results = await db('SELECT * FROM skills');
  res.send(results.data);
}


// Convert DB results into a useful JSON format: author obj with nested array of book objs
function joinToJson(results) {
  // Get first row
  let row0 = results.data[0];

  // Create array of project objs
  let projects = [];
  if (row0.projectId) {
      projects = results.data.map(p => ({
          id: p.projectId,
          p_name: p.p_name,
          p_description: p.p_description,
          p_img: p.p_img
      }));
  }

  // Create skill obj
  let skill = {
      id: row0.skillId,
      s_role: row0.s_role,
      skill_name: row0.skill_name,
      projects
  };

  return skill;
}

function joinToJsonUs(results) {
  // Get first row
  let row0 = results.data[0];

  // Create array of user objs
  let users = [];
  if (row0.userId) {
      users = results.data.map(u => ({
          id: u.userId,
          given_name: u.given_name,
          family_name: u.family_name,
          bio: u.bio,
          email: u.email,
          picture: u.picture
      }));
  }

  // Create skill obj
  let skill = {
      id: row0.skillId,
      s_role: row0.s_role,
      skill_name: row0.skill_name,
      users
  };

  return skill;
}



/**
 * Routes
 **/

// GET all skills
router.get('/', async function(req, res) {
  try {
      sendAllSkills(res);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// GET skill by ID for projects
router.get('/:id/projects', ensureSkillExists, async function(req, res) {
  // If we get here we know the author exists (thanks to guard)
  let skill = res.locals.skill;

  try {
      // Get skill; use LEFT JOIN to also return projects
      let sql = `
          SELECT s.*, p.*, s.id AS skillId, p.id AS projectId
          FROM skills AS s
          LEFT JOIN projects_skills AS ps ON s.id = ps.skillId
          LEFT JOIN projects AS p ON ps.projectId = p.id
          WHERE s.id in (5,6,8)
      `;

      let results = await db(sql);
      // Convert DB results into "sensible" JSON
      skill = joinToJson(results);

      res.send(skill);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// GET skill by ID for users
router.get('/:id/users', ensureSkillExists, async function(req, res) {
  // If we get here we know the author exists (thanks to guard)
  let skill = res.locals.skill;

  try {
      // Get skill; use LEFT JOIN to also return projects
      let sql = `
          SELECT s.*, u.*, s.id AS skillId, u.id AS userId
          FROM skills AS s
          LEFT JOIN users_skills AS us ON s.id = us.skillId
          LEFT JOIN users AS u ON us.userId = u.id
          WHERE s.id = ${skill.id}
      `;

      let results = await db(sql);
      // Convert DB results into "sensible" JSON
      skill = joinToJsonUs(results);

      res.send(skill);
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
