const { Router } = require("express");
const { check } = require("express-validator");
const login = require("../controllers/auth");
const { fieldValidation } = require("../middlewares/field-validation");

const router = Router();

router.post("/login", [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidation
] , login);

module.exports = router;