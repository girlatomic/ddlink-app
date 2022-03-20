var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { OAuth2Client } = require('google-auth-library');
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)

router.post("/login", async (req, res, next) => {
    const { token }  = req.body;
    console.log('this is token', token);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    console.log('this is ticket', ticket);
    const { given_name, family_name, email, picture } = ticket.getPayload();
    let sql = `
            INSERT INTO users (given_name, family_name, email, picture)
            VALUES ('${given_name}', '${family_name}', '${email}', '${picture}')
            ON DUPLICATE KEY UPDATE given_name = VALUES(given_name), family_name = VALUES(family_name), picture = VALUES(picture);
    `;

    try {
        await db(sql);
        let result = await db(`SELECT * FROM users WHERE email = '${email}'`);
        if (result.data.length === 0) {
            res.status(401).send({ error: 'Login failed' });
        } else {
        let user = result.data[0]
        let payload = { userId: user.id };
        let token = jwt.sign(payload, process.env.SECRET_KEY);
        console.log ('this is the new jwt token', token, user);
        res.send({
            message: 'Login succeeded',
            token: token,
            user: user
        });
        } 
    } catch (err) {
        next(err);
    }
});

module.exports = router;