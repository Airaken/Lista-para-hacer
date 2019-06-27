const express = require('express')
const app = express();
const client = require('../config/db')
const { validateToken } = require('../middlewares/authentication');
app.post('/task', validateToken, (req, res) => {
    const sql = 'INSERT INTO tareas (titulo, descripcion, usuario_id) VALUES($1, $2, $3) RETURNING *';
    let id = req.id
    console.log(id);
    const values = [req.body.titulo, req.body.descripcion, id]
    client.query(sql, values, (err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({ ok: true, task: response.rows })
        console.log(response.rows);
        client.end()
    });
});

app.get('/task', validateToken, (req, res) => {
    let id = req.id

    const sql = "SELECT * FROM tareas WHERE usuario_id = '" + id + "'";
    client.query(sql, (err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(response.rows);
        res.json({ ok: true, task: response.rows })
        client.end()
    });
});

module.exports = app;