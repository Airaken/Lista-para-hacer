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


app.post('/tarea', (req, res) => {
    const sql = 'INSERT INTO tareas (titulo, descripcion, usuario_id) VALUES($1, $2, $3) RETURNING *'
    const values = [req.body.titulo, req.body.descripcion, req.body.usuario_id]
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

app.get('/tareas/usuario', (req, res) => {
    const sql = "SELECT * FROM tareas WHERE usuario_id = '" + req.body.usuario_id + "'";
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