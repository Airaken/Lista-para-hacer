const express = require('express')
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

app.post('/usuario', (req, res) => {
    const sql = 'INSERT INTO usuarios (nombre, correo, clave) VALUES($1, $2, $3) RETURNING *'
    let clave = bcrypt.hashSync(req.body.clave, 10)
    const values = [req.body.nombre, req.body.correo, clave]
    client.connect();
    client.query(sql, values, (err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({ ok: true, usuario: response.rows })
        console.log(response.rows);
        client.end()
    });
});

app.get('/usuario/correo', (req, res) => {
    const sql = "SELECT * FROM usuarios WHERE correo = '" + req.body.correo + "'";
    client.connect();
    client.query(sql, (err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({ ok: true, usuario: response.rows })
        console.log(response.rows);
        client.end()
    });
});

module.exports = app;