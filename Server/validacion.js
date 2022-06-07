/*
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var msgNotificacion = ""

//Connexion a la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_adopcion'
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
*/
/**Testing */
app.listen(4000, () => {
    console.log('Funcionando')
})

/**Conexiones DB Solicitud */
app.get("/api/Solicitud/get", (req, res) => {
    const sqlSelect = "SELECT * FROM solicitud";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.get("/api/Solicitud/get/:id", (req, res) => {

    const id = req.params.id;

    const sqlSelect = "SELECT * FROM solicitud WHERE id = ?";
    db.query(sqlSelect, id,  (err, result) => {
        res.send(result);
    })
})

app.post('/api/Notificacion/insert', (req, res) => {

    const id_solicitud = req.body.id_solicitud;
    const mensaje = msgNotificacion

    const sqlInsert = "INSERT INTO notificacion (id_solicitud, mensaje) VALUES (?, ?)"
    db.query(sqlInsert, [id_solicitud, mensaje],(err, result) => {
        res.send("Enviado");
    });
})

app.get("/api/Notificacion/get", (req, res) => {
    const sqlSelect = "SELECT * FROM notificacion";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})