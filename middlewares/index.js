const validaCampos = require("../middlewares/field-validation");
const validarJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");

module.exports = {
    ...validaCampos,
    ...validaRoles,
    validarJWT
}