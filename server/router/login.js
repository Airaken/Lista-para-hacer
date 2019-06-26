const express = require('express');
const app = express();
const { Pool, Client } = require('pg');
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.OGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});
const bcrypt = require('bcrypt');
// this method validate login in the web app
app.post('/login', (req, res) => {
    let body = req.body;
    client.connect();
    client.query("SELECT * FROM usuarios WHERE correo = '" + body.correo + "';", (err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!bcrypt.compareSync(body.clave, response.rows[0].clave)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrecto'
                }
            });
        }
        res.json({ ok: true, usuario: response.rows })
        console.log(response.rows);
        client.end()
    })
});
// this method returns to the user of the session
app.get('/login/user', (req, res) => {
        let id = req.user._id;
        User.findById(id)
            .exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    user
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