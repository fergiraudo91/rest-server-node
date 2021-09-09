const { response, request } = require("express");

const bcryptjs = require("bcryptjs");

const Usuario = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  console.log(limite);

  const [total, usuarios] = await Promise.all([
    Usuario.count({ state: true }),
    Usuario.find({ state: true })
      .skip(+desde)
      .limit(+limite),
  ]);

  res.json({
    total,
    usuarios
  });
};

const postUsers = async (req, res) => {
  const { name, password, email, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB
  await usuario.save();

  res.json(usuario);
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  // const usuario = await Usuario.findByIdAndDelete(id);

  const uid = req.uid;

  const usuarioAutenticado = req.usuario;

  const usuario = await Usuario.findByIdAndUpdate(id, {state: false});
  res.json({usuario, uid, usuarioAutenticado});
};

const putUsers = async (req, res) => {
  const { id } = req.params;

  const { _id, password, google, ...params } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    params.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, params);

  res.json({
    message: "PUT API -controller",
    usuario,
  });
};

const patchUsers = (req, res) => {
  res.json({
    message: "PATCH API -controller",
  });
};

module.exports = {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
  patchUsers,
};
