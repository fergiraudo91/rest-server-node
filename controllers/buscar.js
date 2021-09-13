const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles "];

const buscarUsuarios = async (termino = "", resp = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return resp.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  console.log(usuarios);
  return resp.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", resp = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return resp.json({
      results: categoria ? [categoria] : [],
    });
  }
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ name: regex, state: true });

  return resp.json({
      results: categorias
  })
};

const buscarProductos = async (termino="", resp = response) => {
    const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const producto = await Producto.findById(termino).populate('categoria', 'name');;
    return resp.json({
      results: producto ? [producto] : [],
    });
  }
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({ name: regex, state: true }).populate('categoria', 'name');

  return resp.json({
      results: productos
  })
}

const buscar = (req = request, resp = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    resp.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, resp);
      break;
    case "categorias":
        buscarCategorias(termino, resp);
      break;
    case "productos":
        buscarProductos(termino, resp);
      break;
    case "roles":
      break;

    default:
      resp.status(500).json({
        msg: "Hable con el administrador",
      });
      break;
  }
};

module.exports = {
  buscar,
};
