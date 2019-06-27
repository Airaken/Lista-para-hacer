const express = require('express')
const app = express();
const client = require('../config/db')
const { validateToken } = require('../middlewares/authentication');
app.post('/tarea', validateToken, (req, res) => {
    const sql = 'INSERT INTO tareas (titulo, descripcion, usuario_id) VALUES($1, $2, $3) RETURNING *';
    let id = req.id
    const values = [req.body.titulo, req.body.descripcion, id]
    client.query(sql, values, (err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({ ok: true, tasks: response.rows })
        console.log(response.rows);
    });
});

app.get('/tarea', validateToken, (req, res) => {
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
        res.json({ ok: true, tasks: response.rows })
    });
});

module.exports = app;