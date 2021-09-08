const { Router } = require("express");
const { check } = require("express-validator");
const { validRol, emailExist, userExistById } = require("../helpers/dbValidators");
const {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
  patchUsers,
} = require("../controllers/users");
const { fieldValidation } = require("../middlewares/field-validation");

const router = Router();

router.get("/", getUsers);
router.post("/", [
  check('email', 'el correo no es valido').isEmail(),
  check('email').custom(emailExist),
  check('name', 'el nombre es obligatorio').not().isEmpty(),
  check('password', 'la password debe tener mas de 6 caracteres').isLength({min: 6}),
  check('role').custom(validRol),
  fieldValidation], postUsers);

router.put("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistById),
  check('role').custom(validRol),
  fieldValidation
], putUsers);
router.delete("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistById),
  fieldValidation
], deleteUsers);
router.patch("/:id", patchUsers);

module.exports = router;
