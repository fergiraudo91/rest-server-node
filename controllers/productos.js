const { response, request } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req = request, resp = response) => {
    const { limite = 5, desde = 0 } = req.query;
  
  
    const [total, productos] = await Promise.all([
      Producto.count({ state: true }),
      Producto.find({ state: true })
        .populate("usuario", "name")
        .populate("categoria", "name")
        .skip(+desde)
        .limit(+limite),
    ]);
  
    resp.json({
      total,
      productos,
    });
  };

  const crearProducto = async (req = request, resp = response) => {
    const {state, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({ name: body.name });
    console.log(req.usuario);
    if (productoDB) {
      return resp.status(400).json({
        msg: "El producto ya existe",
      });
    }
  
    const data = {
      name: req.body.name.toUpperCase(),
      usuario: req.usuario._id,
      ...body
    };
  
    const producto = new Producto(data);
  
    await producto.save();
  
    resp.status(201).json(producto);
  };

  const obtenerProducto = async (req = request, resp = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
                                      .populate('usuario', 'name')
                                      .populate('categoria', 'name');
    resp.json(producto);

}

const actualizarProducto = async (req = request, resp = response) => {
    const { id } = req.params;
    const {state, usuario, ...data } = req.body;
    if(data.name){
      data.name = data.name.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    resp.json(producto);
}

const borrarProducto = async (req = request, resp = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {state: false}, {new: true});
    resp.json(producto);
}

  module.exports = {
      obtenerProductos,
      crearProducto,
      actualizarProducto,
      borrarProducto,
      obtenerProducto
  }