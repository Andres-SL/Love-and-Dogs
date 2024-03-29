const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { compare } = require('bcryptjs');

//Connexion a la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_adopcion'
})

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        key: "userId",
        secret: "ProjectLD",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

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

app.post('/api/Solicitud/insert', (req, res) => {

    const fecha_solicitud = req.body.fechaSolicitud
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const edad = req.body.edad
    const telefono = req.body.telefono
    const ciudad = req.body.ciudad
    const direccion = req.body.direccion
    const tipo_vivienda = req.body.tipo_vivienda
    const correo = req.body.correo
    const ocupacion = req.body.ocupacion

    const sqlInsert = "INSERT INTO solicitud (fecha_solicitud, nombre, apellido, edad, telefono, ciudad, direccion, tipo_vivienda, correo, ocupacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [fecha_solicitud, nombre, apellido, edad, telefono, ciudad, direccion, tipo_vivienda, correo, ocupacion],(err, result) => {
        res.send("Enviado");
    });
})

app.delete("/api/Solicitud/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM solicitud WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err)
    })
})

app.put("/api/Solicitud/update/:id", (req, res) => {

    const id = req.params.id;
    const fecha_solicitud = req.body.fechaSolicitud
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const edad = req.body.edad
    const telefono = req.body.telefono
    const ciudad = req.body.ciudad
    const direccion = req.body.direccion
    const tipo_vivienda = req.body.tipo_vivienda
    const correo = req.body.correo
    const ocupacion = req.body.ocupacion

    const sqlUpdate = "UPDATE solicitud SET fecha_solicitud = ?, nombre = ?, apellido = ?, edad = ?, telefono = ?, ciudad = ?, direccion = ?, tipo_vivienda = ? correo = ?, ocupacion = ? WHERE id = ?";

    db.query(sqlUpdate, [fecha_solicitud, nombre, apellido, edad, telefono, ciudad, direccion, tipo_vivienda, correo, ocupacion, id], (err, result) => {
        if (err) console.log(err)
    })
})

/**Conexiones DB Perros */
app.get("/api/Perros/get", (req, res) => {

    const sqlSelect = "SELECT * FROM perro";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/api/Perros/insert', (req, res) => {
    const color = req.body.color
    const raza = req.body.raza
    const nombre = req.body.nombre
    const edad = req.body.edad
    const sexo = req.body.sexo
    const peso = req.body.peso
    const tamanio = req.body.tamanio
    const imagen = req.body.imagen
    
    //const peso = req.body.peso
    //const tamanio = req.body.tamanio

    const sqlInsert = "INSERT INTO perro (color, raza, nombre, sexo, edad, peso, tamanio, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [color, raza, nombre, sexo, edad, peso, tamanio, imagen],(err, result) => {
        res.send(err);
    });
})

app.delete("/api/Perros/delete/:id", (req, res) => {

    const id = req.params.id;

    const sqlDelete = "DELETE FROM perro WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err)
    })
})

app.put("/api/Perros/update/:id", (req, res) => {
    const id = req.params.id
    const color = req.body.color
    const raza = req.body.raza
    const nombre = req.body.nombre
    const sexo = req.body.sexo
    const edad = req.body.edad
    const peso = req.body.peso
    const tamanio = req.body.tamanio
    const imagen = req.body.imagen

    const sqlUpdate = "UPDATE perro SET color = ?, raza = ?, nombre = ?, sexo = ?, edad = ?, peso = ?, tamanio = ?, imagen = ? WHERE id = ?";

    db.query(sqlUpdate, [color, raza, nombre, sexo, edad, peso, tamanio, imagen, id], (err, result) => {
        if (err) console.log(err)
    })
})

/**Conexion usuarios */
app.get("/api/Usuario/get", (req, res) => {

    const sqlSelect = "SELECT * FROM usuario";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.get("/api/Usuario/get/:id", (req, res) => {

    const id = req.params.id;

    const sqlSelect = "SELECT * FROM usuario WHERE id = ?";
    db.query(sqlSelect, id,  (err, result) => {
        res.send(result);
    })
})

app.post('/api/Usuario/insert', (req, res) => {

    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const mail = req.body.mail
    const pass = req.body.pass
    const permiso = req.body.permiso

    const sqlInsert = "INSERT INTO usuario (nombre, apellido, mail, pass, permiso) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlInsert, [nombre, apellido, mail, pass, permiso],(err, result) => {
        res.send("Enviado");
    });
})

app.delete("/api/Usuario/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM usuario WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err)
    })
})

app.put("/api/Usuario/update/:id", (req, res) => {

    const id = req.params.id;
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const mail = req.body.mail
    const pass = req.body.pass
    const permiso = req.body.permiso

    const sqlUpdate = "UPDATE usuario SET nombre = ?, apellido = ?, mail = ?, pass = ?, permiso = ? WHERE id = ?";

    db.query(sqlUpdate, [nombre, apellido, mail, pass, permiso, id], (err, result) => {
        if (err) console.log(err)
    })
})

/**Login Auth */
app.get("/login", (req, res) => {
    if (req.session.mail) {
        res.send({ loggedIn: true, user: req.session.mail });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post('/api/login', (req, res) => {
    const mail = req.body.mail
    const pass = req.body.pass
    db.query(
        "SELECT * FROM usuario WHERE mail = ?", mail, 
        (err, result) => {

            var string = JSON.stringify(result);
                //console.log('>> string: ', string );
            var json =  JSON.parse(string);
            console.log(json[0])
            if (err) {
                res.send({ err: err }); 
            } 
            
            if (result.length > 0) {
                    if (pass === json[0].pass) {
                        req.session.mail = result;
                        console.log(result);
                        res.send(result);
                    } else {
                        
                        res.send({ message: "Usuario o contraseña incorrectos" });
                    }
                } else {
                res.send({ message: "Usuario no existe" });
            }
        }
    )
})

app.post('/api/register', (req, res) => {

    const user = req.body.user
    const pass = req.body.pass

    
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO usuarios (user, pass) VALUES (?, ?)",
            [user, hash],
            (err, result) => {
                console.log(err);
            }
        )
    })
})
