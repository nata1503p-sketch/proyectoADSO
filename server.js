const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Usuario = require("./models/Usuario");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/rally");

mongoose.connection.once("open", () => {
    console.log("MongoDB conectado");
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.post("/registro", async (req, res) => {
    /* =========================================
   RUTA LOGIN
========================================= */

app.post("/login", async (req, res) => {

    try {

        /* Buscar usuario por correo */
        const usuarioEncontrado = await Usuario.findOne({

            correo: req.body.correo,

            password: req.body.password

        });

        /* Si el usuario NO existe */
        if (!usuarioEncontrado) {

            return res.status(401).json({

                mensaje: "Correo o contraseña incorrectos"

            });

        }

        /* Si el usuario existe */
        res.json({

            mensaje: "Inicio de sesión exitoso",

            usuario: usuarioEncontrado

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: "Error del servidor"

        });

    }

});

    try {

        const nuevoUsuario = new Usuario({

            nombre: req.body.nombre,

            correo: req.body.correo,

            password: req.body.password,

            fechaNacimiento: req.body.fechaNacimiento,

            celular: req.body.celular

        });

        await nuevoUsuario.save();

        res.json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });

    }

});
/* =========================================
   RUTA LOGIN
========================================= */

app.post("/login", async (req, res) => {

    try {

        /* Buscar usuario */
        const usuarioEncontrado =
            await Usuario.findOne({

                correo: req.body.correo,

                password: req.body.password

            });

        /* Validar usuario */
        if (!usuarioEncontrado) {

            return res.status(401).json({

                mensaje:
                    "Correo o contraseña incorrectos"

            });

        }

        /* Respuesta correcta */
        res.json({

            mensaje:
                "Inicio de sesión exitoso"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje:
                "Error del servidor"

        });

    }

});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});