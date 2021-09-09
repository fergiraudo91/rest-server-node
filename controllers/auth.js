const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/user");
const generarJWT = require("../helpers/generar-jwt");

const login = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return resp.status(400).json({
        msg: "Usuario / Password - No son correctos",
      });
    }

    //Verificar si el usuario está activo
    if (!usuario.state) {
      return resp.status(400).json({
        msg: "Usuario / Password - No son correctos",
      });
    }

    //Verificar la contraseña
    const validPassword = await bcryptjs.compareSync(
      password,
      usuario.password
    );

    if (!validPassword) {
      return resp.status(400).json({
        msg: "Usuario / Password - No son correctos",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);

    resp.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Algo salió mal, hable con el administrador",
    });
  }
};

module.exports = login;
