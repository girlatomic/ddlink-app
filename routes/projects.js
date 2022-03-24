var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/**
 * Guards
 **/


//  async function ensureProjectExists(req, res, next) {
//   try {
//       let results = await db(`SELECT * FROM projects WHERE id = ${req.params.id}`);
//       if (results.data.length === 1) {
//           // Project was found; save it in response obj for the route function to use
//           res.locals.project = results.data[0];
//           // Let next middleware function run
//           next();
//       } else {
//           res.status(404).send({ error: 'Project not found' });
//       }
//   } catch (err) {
//       res.status(500).send({ error: err.message });
//   }
// }

/**
 * Helpers
 **/


//  async function sendAllProjects(res) {
//   // We don't need try/catch here because we're always called from within one
//   let results = await db('SELECT * FROM projects');
//   res.send(results.data);
// }

// function joinToJson(results) {
//   let row0 = results.data[0];

//   // Create authors array
//   let skills = results.data.map(row => ({
//       id: row.skillId,
//       s_role: row.s_role,
//       skill_name: row.skill_name,
//   }));

//   // Create book obj
//   let project = {
//       id: row0.projectId,
//       p_name: row0.p_name,
//       p_description: row0.p_description,
//       p_img: row0.p_img,
//       skills
//   }

//   return project;
// }




/**
 * Routes
 **/

// GET all projects
// router.get('/', async function(req, res) {
//   try {
//       (res);
//   } catch (err) {
//       res.status(500).send({ error: err.message });
//   }
// });


router.get('/', async (req, res) => {
  let { skills } = req.query;  // skills === '2,4,6'
  let sql;
  if (skills) {
  sql = `
    SELECT DISTINCT p.* FROM projects AS p 
    LEFT JOIN projects_skills AS ps ON p.id = ps.projectId
    LEFT JOIN skills AS s ON ps.skillId = s.id
    WHERE ps.skillId IN (${skills})
  `;
  } else {
    sql="SELECT * FROM projects"
  }
  let results = await db(sql);
  // project = joinToJson(results);
  res.send(results.data);
})

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

// router.get('/:id', ensureProjectExists, async function(req, res) {
//   // If we get here we know the book exists (thanks to guard)
//   let project = res.locals.project;

//   try {
//       // Get project; we know it exists, thanks to guard
//       // Use LEFT JOIN to also return authors and publisher
//       let sql = `
//           SELECT p.*, s.*, p.id AS projectId, s.id AS skillId
//           FROM projects AS p
//           LEFT JOIN projects_skills AS ps ON p.id = ps.projectId
//           LEFT JOIN skills AS s ON ps.skillId = s.id
//           WHERE p.id = ${project.id}
//       `;
//       let results = await db(sql);
//       // Convert DB results into "sensible" JSON
//       project = joinToJson(results);

//       res.send(project);
//   } catch (err) {
//       res.status(500).send({ error: err.message });
//   }
// });

// POST new project
router.post("/", async (req, res) => {
  let { p_name, p_description, p_img } = req.body;

  let sql = `
      INSERT INTO projects (p_name, p_description, p_img)
      VALUES ('${p_name}', '${p_description}', '${p_img}')
  `;

  try {
    await db(sql);
    let result = await db("SELECT * FROM projects");
    let projects = result.data;
    res.status(201).send(projects);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT request to edit project

router.put('/:id', async (req, res) => {
  let projectId = req.params.id;
  console.log(projectId);
 
  // if (!projectId) {return res.status(404).json({})} 

 let { p_name, p_description, p_img } = req.body;

  let sql = `
      UPDATE projects
      SET p_name = "${p_name}", p_description = "${p_description}", p_img = "${p_img}"
      WHERE id = ${projectId};
  `;

  try {
    await db(sql);
    let result = await db("SELECT * FROM projects");
    let projects = result.data;
    res.status(201).send(projects);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
 });

// DELETE project request

 router.delete('/:id', async (req, res) => {
  let projectId = req.params.id;
  console.log(projectId)

  let sql = `
      DELETE FROM projects
      WHERE id = ${projectId};
  `;
  
  try {
    await db(sql);
    let result = await db("SELECT * FROM projects");
    let projects = result.data;
    res.status(201).send(projects);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
 });

module.exports = router;
