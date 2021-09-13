const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/dbValidators");
const { adminRol } = require("../middlewares");
const { fieldValidation } = require("../middlewares/field-validation");
const validarJWT = require("../middlewares/validar-jwt");



const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    fieldValidation
], obtenerCategoria);

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    fieldValidation

], crearCategoria
)

router.put('/:id',[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    fieldValidation
] ,actualizarCategoria);

router.delete('/:id',[
    validarJWT,
    adminRol,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    fieldValidation
], borrarCategoria);

module.exports = router;