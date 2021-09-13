const { Router } = require("express");
const { check } = require("express-validator");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/productos");
const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/dbValidators");
const { adminRol } = require("../middlewares");
const { fieldValidation } = require("../middlewares/field-validation");
const validarJWT = require("../middlewares/validar-jwt");



const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    fieldValidation
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    fieldValidation

], crearProducto
)

router.put('/:id',[
    validarJWT,
    check('id').custom(existeProductoPorId),
    fieldValidation
] ,actualizarProducto);

router.delete('/:id',[
    validarJWT,
    adminRol,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    fieldValidation
], borrarProducto);

module.exports = router;