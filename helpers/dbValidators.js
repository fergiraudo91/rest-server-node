const { Categoria, Producto } = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/user");

const validRol = async (role = "") => {
  const rolExist = await Role.findOne({ role });
  console.log(rolExist);
  if (!rolExist) {
    throw new Error(`El rol ${role} no existe en la base de datos`);
  }
};

const emailExist = async (email = "") => {
  const exist = await Usuario.findOne({ email });
  if (exist) {
    throw new Error(`El mail ${email} ya existe en la base de datos`);
  }
};

const userExistById = async (id) => {
  const exist = await Usuario.findById(id);
  if (!exist) {
    throw new Error(`El ID del usuario ${id} NO  existe`);
  }
};

const existeCategoriaPorId = async (id) => {
  console.log(id);
  const exist = await Categoria.findById(id);
  if (!exist) {
    throw new Error(`La categoría con el Id ${id} No existe en la base de datos`);
  }
};

const existeProductoPorId = async (id) => {
  console.log(id);
  const exist = await Producto.findById(id);
  if (!exist) {
    throw new Error(`El producto con el Id ${id} No existe en la base de datos`);
  }
};

const coleccionesPermitidas = (coleccion = '', colecciones = []) =>{
  const incluida = colecciones.includes(coleccion);
  if(!incluida){
    throw new Error(`La coleccion ${coleccion} no es permitida`);
  }

  return true;
}

module.exports = {
  validRol,
  emailExist,
  userExistById,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas
};
