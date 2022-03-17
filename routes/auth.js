var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
// const users = [];

// function upsert(array, item) {
//     const i = array.findIndex((_item) => _item.email === item.email);
//     if (i > -1) array[i] = item;
//     else array.push(item);
//   }

router.post("/login", async (req, res) => {
    const { token }  = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const { given_name, family_name, email, picture } = ticket.getPayload();
    let sql = `
            INSERT INTO users (given_name, family_name, email, picture)
            VALUES ('${given_name}', '${family_name}', '${email}', '${picture}')
            ON DUPLICATE KEY UPDATE given_name = VALUES(given_name), family_name = VALUES(family_name), picture = VALUES(picture);
    `;

    try {
        await db(sql);
        let result = await db(`SELECT * FROM users WHERE email = '${email}'`);
        let user = result.data;
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
    // res.status(201);
    // res.json({ given_name, family_name, email, picture });
});

module.exports = router;