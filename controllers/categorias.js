const { response, request } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, resp = response) => {
  const { limite = 5, desde = 0 } = req.query;

  console.log(limite);

  const [total, categorias] = await Promise.all([
    Categoria.count({ state: true }),
    Categoria.find({ state: true })
      .populate("usuario", "name")
      .skip(+desde)
      .limit(+limite),
  ]);

  resp.json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req = request, resp = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'name');
    resp.json(categoria);

}

const crearCategoria = async (req, resp = response) => {
  const name = req.body.name.toUpperCase();
  const categoriaDB = await Categoria.findOne({ name });
  if (categoriaDB) {
    return resp.status(400).json({
      msg: "La categoria ya existe",
    });
  }

  const data = {
    name,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  await categoria.save();

  resp.status(201).json(categoria);
};

const actualizarCategoria = async (req = request, resp = response) => {
    const { id } = req.params;
    const {state, usuario, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    resp.json(categoria);
}

const borrarCategoria = async (req = request, resp = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {state: false}, {new: true});
    resp.json(categoria);
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
};
