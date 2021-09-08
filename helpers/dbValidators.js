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

module.exports = {
  validRol,
  emailExist,
  userExistById
};
