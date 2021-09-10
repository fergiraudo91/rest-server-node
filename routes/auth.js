const { Router } = require("express");
const { check } = require("express-validator");
const {login, googleSingIn} = require("../controllers/auth");
const { fieldValidation } = require("../middlewares/field-validation");

const router = Router();

router.post("/login", [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidation
] , login);

router.post("/google", [
    check('id_token', 'El ID token es necesario').not().isEmpty(),
    fieldValidation
] , googleSingIn);

module.exports = router;