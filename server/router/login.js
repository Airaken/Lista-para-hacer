const express = require('express');
const client = require('../config/db');
const app = express();
const jwt = require('jsonwebtoken');
const { validateToken } = require('../middlewares/authentication');
const bcrypt = require('bcrypt');
// this method validate login in the web app
app.post('/login', (req, res) => {
    let body = req.body;
    client.query("SELECT * FROM usuarios WHERE correo = '" + body.email + "';", (err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!bcrypt.compareSync(body.password, response.rows[0].clave)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrecto'
                }
            });
        }
        let token = jwt.sign({
            id: response.rows[0].id
        }, process.env.SEED, { expiresIn: '1h' });
        process.env.TOKEN = token;
        res.json({ ok: true, usuario: response.rows })
    })
});
// this method returns to the user of the session
app.get('/login/usuario', validateToken, (req, res) => {
        let id = req.id;
        const sql = "SELECT * FROM usuarios WHERE id = '" + id + "'";
        client.query(sql, (err, response) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuario: response.rows
            });
        });
    })
    // this method change the token of session to void 
app.get('/logout', (req, res) => {
        process.env.TOKEN = '';
        res.json({
            ok: true,
            message: 'logout successful'
        });
    })
    // exporte module
module.exports = app;